import { useState } from 'react';

import { Button } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Input, Textarea } from '@heroui/input';
import { button as buttonStyles } from '@heroui/theme';

import RequestLogin from '@/components/request-login';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import axios from 'axios';

type HeroUiColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | undefined;

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  withCredentials: true,
});

export default function CreateEventPage() {
  const { loading, isAdmin } = useAuth();

  // name, type, description, dateStart, place
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [typeDropdownColor, setTypeDropdownColor] = useState<HeroUiColor>('default');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [place, setPlace] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { name, type, description, dateStart, place };
    try {
      if (!type) {
        setTypeDropdownColor('danger');
        throw new Error('Vänligen välj typ.');
      }
      await api.post('/events', eventData);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eventTypeNames: Record<string, string> = {
    REHEARSAL: 'Rep',
    CONCERT: 'Konsert',
    GIG: 'Gig',
    PARTY: 'Fest',
    MEETING: 'Möte',
    OTHER: 'Annat',
  };

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
              label="Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  color={typeDropdownColor}
                  onPress={() => setTypeDropdownColor('default')}
                >
                  {type ? eventTypeNames[type] : 'Välj typ'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                items={Object.entries(eventTypeNames)}
                onAction={(key) => setType(key.toString())}
              >
                {(item) => <DropdownItem key={item[0]}>{item[1]}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>

            <Textarea
              type="text"
              label="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <DatePicker
              isRequired
              label="Datum och tid"
              granularity="minute"
              onChange={(e) => e && setDateStart(e.toString())}
            ></DatePicker>

            <Input
              type="text"
              label="Plats"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              required
            />

            {error && <p className="text-red-500">{error}</p>}

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
