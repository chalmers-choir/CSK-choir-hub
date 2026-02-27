import { Accordion, AccordionItem } from "@heroui/accordion";
import { IoCheckmarkCircle, IoCloseCircle, IoEllipseOutline } from "react-icons/io5";

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
  title = "Registrerade",
}: EventUserListAccordionProps) => {
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
        aria-label={title}
        title={
          <div className="text-default-500 flex w-full items-center gap-2">
            <span className="text-default-400 text-small font-semibold">{count}</span>
            <span className="text-default-500 text-small font-semibold">{title}</span>
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
