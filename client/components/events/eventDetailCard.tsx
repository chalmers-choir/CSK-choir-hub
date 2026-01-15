import { useState } from 'react';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Checkbox } from '@heroui/checkbox';

import { CSKEvent, CSKEventType } from '@/types/event';
import { IoCheckmarkCircle, IoClose, IoCloseCircle, IoEllipseOutline } from 'react-icons/io5';

const formatDate = (isoString?: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date);
};

const formatTime = (isoString?: string) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return new Intl.DateTimeFormat('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

interface EventDetailCardProps {
  event: CSKEvent | null;
}

const CSKEventTypeString: Record<CSKEventType, string> = {
  [CSKEventType.REHEARSAL]: 'Repetition',
  [CSKEventType.CONCERT]: 'Konsert',
  [CSKEventType.GIG]: 'Gig',
  [CSKEventType.PARTY]: 'Fest',
  [CSKEventType.MEETING]: 'Möte',
  [CSKEventType.OTHER]: 'Övrigt',
};

type MagicalUser = {
  name: string;
  status?: boolean | null; // true: present/registered, false: absent, null/undefined: not set
};

type MagicalUserListAccordionProps = {
  users: MagicalUser[];
};

const MagicalUserListAccordion = ({ users }: MagicalUserListAccordionProps) => {
  const count = users.length;

  const renderStatusIcon = (status: boolean | null | undefined) => {
    if (status === true) return <IoCheckmarkCircle className="text-success" size={18} />;
    if (status === false) return <IoCloseCircle className="text-danger" size={18} />;
    return <IoEllipseOutline className="text-default-400" size={18} />;
  };

  return (
    <Accordion isCompact>
      <AccordionItem
        key="registered"
        aria-label="Registrerade"
        title={
          <div className="text-default-500 flex w-full items-center gap-2">
            <span className="text-default-400 text-small font-semibold">{count}</span>
            <span className="text-default-500 text-small font-semibold">Registrerade</span>
            <span className="text-default-400 text-tiny">(tryck för att visa)</span>
          </div>
        }
      >
        <ul className="list-inside list-disc">
          {users.map(({ name, status }) => (
            <li key={name} className="flex items-center gap-2">
              {renderStatusIcon(status)}
              <span>{name}</span>
            </li>
          ))}
          {users.length === 0 && <li className="text-default-400">Inga registrerade ännu</li>}
        </ul>
      </AccordionItem>
    </Accordion>
  );
};

export default function EventDetailCard({ event }: EventDetailCardProps) {
  // Extract data from event prop when available

  if (!event) {
    return (
      <Card>
        <CardBody>
          <p>Loading event details...</p>
        </CardBody>
      </Card>
    );
  }

  type AttendanceChoice = 'yes' | 'no' | null;
  const oldEventAttendance: AttendanceChoice = null; // TODO: Fetch user's previous attendance status
  const [newEventAttendance, setNewEventAttendance] =
    useState<AttendanceChoice>(oldEventAttendance);

  const handleYesChange = (selected: boolean) => {
    setNewEventAttendance(selected ? 'yes' : null);
  };

  const handleNoChange = (selected: boolean) => {
    setNewEventAttendance(selected ? 'no' : null);
  };

  const eventType = CSKEventTypeString[event.type] ?? event.type;
  const eventName = event.name;
  const eventPlace = event.place;
  const eventDescription = event.description ?? 'No description available.';
  const eventDate = formatDate(event.dateStart);
  const eventStartTime = formatTime(event.dateStart);
  const eventEndTime = formatTime(event.dateEnd);
  const eventTimeRange =
    eventEndTime !== 'N/A' ? `${eventStartTime} - ${eventEndTime}` : eventStartTime;
  const registrationRequired = event.requiresRegistration;
  const attendanceRecorded = event.requiresAttendance;
  const hasAttendanceChanges = oldEventAttendance !== newEventAttendance;

  const handleResetAttendance = () => {
    setNewEventAttendance(oldEventAttendance);
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
        {registrationRequired && (
          <Button color="success">
            <span className="text-small font-semibold">Anmäl dig här!</span>
          </Button>
        )}
      </CardBody>

      {attendanceRecorded && (
        <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">Var du på repet?</p>
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              <Checkbox isSelected={newEventAttendance === 'yes'} onValueChange={handleYesChange}>
                Ja
              </Checkbox>
              <Checkbox isSelected={newEventAttendance === 'no'} onValueChange={handleNoChange}>
                Nej
              </Checkbox>
            </div>
            <div className="flex items-center gap-2">
              {hasAttendanceChanges && (
                <Button
                  isIconOnly
                  size="sm"
                  radius="full"
                  onPress={handleResetAttendance}
                  aria-label="Ångra närvaroval"
                >
                  <IoClose size={18} />
                </Button>
              )}
              <Button color={oldEventAttendance == newEventAttendance ? 'default' : 'primary'}>
                <span className="text-small font-semibold">Spara</span>
              </Button>
            </div>
          </div>
        </CardFooter>
      )}

      <CardFooter>
        <MagicalUserListAccordion
          users={[
            { name: 'Anna Andersson', status: true },
            { name: 'Björn Berg', status: false },
            { name: 'Cecilia Carlsson', status: null },
            { name: 'David Dahl', status: undefined },
          ]}
        />
      </CardFooter>
    </Card>
  );
}
