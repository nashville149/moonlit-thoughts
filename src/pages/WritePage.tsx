import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { saveEntry } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const WritePage: React.FC = () => {
  const [entryText, setEntryText] = useState('');
  const [currentMood, setCurrentMood] = useState('');
  const [autoSaveVisible, setAutoSaveVisible] = useState(false);
  const navigate = useNavigate();

  const dailyPrompts = [
    "What made you smile today?",
    "Describe a moment that felt magical.",
    "What are you most grateful for right now?",
    "If today had a color, what would it be and why?",
    "What's something new you learned about yourself?"
  ];

  const todaysPrompt = dailyPrompts[new Date().getDate() % dailyPrompts.length];

  const moods = [
    { emoji: '💕', label: 'Loved' },
    { emoji: '😊', label: 'Happy' },
    { emoji: '🌸', label: 'Peaceful' },
    { emoji: '✨', label: 'Magical' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '🤔', label: 'Thoughtful' }
  ];

  useEffect(() => {
    if (entryText.length > 10) {
      const timer = setTimeout(() => {
        localStorage.setItem('draft-entry', entryText);
        setAutoSaveVisible(true);
        setTimeout(() => setAutoSaveVisible(false), 2000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [entryText]);

  const handleSave = async () => {
    if (entryText.trim()) {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: entryText.split('\n')[0].substring(0, 50) || 'Untitled',
        content: entryText,
        date: new Date().toISOString(),
        tags: [],
        mood: currentMood || '💕',
        gratitude: [],
        nextDayPlans: '',
        dailyMood: currentMood
      };

      try {
        await saveEntry(entry);
        setEntryText('');
        localStorage.removeItem('draft-entry');
        navigate('/entries');
      } catch (error) {
        alert('Failed to save entry. Please try again.');
      }
    }
  };

  return (
    <Container className="py-4">
      <div className={`auto-save ${autoSaveVisible ? 'show' : ''}`}>
        ✓ Auto-saved
      </div>

      <div className="daily-prompt">
        <div className="prompt-icon">💭</div>
        <p className="prompt-text">{todaysPrompt}</p>
      </div>

      <div className="mood-tracker">
        <h3 style={{margin: 0, color: '#be185d', fontFamily: 'Dancing Script, cursive', fontSize: '1.5rem'}}>
          How are you feeling?
        </h3>
        <div className="mood-grid">
          {moods.map(mood => (
            <div 
              key={mood.label}
              className={`mood-item ${currentMood === mood.label ? 'selected' : ''}`}
              onClick={() => setCurrentMood(mood.label)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="writing-container">
        <div className="rich-text-toolbar">
          <button className="toolbar-btn" title="Bold"><strong>B</strong></button>
          <button className="toolbar-btn" title="Italic"><em>I</em></button>
          <button className="toolbar-btn" title="Underline"><u>U</u></button>
          <button className="toolbar-btn" title="Highlight">🔆</button>
          <button className="toolbar-btn" title="List">•</button>
        </div>
        
        <textarea 
          className="writing-area"
          placeholder={`Dear diary... ${todaysPrompt}`}
          rows={12}
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
        />
        
        <div className="writing-controls">
          <div className="emoji-section">
            <span style={{fontSize: '1.1rem', color: '#9d174d'}}>Quick emojis:</span>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {['💕', '😊', '🌸', '✨', '🌙', '💭', '🦋', '🌺'].map(emoji => (
                <button 
                  key={emoji}
                  onClick={() => setEntryText(prev => prev + emoji)}
                  style={{
                    background: 'none',
                    border: '2px solid #fce7f3',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <Button className="save-btn" onClick={handleSave}>
            Save Entry 💕
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default WritePage;