import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getEntries } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const MoodPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [moodStats, setMoodStats] = useState<Record<string, number>>({});

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    const fetchedEntries = await getEntries();
    setEntries(fetchedEntries);
    
    const stats: Record<string, number> = {};
    fetchedEntries.forEach(entry => {
      if (entry.dailyMood || entry.mood) {
        const mood = entry.dailyMood || entry.mood;
        stats[mood] = (stats[mood] || 0) + 1;
      }
    });
    setMoodStats(stats);
  };

  const moodColors: Record<string, string> = {
    'Loved': '#f472b6',
    'Happy': '#fbbf24',
    'Peaceful': '#a78bfa',
    'Magical': '#34d399',
    'Sad': '#60a5fa',
    'Thoughtful': '#fb7185'
  };

  const recentEntries = entries.slice(0, 7).reverse();

  return (
    <Container className="py-4">
      <div className="entries-section">
        <h1 style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '2.5rem',
          color: '#be185d',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Mood Tracker 💕
        </h1>

        <Row>
          <Col md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(236, 72, 153, 0.08)',
              marginBottom: '24px'
            }}>
              <Card.Body>
                <h3 style={{
                  fontFamily: 'Dancing Script, cursive',
                  color: '#be185d',
                  fontSize: '1.8rem',
                  marginBottom: '20px'
                }}>
                  Mood Overview
                </h3>
                
                {Object.entries(moodStats).map(([mood, count]) => (
                  <div key={mood} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(244, 114, 182, 0.1)'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: moodColors[mood] || '#f472b6'
                      }} />
                      <span style={{fontWeight: 500, color: '#831843'}}>{mood}</span>
                    </div>
                    <span style={{
                      background: 'rgba(244, 114, 182, 0.1)',
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      color: '#be185d'
                    }}>
                      {count} entries
                    </span>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card style={{
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(236, 72, 153, 0.08)',
              marginBottom: '24px'
            }}>
              <Card.Body>
                <h3 style={{
                  fontFamily: 'Dancing Script, cursive',
                  color: '#be185d',
                  fontSize: '1.8rem',
                  marginBottom: '20px'
                }}>
                  Recent Mood Trend
                </h3>
                
                <div style={{display: 'flex', gap: '8px', alignItems: 'end', height: '200px'}}>
                  {recentEntries.map((entry, index) => {
                    const mood = entry.dailyMood || entry.mood;
                    const height = Math.random() * 80 + 40; // Placeholder for actual mood intensity
                    
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flex: 1
                      }}>
                        <div style={{
                          width: '100%',
                          height: `${height}px`,
                          background: `linear-gradient(to top, ${moodColors[mood] || '#f472b6'}, rgba(244, 114, 182, 0.3))`,
                          borderRadius: '8px 8px 0 0',
                          marginBottom: '8px'
                        }} />
                        <div style={{fontSize: '1.2rem'}}>{mood === 'Loved' ? '💕' : mood === 'Happy' ? '😊' : '🌸'}</div>
                        <div style={{fontSize: '0.7rem', color: '#9d174d', textAlign: 'center'}}>
                          {new Date(entry.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card style={{
          background: 'rgba(255, 255, 255, 0.95)',
          border: 'none',
          borderRadius: '20px',
          boxShadow: '0 8px 32px rgba(236, 72, 153, 0.08)'
        }}>
          <Card.Body>
            <h3 style={{
              fontFamily: 'Dancing Script, cursive',
              color: '#be185d',
              fontSize: '1.8rem',
              marginBottom: '20px'
            }}>
              Mood Insights ✨
            </h3>
            
            <div style={{
              background: 'rgba(244, 114, 182, 0.05)',
              padding: '20px',
              borderRadius: '16px',
              borderLeft: '4px solid #f472b6'
            }}>
              <p style={{margin: 0, color: '#831843', lineHeight: 1.6}}>
                {Object.keys(moodStats).length > 0 ? (
                  `You've been feeling mostly ${Object.entries(moodStats).sort((a, b) => b[1] - a[1])[0][0].toLowerCase()} lately. 
                  Remember that all emotions are valid and part of your beautiful journey. Keep writing to track your emotional patterns! 💕`
                ) : (
                  "Start tracking your moods by writing entries! Understanding your emotional patterns can help you grow and find balance. 🌸"
                )}
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default MoodPage;