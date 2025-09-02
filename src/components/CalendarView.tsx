import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import type { JournalEntry } from '../types';

interface CalendarViewProps {
  entries: JournalEntry[];
  onDateChange: (date: Date) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ entries, onDateChange }) => {
  const entryDates = entries.map(entry => new Date(entry.date).toDateString());

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && entryDates.includes(date.toDateString())) {
      return 'has-entry';
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(value) => onDateChange(value as Date)}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarView;
