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

  const swedishName: Record<string, string> = {
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
                <Button variant="flat">{type ? swedishName[type] : 'Välj typ'}</Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => setType(key.toString())}>
                <DropdownItem key="REHEARSAL">Repetition</DropdownItem>
                <DropdownItem key="CONCERT">Konsert</DropdownItem>
                <DropdownItem key="GIG">Gig</DropdownItem>
                <DropdownItem key="PARTY">Fest</DropdownItem>
                <DropdownItem key="MEETING">Möte</DropdownItem>
                <DropdownItem key="OTHER">Annat</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Input
              type="description"
              placeholder="Beskrivning"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Input
              type="dateStart"
              placeholder="Datum och tid"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              required
            />

            <Input
              type="place"
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
