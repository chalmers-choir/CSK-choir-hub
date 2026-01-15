import { useState } from 'react';

import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { Button } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Input, Textarea } from '@heroui/input';
import { button as buttonStyles } from '@heroui/theme';

import RequestLogin from '@/components/request-login';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { DateValue } from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';
import axios from 'axios';

interface ResultData {
  type: 'success' | 'error';
  message: string;
}

type Result = ResultData | undefined;

const eventTypeDbKeyToName: Record<string, string> = {
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

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  withCredentials: true,
});

export default function CreateEventPage() {
  const { loading, isAdmin } = useAuth();

  // name, type, description, dateStart, place
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [typeIsInvalid, setTypeIsInvalid] = useState(false);
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState<DateValue | null>(null);
  const [dateIsInvalid, setDateIsInvalid] = useState(false);
  const [place, setPlace] = useState('');
  const [placeIsInvalid, setPlaceIsInvalid] = useState(false);
  const resetState = () => {
    setName('');
    setType('');
    setTypeIsInvalid(false);
    setDescription('');
    setDateStart(null);
    setDateIsInvalid(false);
    setPlace('');
    setPlaceIsInvalid(false);
  };

  const [result, setResult] = useState<Result>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { name, type, description, dateStart: dateStart?.toString(), place };
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
      await api.post('/events', eventData);
      resetState();
      setResult({ type: 'success', message: 'Evenemanget har lagts upp!' });
    } catch (err: any) {
      setResult({ type: 'error', message: err.message });
    }
  };

  const defaultVariant = 'bordered';

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {isAdmin ? (
          <form
            onSubmit={handleSubmit}
            className="w-md mx-auto mt-20 flex max-w-full flex-col gap-2"
          >
            <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

            <Input
              type="text"
              label="Namn på evenemanget"
              variant={defaultVariant}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant={defaultVariant}
                  color={typeIsInvalid ? 'danger' : 'default'}
                  onPress={() => setTypeIsInvalid(false)}
                >
                  {type ? eventTypeDbKeyToName[type] : 'Välj typ'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                items={Object.entries(eventTypeDbKeyToName)}
                onAction={(key) => setType(key.toString())}
              >
                {(item) => <DropdownItem key={item[0]}>{item[1]}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>

            <Textarea
              type="text"
              label="Beskrivning"
              variant={defaultVariant}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <I18nProvider locale="sv-SE">
              <DatePicker
                classNames={{ label: 'after:content-none' }}
                label="Datum och tid"
                variant={defaultVariant}
                isInvalid={dateIsInvalid}
                granularity="minute"
                value={dateStart}
                onChange={(e) => e && setDateStart(e)}
                onFocus={() => setDateIsInvalid(false)}
              />
            </I18nProvider>

            <Autocomplete
              allowsCustomValue
              label="Plats (välj från listan eller skriv egen)"
              variant={defaultVariant}
              isInvalid={placeIsInvalid}
              inputValue={place}
              onInputChange={(e) => setPlace(e)}
              onFocus={() => setPlaceIsInvalid(false)}
              items={Object.entries(autocompletePlaceNames)}
            >
              {(item) => <AutocompleteItem key={item[0]}>{item[1]}</AutocompleteItem>}
            </Autocomplete>

            {result && (
              <p className={result.type == 'success' ? 'text-green-500' : 'text-red-500'}>
                {result.message}
              </p>
            )}

            <Button
              type="submit"
              className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
            >
              Skapa
            </Button>
          </form>
        ) : loading ? (
          <>Loading...</>
        ) : (
          <RequestLogin>Vänligen logga in som administratör för att skapa evenemang.</RequestLogin>
        )}
      </section>
    </DefaultLayout>
  );
}
