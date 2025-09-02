import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaPen, FaHeart, FaBook, FaSave } from 'react-icons/fa';
import { saveEntry } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const DiaryPage: React.FC = () => {
  const [entryText, setEntryText] = useState('');
  const [currentMood, setCurrentMood] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  
  const moods = [
    { emoji: '💕', label: 'Loved' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '🌸', label: 'Peaceful' },
    { emoji: '✨', label: 'Magical' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '🤔', label: 'Thoughtful' }
  ];
  
  const handleSave = async () => {
    if (!entryText.trim()) return;
    
    setSaving(true);
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: `Tomorrow's Plans - ${tomorrow.toLocaleDateString()}`,
        content: 'Planning entry for tomorrow',
        date: new Date().toISOString(),
        tags: ['plans', 'tomorrow'],
        mood: currentMood || '💕',
        gratitude: [],
        nextDayPlans: entryText,
        dailyMood: currentMood
      };
      
      await saveEntry(entry);
      setEntryText('');
      setCurrentMood('');
      navigate('/entries');
    } catch (error) {
      alert('Failed to save entry. Please try again.');
    }
    setSaving(false);
  };
  
  const quotes = [
    {
      text: "The act of writing is the act of discovering what you believe.",
      author: "David Hare",
      category: "creativity"
    },
    {
      text: "Your journal is a place where you can be completely honest with yourself.",
      author: "Julia Cameron",
      category: "mindfulness"
    },
    {
      text: "Writing is the painting of the voice.",
      author: "Voltaire",
      category: "creativity"
    },
    {
      text: "In the journal I am at ease.",
      author: "Anaïs Nin",
      category: "journaling"
    }
  ];

  const todaysQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="diary-page">
      {/* Notebook Background Elements */}
      <div className="notebook-lines"></div>
      <div className="notebook-margin"></div>
      
      <Container className="py-5">
        {/* Header */}
        <div className="diary-header">
          <h1 className="diary-title">Dear Diary... 📖</h1>
          <p className="diary-subtitle">A space for reflection, dreams, and quiet moments</p>
        </div>

        <Row>
          <Col lg={8} className="mx-auto">
            {/* Featured Quote */}
            <Card className="quote-card mb-5">
              <Card.Body>
                <div className="quote-content">
                  <div className="quote-mark">"</div>
                  <blockquote className="quote-text">
                    {todaysQuote.text}
                  </blockquote>
                  <div className="quote-author">— {todaysQuote.author}</div>
                </div>
              </Card.Body>
            </Card>

            {/* Tomorrow's Plans Template */}
            <Card className="diary-entry-form mb-5">
              <Card.Body>
                <div className="plans-header">
                  <h3 className="entry-form-title">Tomorrow's Plans 📅</h3>
                  <p className="plans-subtitle">Plan your perfect day ahead</p>
                  <div className="tomorrow-date">
                    {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                {/* Tomorrow's Mood Goal */}
                <div className="diary-mood-selector mb-4">
                  <label className="mood-label">How do you want to feel tomorrow?</label>
                  <div className="mood-options">
                    {moods.map(mood => (
                      <button
                        key={mood.label}
                        className={`mood-btn ${currentMood === mood.label ? 'selected' : ''}`}
                        onClick={() => setCurrentMood(mood.label)}
                      >
                        <span className="mood-emoji">{mood.emoji}</span>
                        <span className="mood-text">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Plans Template */}
                <Form.Group className="mb-3">
                  <Form.Label className="entry-label">Tomorrow's Action Plan</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={12}
                    value={entryText}
                    onChange={(e) => setEntryText(e.target.value)}
                    className="diary-textarea plans-textarea"
                  />
                </Form.Group>
                
                {/* Template Button */}
                <div className="text-center mb-3">
                  <Button 
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setEntryText(`🌅 Morning Goals:
• Wake up at: 
• First thing I'll do: 
• Morning routine: 

📋 Main Tasks:
• Priority 1: 
• Priority 2: 
• Priority 3: 

💕 Self-Care:
• How I'll take care of myself: 
• Something fun I'll do: 

🌙 Evening Reflection:
• What I want to accomplish: 
• How I'll wind down: `)}
                    className="template-btn"
                  >
                    📋 Use Template
                  </Button>
                </div>
                
                {/* Save Button */}
                <div className="text-center">
                  <Button 
                    onClick={handleSave}
                    disabled={!entryText.trim() || saving}
                    className="diary-save-btn"
                  >
                    <FaSave className="me-2" />
                    {saving ? 'Saving Plans...' : 'Save Tomorrow\'s Plans'}
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            {/* Handwritten Note */}
            <Card className="handwritten-note mb-5">
              <Card.Body>
                <div className="note-content">
                  <div className="note-date">Today's Reflection</div>
                  <div className="handwritten-text">
                    Sometimes the most beautiful moments<br/>
                    are the quiet ones... when we sit<br/>
                    with our thoughts and let our<br/>
                    hearts speak through our pen ✨<br/>
                    <br/>
                    What story will you tell today?
                  </div>
                  <div className="note-signature">~ Your Journal 💕</div>
                </div>
              </Card.Body>
            </Card>

            {/* Inspiration Grid */}
            <Row className="inspiration-grid mb-5">
              <Col md={6} className="mb-4">
                <Card className="inspiration-card">
                  <Card.Body>
                    <div className="inspiration-icon">🌙</div>
                    <h3>Evening Reflections</h3>
                    <p>"The night is the hardest time to be alive and 4am knows all my secrets."</p>
                    <small>— Poppy Z. Brite</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="inspiration-card">
                  <Card.Body>
                    <div className="inspiration-icon">🌸</div>
                    <h3>Morning Pages</h3>
                    <p>"Morning pages are three pages of longhand writing, strictly stream-of-consciousness."</p>
                    <small>— Julia Cameron</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="inspiration-card">
                  <Card.Body>
                    <div className="inspiration-icon">✨</div>
                    <h3>Creative Flow</h3>
                    <p>"You must stay drunk on writing so reality cannot destroy you."</p>
                    <small>— Ray Bradbury</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card className="inspiration-card">
                  <Card.Body>
                    <div className="inspiration-icon">💭</div>
                    <h3>Mindful Moments</h3>
                    <p>"The present moment is the only time over which we have dominion."</p>
                    <small>— Thích Nhất Hạnh</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div className="diary-actions">
              <Row>
                <Col md={3} className="mb-3">
                  <Link to="/write" className="diary-action-btn primary">
                    <FaPen className="action-btn-icon" />
                    <span>Start Writing</span>
                    <small>Capture this moment</small>
                  </Link>
                </Col>
                <Col md={3} className="mb-3">
                  <Link to="/today" className="diary-action-btn secondary">
                    <FaHeart className="action-btn-icon" />
                    <span>Today</span>
                    <small>Track progress</small>
                  </Link>
                </Col>
                <Col md={3} className="mb-3">
                  <Link to="/weekly" className="diary-action-btn secondary">
                    <FaBook className="action-btn-icon" />
                    <span>Weekly</span>
                    <small>View achievements</small>
                  </Link>
                </Col>
                <Col md={3} className="mb-3">
                  <Link to="/entries" className="diary-action-btn secondary">
                    <FaBook className="action-btn-icon" />
                    <span>All Entries</span>
                    <small>Read past entries</small>
                  </Link>
                </Col>
              </Row>
            </div>

            {/* Footer Quote */}
            <div className="diary-footer">
              <p className="footer-quote">
                "Fill your paper with the breathings of your heart." — William Wordsworth
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DiaryPage;