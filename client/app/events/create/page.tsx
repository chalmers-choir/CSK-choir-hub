'use client';

import { useState } from 'react';

import { RequestLogin } from '@/components/auth/RequestLogin';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts';
import { CSKEventType, EventsService } from '@/lib/apiClient';

interface ResultData {
  type: 'success' | 'error';
  message: string;
}

type Result = ResultData | undefined;

const eventTypeDbKeyToName: Record<CSKEventType, string> = {
  REHEARSAL: 'Rep',
  CONCERT: 'Konsert',
  GIG: 'Gig',
  PARTY: 'Fest',
  MEETING: 'Möte',
  OTHER: 'Annat',
};

const autocompletePlaceNames: Record<string, string> = {
  klok: 'Klok',
  scania: 'Scaniasalen',
  kårres: 'Kårrestaurangen',
  palmstedt: 'Palmstedtsalen',
  maskin: 'ML11',
  sbm500: 'SB-M500',
};

export default function CreateEventPage() {
  const { loading, isAdmin } = useAuth();

  // name, type, description, dateStart, place
  const [name, setName] = useState('');
  const [type, setType] = useState<CSKEventType | undefined>(undefined);
  const [typeIsInvalid, setTypeIsInvalid] = useState(false);
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateIsInvalid, setDateIsInvalid] = useState(false);
  const [place, setPlace] = useState('');
  const [placeIsInvalid, setPlaceIsInvalid] = useState(false);
  const resetState = () => {
    setName('');
    setType(undefined);
    setTypeIsInvalid(false);
    setDescription('');
    setDateStart('');
    setDateIsInvalid(false);
    setPlace('');
    setPlaceIsInvalid(false);
  };

  const [result, setResult] = useState<Result>(undefined);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      if (!type) {
        setTypeIsInvalid(true);
      }
      if (!dateStart) {
        setDateIsInvalid(true);
      }
      if (!place) {
        setPlaceIsInvalid(true);
      }
      if (!type || !dateStart || !place) {
        throw new Error('Vänligen fyll i alla fält.');
      }

      const eventData = {
        name,
        type,
        description,
        dateStart: dateStart,
        place,
        requiresRegistration: false,
        requiresAttendance: false,
      };

      const { event: newEvent } = await EventsService.addEvent({ requestBody: eventData }); // Invalidate cache
      const eventId = newEvent.id;

      resetState();
      setResult({ type: 'success', message: 'Evenemang skapat!' });
      window.location.href = `/events/${eventId}`;
    } catch (err: any) {
      setResult({ type: 'error', message: err.message });
    }
  };

  const defaultVariant = 'outline' as const;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {isAdmin ? (
        <form className="w-md mx-auto mt-20 flex max-w-full flex-col gap-2" onSubmit={handleSubmit}>
          <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

          <div className="flex flex-col gap-1">
            <Label>Namn på evenemanget</Label>
            <Input required type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: typeIsInvalid ? 'destructive' : defaultVariant,
              })}
              onClick={() => setTypeIsInvalid(false)}
            >
              {type ? eventTypeDbKeyToName[type] : 'Välj typ'}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(eventTypeDbKeyToName).map(([key, label]) => (
                <DropdownMenuItem key={key} onClick={() => setType(key as CSKEventType)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex flex-col gap-1">
            <Label>Beskrivning</Label>
            <Textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Datum och tid</Label>
            <Input
              type="datetime-local"
              value={dateStart}
              className={dateIsInvalid ? 'border-destructive' : ''}
              onChange={(e) => {
                setDateStart(e.target.value);
                setDateIsInvalid(false);
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Plats (välj från listan eller skriv egen)</Label>
            <Input
              list="places-list"
              value={place}
              className={placeIsInvalid ? 'border-destructive' : ''}
              onChange={(e) => {
                setPlace(e.target.value);
                setPlaceIsInvalid(false);
              }}
            />
            <datalist id="places-list">
              {Object.entries(autocompletePlaceNames).map(([key, label]) => (
                <option key={key} value={label} />
              ))}
            </datalist>
          </div>

          {result && (
            <p className={result.type == 'success' ? 'text-green-500' : 'text-red-500'}>
              {result.message}
            </p>
          )}

          <Button className="rounded-full" type="submit">
            Skapa
          </Button>
        </form>
      ) : loading ? (
        <>Loading...</>
      ) : (
        <RequestLogin>Vänligen logga in som administratör för att skapa evenemang.</RequestLogin>
      )}
    </section>
  );
}
