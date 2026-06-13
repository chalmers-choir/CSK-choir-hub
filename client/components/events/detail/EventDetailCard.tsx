'use client';

import { useEffect, useMemo, useState } from 'react';

import { IoClose } from 'react-icons/io5';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth, useIntl } from '@/contexts';
import { CSKEvent, CSKEventType, EventsService } from '@/lib/api-client';

import { EventUserEntry, EventUserListAccordion } from './EventUserListAccordion';

const formatDate = (isoString: string | undefined, locale: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return 'N/A';

  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const formatTime = (isoString: string | undefined, locale: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) return 'N/A';

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

interface EventDetailCardProps {
  event: CSKEvent | undefined;
}

const CSKEventTypeString: Record<CSKEventType, string> = {
  REHEARSAL: 'Repetition',
  CONCERT: 'Konsert',
  GIG: 'Gig',
  PARTY: 'Fest',
  MEETING: 'Möte',
  OTHER: 'Övrigt',
};

export const EventDetailCard = ({ event }: EventDetailCardProps) => {
  const { user } = useAuth();
  const { locale } = useIntl();

  type AttendanceChoice = 'yes' | 'no' | undefined;
  const statusToChoice = (status?: string | null): AttendanceChoice =>
    status === 'PRESENT' ? 'yes' : status === 'ABSENT' ? 'no' : undefined;
  const choiceToStatus = (choice: AttendanceChoice) =>
    choice === 'yes' ? 'PRESENT' : choice === 'no' ? 'ABSENT' : undefined;

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
    setNewEventAttendance(selected ? 'yes' : undefined);
  };

  const handleNoChange = (selected: boolean) => {
    setNewEventAttendance(selected ? 'no' : undefined);
  };

  const eventType = event ? (CSKEventTypeString[event.type] ?? event.type) : '...';
  const eventName = event?.name ?? 'Loading event...';
  const eventPlace = event?.place ?? '';
  const eventDescription = event?.description ?? 'No description available.';
  const eventDate = formatDate(event?.dateStart, locale);
  const eventStartTime = formatTime(event?.dateStart, locale);
  const eventEndTime = formatTime(event?.dateEnd, locale);
  const eventTimeRange =
    eventEndTime !== 'N/A' ? `${eventStartTime} - ${eventEndTime}` : eventStartTime;
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
        status: status === 'ABSENT' ? false : status === 'PRESENT' ? true : null,
      })) ?? [])
    : (event?.registrations?.map(({ firstName, lastName }) => ({
        name: `${firstName} ${lastName}`,
        status: true,
      })) ?? []);

  const usersForList = useMemo(() => {
    if (!isAttendanceMode || !user) return baseUsersForList;
    const displayName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

    if (!displayName) return baseUsersForList;

    return baseUsersForList.map((entry) =>
      entry.name === displayName
        ? {
            ...entry,
            status:
              choiceToStatus(newEventAttendance) === 'PRESENT'
                ? true
                : choiceToStatus(newEventAttendance) === 'ABSENT'
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

      toast.success('Anmäld till evenemanget');

      // Reload to reflect updated lists/state
      window.location.reload();
    } catch (err: any) {
      toast.error('Kunde inte anmäla till evenemanget', {
        description: err.message || 'Något gick fel',
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

      toast.success('Avanmäld från evenemanget');

      window.location.reload();
    } catch (err: any) {
      toast.error('Kunde inte avanmäla', {
        description: err.message || 'Något gick fel',
      });
    }
  };

  const listTitle = isAttendanceMode ? 'Närvaro' : 'Registrerade';

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
      toast.success('Närvaro sparad');

      // Reload to reflect updated lists/state
      window.location.reload();
    } catch (err: any) {
      toast.error('Kunde inte spara närvaro', {
        description: err.message || 'Något gick fel',
      });
    }
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader className="flex-col">
        <div className="mb-2 w-full">
          <div className="flex justify-between">
            <p className="text-xs font-bold uppercase">{eventType}</p>
            <p className="text-xs font-bold uppercase">@{eventPlace}</p>
          </div>
          <div className="flex justify-between">
            <small className="text-muted-foreground">{eventDate}</small>
            <small className="text-muted-foreground">{eventTimeRange}</small>
          </div>
        </div>
        <h4 className="text-2xl font-bold">{eventName}</h4>
      </CardHeader>

      <CardContent className="px-6">
        <p className="mx-auto mb-4">{eventDescription}</p>
      </CardContent>

      {registrationRequired && (
        <CardFooter className="w-full px-6">
          <div className="mx-auto flex items-center gap-3">
            <Button
              variant={isRegistered ? 'secondary' : 'default'}
              disabled={isRegistered}
              onClick={handleRegistration}
            >
              <span className="text-sm font-semibold">
                {isRegistered ? 'Redan registrerad' : 'Anmäl dig här!'}
              </span>
            </Button>
            {isRegistered && (
              <Button variant="destructive" onClick={handleUnregister}>
                <span className="text-sm font-semibold">Avanmäl</span>
              </Button>
            )}
          </div>
        </CardFooter>
      )}

      {attendanceRecorded && (
        <CardFooter className="flex-col items-start px-6 pb-0 pt-2">
          <p className="text-xs font-bold uppercase">Var du på repet?</p>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              <label htmlFor="attendance-yes" className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  id="attendance-yes"
                  checked={newEventAttendance === 'yes'}
                  onCheckedChange={(checked) => handleYesChange(checked === true)}
                />
                <span>Ja</span>
              </label>
              <label htmlFor="attendance-no" className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  id="attendance-no"
                  checked={newEventAttendance === 'no'}
                  onCheckedChange={(checked) => handleNoChange(checked === true)}
                />
                <span>Nej</span>
              </label>
            </div>
            <div className="flex items-center gap-4">
              {hasAttendanceChanges && (
                <Button
                  size="icon"
                  aria-label="Ångra närvaroval"
                  variant="ghost"
                  className="rounded-full"
                  onClick={handleResetAttendance}
                >
                  <IoClose size={18} />
                </Button>
              )}
              <Button
                variant={oldEventAttendance == newEventAttendance ? 'secondary' : 'default'}
                disabled={!hasAttendanceChanges}
                onClick={handleSaveAttendance}
              >
                <span className="text-sm font-semibold">Spara</span>
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
};
