import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import EventDetailCard from '@/components/events/eventDetailCard';
// import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import { CSKEvent } from '@/types/event';

export default function IndexPage() {
  // const { isAuthenticated } = useAuth();
  const { query } = useRouter();
  const { id } = query;

  const [event, setEvent] = useState<CSKEvent | null>(null);

  useEffect(() => {
    if (!id) return; // wait until id is available

    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/events/${id}`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const data = await res.json();
        setEvent(data.event);
      } catch (err: any) {
        console.log(err.message || 'Failed to fetch event');
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <DefaultLayout>
      <EventDetailCard event={event} />
    </DefaultLayout>
  );
}
