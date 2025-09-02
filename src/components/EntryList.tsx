import React from 'react';
import type { JournalEntry } from '../types';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface EntryListProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return <div className="entry-list-empty"><p>No thoughts penned on this day. ✨</p></div>;
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <div key={entry.id} className="entry-card">
          <div className="entry-card-header">
            <div className="entry-card-mood">{entry.mood}</div>
            <h3 className="entry-card-title">{entry.title}</h3>
            <div className="entry-card-date">
              {new Date(entry.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          <p className="entry-card-content">{entry.content}</p>
          {entry.gratitude && entry.gratitude.length > 0 && (
            <div className="entry-gratitude">
              <strong>Grateful for:</strong> {entry.gratitude.join(', ')}
            </div>
          )}
          {entry.nextDayPlans && (
            <div className="entry-plans">
              <strong>Tomorrow's Plans:</strong> {entry.nextDayPlans}
            </div>
          )}
          <div className="entry-card-footer">
            <div className="entry-card-tags">
              {entry.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="entry-card-actions">
              <button onClick={() => onEdit(entry)}><FaEdit /></button>
              <button onClick={() => onDelete(entry.id)}><FaTrash /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntryList;
