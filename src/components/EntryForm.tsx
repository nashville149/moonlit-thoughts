import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import type { JournalEntry } from '../types';

interface EntryFormProps {
  show: boolean;
  onHide: () => void;
  onSave: (entry: JournalEntry) => void;
  entryToEdit: JournalEntry | null;
}

const moods = ['💖', '😊', '🌸', '😢', '🤔', '✨'];

const EntryForm: React.FC<EntryFormProps> = ({ show, onHide, onSave, entryToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [mood, setMood] = useState('💖');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gratitude, setGratitude] = useState('');
  const [nextDayPlans, setNextDayPlans] = useState('');

  useEffect(() => {
    if (entryToEdit) {
      setTitle(entryToEdit.title);
      setContent(entryToEdit.content);
      setTags(entryToEdit.tags.join(', '));
      setMood(entryToEdit.mood);
      setDate(new Date(entryToEdit.date).toISOString().split('T')[0]);
      setGratitude(entryToEdit.gratitude?.join(', ') || '');
      setNextDayPlans(entryToEdit.nextDayPlans || '');
    } else {
      setTitle('');
      setContent('');
      setTags('');
      setMood('💖');
      setDate(new Date().toISOString().split('T')[0]);
      setGratitude('');
      setNextDayPlans('');
    }
  }, [entryToEdit, show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: entryToEdit ? entryToEdit.id : new Date().getTime().toString(),
      title,
      content,
      date: new Date(date).toISOString(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      mood,
      gratitude: gratitude.split(',').map(item => item.trim()).filter(item => item),
      nextDayPlans,
    };
    onSave(newEntry);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg" dialogClassName="modal-container">
      <Modal.Header closeButton style={{border: 'none', paddingBottom: 0}}>
        <Modal.Title style={{fontFamily: 'Dancing Script, cursive', fontSize: '2rem', color: '#be185d'}}>
          {entryToEdit ? 'Edit Your Thought' : 'Capture This Moment'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{padding: '0 2rem 2rem'}}>
        <Form onSubmit={handleSubmit}>
          <div style={{display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'center'}}>
            {moods.map(m => (
              <button 
                key={m} 
                type="button"
                onClick={() => setMood(m)}
                style={{
                  background: mood === m ? 'rgba(244, 114, 182, 0.15)' : 'none',
                  border: mood === m ? '2px solid #f472b6' : '2px solid #fce7f3',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {m}
              </button>
            ))}
          </div>
          
          <Form.Group className="mb-4">
            <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Title</Form.Label>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              style={{
                borderRadius: '12px',
                border: '2px solid #fce7f3',
                padding: '12px 16px',
                fontSize: '1.1rem'
              }}
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Date</Form.Label>
            <Form.Control 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              required 
              style={{
                borderRadius: '12px',
                border: '2px solid #fce7f3',
                padding: '12px 16px'
              }}
            />
          </Form.Group>
          
          <Form.Group className="mb-4">
            <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Your Thoughts</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={6} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              placeholder="What's on your mind today?"
              style={{
                borderRadius: '12px',
                border: '2px solid #fce7f3',
                padding: '16px',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                resize: 'vertical'
              }}
            />
          </Form.Group>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Tags</Form.Label>
                <Form.Control 
                  type="text" 
                  value={tags} 
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="mood, reflection, gratitude..."
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #fce7f3',
                    padding: '12px 16px'
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Grateful For</Form.Label>
                <Form.Control 
                  type="text" 
                  value={gratitude} 
                  onChange={(e) => setGratitude(e.target.value)}
                  placeholder="family, health, moments..."
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #fce7f3',
                    padding: '12px 16px'
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-4">
            <Form.Label style={{fontWeight: '500', color: '#831843', marginBottom: '8px'}}>Tomorrow's Plans</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={nextDayPlans} 
              onChange={(e) => setNextDayPlans(e.target.value)}
              placeholder="What do you want to accomplish tomorrow?"
              style={{
                borderRadius: '12px',
                border: '2px solid #fce7f3',
                padding: '16px',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}
            />
          </Form.Group>
          
          <div className="text-center">
            <Button 
              type="submit" 
              style={{
                background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '25px',
                fontSize: '1.1rem',
                fontWeight: '500',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.25)'
              }}
            >
              Save This Moment ✨
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EntryForm;
