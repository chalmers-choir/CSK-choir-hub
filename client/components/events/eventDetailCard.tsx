import { Accordion, AccordionItem } from '@heroui/accordion';
import { Button } from '@heroui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Checkbox } from '@heroui/checkbox';

interface EventDetailCardProps {
  event: any;
}

export default function EventDetailCard({ event }: EventDetailCardProps) {
  return (
    <Card>
      <CardHeader className="flex-col">
        <div className="flex w-full justify-between">
          <p className="text-tiny font-bold uppercase">repetition</p>
          <p className="text-tiny font-bold uppercase">@scania</p>
        </div>
        <div className="flex w-full justify-between">
          <small className="text-default-500">tis 14 okt</small>
          <small className="text-default-500">18:15 - 20:45</small>
        </div>
        <h4 className="text-xl font-bold">Övning</h4>
      </CardHeader>
      <CardBody>
        <p className="mb-4">
          Detta är en beskrivning av evenemanget. Här kan detaljer om vad som kommer att hända under
          evenemanget anges, inklusive eventuella speciella instruktioner eller information som
          deltagarna behöver veta.
        </p>
        <Button color="success">
          <span className="text-small font-semibold">Anmäl dig här!</span>
        </Button>
      </CardBody>

      <CardFooter className="flex-col items-start px-4 pb-0 pt-2">
        <p className="text-tiny font-bold uppercase">Var du på repet?</p>
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4">
            <Checkbox defaultSelected>Ja</Checkbox>
            <Checkbox>Nej</Checkbox>
          </div>
          <Button>
            <span className="text-small font-semibold">Spara</span>
          </Button>
        </div>
      </CardFooter>

      <CardFooter>
        <Accordion isCompact>
          <AccordionItem
            key="1"
            aria-label="Registrerade"
            hideIndicator
            title={
              <div className="flex gap-1">
                <p className="text-default-400 text-small font-semibold">4</p>
                <p className="text-default-400 text-small">Registrerade</p>
              </div>
            }
          >
            <ul className="list-inside list-disc">
              <li>Anna Andersson</li>
              <li>Björn Berg</li>
              <li>Cecilia Carlsson</li>
              <li>David Dahl</li>
            </ul>
          </AccordionItem>
        </Accordion>
      </CardFooter>
    </Card>
  );
}
