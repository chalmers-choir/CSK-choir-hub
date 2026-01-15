import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import EventDetailCard from '@/components/events/eventDetailCard';
// import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';

export default function IndexPage() {
  // const { isAuthenticated } = useAuth();
  const { query } = useRouter();
  const { id } = query;

  const [event, setEvent] = useState<any>(null);

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

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="max-w-2xl text-center">
          {event && (
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-bold">{event.name}</h2>
              <p>
                <strong>Type:</strong> {event.type}
              </p>
              <p>
                <strong>Start:</strong> {new Date(event.dateStart).toLocaleString()}
              </p>
              {event.dateEnd && (
                <p>
                  <strong>End:</strong> {new Date(event.dateEnd).toLocaleString()}
                </p>
              )}
              <p>
                <strong>Place:</strong> {event.place}
              </p>
              {event.description && (
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              )}
              <p>
                <strong>Requires Attendance:</strong> {event.requiresAttendance ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Requires Registration:</strong> {event.requiresRegistration ? 'Yes' : 'No'}
              </p>

              {event.attendances && event.attendances.length > 0 && (
                <div>
                  <h3 className="mt-4 font-semibold">Attendances</h3>
                  <ul className="list-inside list-disc">
                    {event.attendances.map((a: any, idx: number) => (
                      <li key={idx}>
                        User {a.userId}: {a.status}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.registrations && event.registrations.length > 0 && (
                <div>
                  <h3 className="mt-4 font-semibold">Registrations</h3>
                  <ul className="list-inside list-disc">
                    {event.registrations.map((r: any, idx: number) => (
                      <li key={idx}>
                        User {r.user?.id || r.userId}
                        {r.comments && <> – Comments: {r.comments}</>}
                        {r.dietaryPreferences && <> – Dietary: {r.dietaryPreferences}</>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </DefaultLayout>
  );
}
