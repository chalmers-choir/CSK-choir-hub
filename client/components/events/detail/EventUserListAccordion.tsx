'use client';

import { IoCheckmarkCircle, IoCloseCircle, IoEllipseOutline } from 'react-icons/io5';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export type EventUserEntry = {
  name: string;
  status?: boolean | null; // true: present/registered, false: absent, null/undefined: not set
};

type EventUserListAccordionProps = {
  users: EventUserEntry[];
  title?: string;
};

export const EventUserListAccordion = ({
  users,
  title = 'Registrerade',
}: EventUserListAccordionProps) => {
  const count = users.length;

  const renderStatusIcon = (status: boolean | null | undefined) => {
    if (status === true) return <IoCheckmarkCircle className="text-green-500" size={18} />;
    if (status === false) return <IoCloseCircle className="text-red-500" size={18} />;

    return <IoEllipseOutline className="text-muted-foreground" size={18} />;
  };

  return (
    <Accordion className="w-full">
      <AccordionItem value="registered">
        <AccordionTrigger className="py-2 text-sm">
          <div className="text-muted-foreground flex items-center gap-2">
            <span className="text-sm font-semibold">{count}</span>
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-muted-foreground text-xs">(tryck för att visa)</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="list-inside list-disc">
            {users.map(({ name, status }) => (
              <li key={name} className="flex items-center gap-2">
                {renderStatusIcon(status)}
                <span>{name}</span>
              </li>
            ))}
            {users.length === 0 && (
              <li className="text-muted-foreground">Inga registrerade ännu</li>
            )}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
