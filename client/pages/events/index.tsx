import React, { useEffect, useState } from 'react';

import { Link } from '@heroui/link';
import { button as buttonStyles } from '@heroui/theme';

import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import DefaultLayout from '@/layouts/default';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

export default function IndexPage() {
  const { isAuthenticated } = useAuth();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {isAuthenticated ? (
          <div className="text-center">
            <p className="mb-2 text-lg">Events!</p>
            <EventCalendar />
          </div>
        ) : (
          <div>
            <div className="text-center">
              <p className="mb-2 text-lg">Vänligen logga in för att se evenemang.</p>
            </div>
            <div className="flex justify-center gap-3">
              <Link
                className={buttonStyles({ color: 'primary', radius: 'full', variant: 'shadow' })}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={buttonStyles({ variant: 'bordered', radius: 'full' })}
                href="/register"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}

const api = axios.create({
  baseURL: siteConfig.apiBaseUrl + '/events',
  withCredentials: true,
});

function EventCalendar() {
  // Event calendar gives a react FullCalendar with all events in it

  // If you click a particular date, you get a collapsable info section
  // for each event on that date

  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
  );
  const [dayEvents, setDayEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await api.get('/');
        // Map your API events to FullCalendar event objects
        const calendarEvents = res.data.events.map((e: any) => ({
          id: e.id,
          title: `${e.name} (${e.type}) @ ${e.place}`,
          start: e.dateStart,
          end: e.dateEnd,
          place: e.place,
        }));
        setEvents(calendarEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      }
    }

    fetchEvents();
  }, []);

  const handleDateClick = (dateClickInfo: any) => {
    const clickedDate = dateClickInfo.dateStr; // ISO string like "2024-08-15"
    setSelectedDate(clickedDate);

    // Filter events that start on this date
    const filtered = events.filter((e) => e.start.startsWith(clickedDate));
    setDayEvents(filtered);
  };

  // clicking an event is the same as clicking the day of that event, because events
  // are too small for handling it as selecting the actual event to feel intuitive,
  // especially on mobile
  const handleEventClick = (eventClickInfo: any) => {
    var date = eventClickInfo.event.start;
    var dateClickInfo = {
      dateStr: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    };
    handleDateClick(dateClickInfo);
  };

  const CollapsibleEvent = ({ event }: { event: any }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="mb-2 rounded border">
        <div className="cursor-pointer bg-gray-200 px-3 py-2" onClick={() => setOpen(!open)}>
          {event.title}
        </div>
        {open && (
          <div className="bg-gray-50 p-3">
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>
            <p>Place: {event.place}</p>
            {event.original.description && <p>Description: {event.original.description}</p>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {/*Display collapsable events of selected date above the calendar (so you don't risk
      missing that they appear if you are on a small screen)*/}
      {selectedDate && (
        <div className="mx-auto mt-6 w-full max-w-xl">
          <h3 className="mb-2 text-lg">Events on {selectedDate}</h3>
          {dayEvents.length === 0 && <p>No events that day.</p>}
          {dayEvents.map((e) => (
            <CollapsibleEvent key={e.id} event={e} />
          ))}
        </div>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
}
