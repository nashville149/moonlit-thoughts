import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getEntries } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const CalendarPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const fetchedEntries = await getEntries();
    setEntries(fetchedEntries);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEntriesForDate = (day: number) => {
    if (!day) return [];
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === targetDate.toDateString();
    });
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentDate);

  return (
    <Container className="py-5">
      <div className="calendar-header">
        <h1 className="calendar-title">Journal Calendar 📅</h1>
        <p className="calendar-subtitle">View your entries by date</p>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="calendar-card">
            <Card.Body>
              {/* Month Navigation */}
              <div className="month-nav">
                <button className="nav-btn" onClick={() => navigateMonth(-1)}>‹</button>
                <h2 className="month-title">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button className="nav-btn" onClick={() => navigateMonth(1)}>›</button>
              </div>

              {/* Day Headers */}
              <div className="calendar-grid">
                {dayNames.map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
                
                {/* Calendar Days */}
                {days.map((day, index) => {
                  const dayEntries = day ? getEntriesForDate(day) : [];
                  const isToday = day && 
                    new Date().toDateString() === 
                    new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                  
                  return (
                    <div 
                      key={index} 
                      className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${dayEntries.length > 0 ? 'has-entries' : ''}`}
                      onClick={() => day && dayEntries.length > 0 && setSelectedEntry(dayEntries[0])}
                    >
                      {day && (
                        <>
                          <span className="day-number">{day}</span>
                          {dayEntries.length > 0 && (
                            <div className="entry-indicators">
                              {dayEntries.slice(0, 3).map((entry, i) => (
                                <div key={i} className="entry-dot" title={entry.title}>
                                  {entry.mood}
                                </div>
                              ))}
                              {dayEntries.length > 3 && (
                                <div className="entry-count">+{dayEntries.length - 3}</div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {selectedEntry ? (
            <Card className="entry-preview-card">
              <Card.Body>
                <h3 className="preview-title">
                  {selectedEntry.mood} {selectedEntry.title}
                </h3>
                <div className="preview-date">
                  {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="preview-content">
                  {selectedEntry.content.substring(0, 200)}
                  {selectedEntry.content.length > 200 && '...'}
                </div>
                {selectedEntry.tags.length > 0 && (
                  <div className="preview-tags">
                    {selectedEntry.tags.map(tag => (
                      <Badge key={tag} className="tag-badge">{tag}</Badge>
                    ))}
                  </div>
                )}
                <div className="preview-actions">
                  <Link to="/entries" className="view-all-btn">
                    View All Entries
                  </Link>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Card className="no-selection-card">
              <Card.Body className="text-center">
                <h3>📖 Select a Date</h3>
                <p>Click on a date with entries to see details</p>
                <div className="legend">
                  <div className="legend-item">
                    <div className="legend-dot today"></div>
                    <span>Today</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-dot has-entries"></div>
                    <span>Has Entries</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CalendarPage;