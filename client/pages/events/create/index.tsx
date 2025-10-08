import { useState } from 'react';

import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/dropdown';
import { Input } from '@heroui/input';
import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import RequestLogin from '@/components/request-login';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import axios from 'axios';

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl,
  withCredentials: true,
});

export default function CreateEventPage() {
  const { isAuthenticated } = useAuth();

  // name, type, description, dateStart, place
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [place, setPlace] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = { name, type, description, dateStart, place };
    try {
      await api.post('/events', eventData);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eventTypeNames: Record<string, string> = {
    REHEARSAL: 'Repetition',
    CONCERT: 'Konsert',
    GIG: 'Gig',
    PARTY: 'Fest',
    MEETING: 'Möte',
    OTHER: 'Annat',
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {isAuthenticated ? (
          <form onSubmit={handleSubmit} className="mx-auto mt-20 flex max-w-sm flex-col gap-2">
            <h2 className="w-full text-center text-lg font-semibold">Skapa nytt evenemang</h2>

            <Input
              type="text"
              placeholder="Namn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat">{type ? eventTypeNames[type] : 'Välj typ'}</Button>
              </DropdownTrigger>
              <DropdownMenu
                items={Object.entries(eventTypeNames)}
                onAction={(key) => setType(key.toString())}
              >
                {(item) => <DropdownItem key={item[0]}>{item[1]}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>

            <Input
              type="text"
              placeholder="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Datum och tid"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              required
            />

            <Input
              type="text"
              placeholder="Plats"
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
        ) : (
          <RequestLogin>Vänligen logga in för att skapa evenemang.</RequestLogin>
        )}
      </section>
    </DefaultLayout>
  );
}
