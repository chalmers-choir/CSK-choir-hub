"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { addToast } from "@heroui/toast";
import { IoClose } from "react-icons/io5";

import { useAuth } from "@/contexts/AuthContext";
import { CSKEvent, CSKEventType, EventsService } from "@/lib/api-client";

import { EventUserEntry, EventUserListAccordion } from "./EventUserListAccordion";

const formatDate = (isoString?: string) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
};

const formatTime = (isoString?: string) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

interface EventDetailCardProps {
  event: CSKEvent | undefined;
}

const CSKEventTypeString: Record<CSKEventType, string> = {
  REHEARSAL: "Repetition",
  CONCERT: "Konsert",
  GIG: "Gig",
  PARTY: "Fest",
  MEETING: "Möte",
  OTHER: "Övrigt",
};

export default function EventDetailCard({ event }: EventDetailCardProps) {
  const { user } = useAuth();

  type AttendanceChoice = "yes" | "no" | undefined;
  const statusToChoice = (status?: string | null): AttendanceChoice =>
    status === "PRESENT" ? "yes" : status === "ABSENT" ? "no" : undefined;
  const choiceToStatus = (choice: AttendanceChoice) =>
    choice === "yes" ? "PRESENT" : choice === "no" ? "ABSENT" : undefined;

  const userAttendanceStatus = useMemo(() => {
    if (!user || !event?.attendees) return undefined;
    const entry = event.attendees.find((a) => a.userId === user.id);

    return entry?.status ?? undefined;
  }, [event?.attendees, user]);

  const [oldEventAttendance, setOldEventAttendance] = useState<AttendanceChoice>(
    statusToChoice(userAttendanceStatus),
  );
  const [newEventAttendance, setNewEventAttendance] = useState<AttendanceChoice>(
    statusToChoice(userAttendanceStatus),
  );

  useEffect(() => {
    const choice = statusToChoice(userAttendanceStatus);

    setOldEventAttendance(choice);
    setNewEventAttendance(choice);
  }, [userAttendanceStatus]);

  const handleYesChange = (selected: boolean) => {
    setNewEventAttendance(selected ? "yes" : undefined);
  };

  const handleNoChange = (selected: boolean) => {
    setNewEventAttendance(selected ? "no" : undefined);
  };

  const eventType = event ? (CSKEventTypeString[event.type] ?? event.type) : "...";
  const eventName = event?.name ?? "Loading event...";
  const eventPlace = event?.place ?? "";
  const eventDescription = event?.description ?? "No description available.";
  const eventDate = formatDate(event?.dateStart);
  const eventStartTime = formatTime(event?.dateStart);
  const eventEndTime = formatTime(event?.dateEnd);
  const eventTimeRange =
    eventEndTime !== "N/A" ? `${eventStartTime} - ${eventEndTime}` : eventStartTime;
  const registrationRequired = !!event?.requiresRegistration;
  const attendanceRecorded = !!event?.requiresAttendance;
  const hasAttendanceChanges = oldEventAttendance !== newEventAttendance;
  const isRegistered = useMemo(() => {
    if (!user || !event?.registrations) return false;

    return event.registrations.some((r) => r.userId === user.id);
  }, [event?.registrations, user]);

  // Decide which list to show (events are either attendance-based or registration-based, not both)
  const isAttendanceMode = attendanceRecorded;

  const baseUsersForList: EventUserEntry[] = isAttendanceMode
    ? (event?.attendees?.map(({ firstName, lastName, status }) => ({
        name: `${firstName} ${lastName}`,
        status: status === "ABSENT" ? false : status === "PRESENT" ? true : null,
      })) ?? [])
    : (event?.registrations?.map(({ firstName, lastName }) => ({
        name: `${firstName} ${lastName}`,
        status: true,
      })) ?? []);

  const usersForList = useMemo(() => {
    if (!isAttendanceMode || !user) return baseUsersForList;
    const displayName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    if (!displayName) return baseUsersForList;

    return baseUsersForList.map((entry) =>
      entry.name === displayName
        ? {
            ...entry,
            status:
              choiceToStatus(newEventAttendance) === "PRESENT"
                ? true
                : choiceToStatus(newEventAttendance) === "ABSENT"
                  ? false
                  : null,
          }
        : entry,
    );
  }, [baseUsersForList, isAttendanceMode, newEventAttendance, user]);

  const handleRegistration = async () => {
    if (!user || !event) return;
    try {
      await EventsService.markRegistration({
        eventId: event.id,
        requestBody: { userId: user.id },
      });

      addToast({
        title: "Anmäld till evenemanget",
        timeout: 2000,
        color: "success",
      });

      // Reload to reflect updated lists/state
      window.location.reload();
    } catch (err: any) {
      addToast({
        title: "Kunde inte anmäla till evenemanget",
        description: err.message || "Något gick fel",
        timeout: 4000,
        color: "danger",
      });
    }
  };

  const handleUnregister = async () => {
    if (!user || !event) return;
    try {
      await EventsService.unmarkRegistration({
        eventId: event.id,
        requestBody: { userId: user.id },
      });

      addToast({
        title: "Avanmäld från evenemanget",
        timeout: 2000,
        color: "success",
      });

      window.location.reload();
    } catch (err: any) {
      addToast({
        title: "Kunde inte avanmäla",
        description: err.message || "Något gick fel",
        timeout: 4000,
        color: "danger",
      });
    }
  };

  const listTitle = isAttendanceMode ? "Närvaro" : "Registrerade";

  const handleResetAttendance = () => {
    setNewEventAttendance(oldEventAttendance);
  };

  const handleSaveAttendance = async () => {
    if (!user || !event) return;
    const status = choiceToStatus(newEventAttendance);

    try {
      await EventsService.markAttendance({
        eventId: event.id,
        requestBody: {
          userId: user.id,
          status,
        },
      });

      setOldEventAttendance(newEventAttendance);
      addToast({
        title: "Närvaro sparad",
        timeout: 2000,
        color: "success",
      });

      // Reload to reflect updated lists/state
      window.location.reload();
    } catch (err: any) {
      addToast({
        title: "Kunde inte spara närvaro",
        description: err.message || "Något gick fel",
        timeout: 4000,
        color: "danger",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-2xl p-4">
      <CardHeader className="flex-col">
        <div className="mb-2 w-full">
          <div className="flex justify-between">
            <p className="text-tiny font-bold uppercase">{eventType}</p>
            <p className="text-tiny font-bold uppercase">@{eventPlace}</p>
          </div>
          <div className="flex justify-between">
            <small className="text-default-500">{eventDate}</small>
            <small className="text-default-500">{eventTimeRange}</small>
          </div>
        </div>
        <h4 className="text-2xl font-bold">{eventName}</h4>
      </CardHeader>

      <CardBody className="px-4">
        <p className="mx-auto mb-4">{eventDescription}</p>
      </CardBody>

      {registrationRequired && (
        <CardFooter className="w-full px-4">
          <div className="mx-auto flex items-center gap-3">
            <Button
              color={isRegistered ? "default" : "success"}
              isDisabled={isRegistered}
              onPress={handleRegistration}
            >
              <span className="text-small font-semibold">
                {isRegistered ? "Redan registrerad" : "Anmäl dig här!"}
              </span>
            </Button>
            {isRegistered && (
              <Button color="danger" variant="flat" onPress={handleUnregister}>
                <span className="text-small font-semibold">Avanmäl</span>
              </Button>
            )}
          </div>
        </CardFooter>
      )}

      {attendanceRecorded && (
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">Var du på repet?</p>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              <Checkbox isSelected={newEventAttendance === "yes"} onValueChange={handleYesChange}>
                Ja
              </Checkbox>
              <Checkbox isSelected={newEventAttendance === "no"} onValueChange={handleNoChange}>
                Nej
              </Checkbox>
            </div>
            <div className="flex items-center gap-4">
              {hasAttendanceChanges && (
                <Button
                  isIconOnly
                  aria-label="Ångra närvaroval"
                  radius="full"
                  size="sm"
                  onPress={handleResetAttendance}
                >
                  <IoClose size={18} />
                </Button>
              )}
              <Button
                color={oldEventAttendance == newEventAttendance ? "default" : "primary"}
                disabled={!hasAttendanceChanges}
                onPress={handleSaveAttendance}
              >
                <span className="text-small font-semibold">Spara</span>
              </Button>
            </div>
          </div>
        </CardFooter>
      )}

      <CardFooter>
        <EventUserListAccordion title={listTitle} users={usersForList} />
      </CardFooter>
    </Card>
  );
}
