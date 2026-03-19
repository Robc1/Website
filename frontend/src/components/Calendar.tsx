import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={[
          {
            title: 'Example Event',
            date: '2026-01-10',
          },
        ]}
      />
    </div>
  );
}
