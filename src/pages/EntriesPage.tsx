import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaSearch, FaCalendar } from 'react-icons/fa';
import EntryList from '../components/EntryList';
import { getEntries, deleteEntry } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const EntriesPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    const fetchedEntries = await getEntries();
    setEntries(fetchedEntries);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(id);
        await loadEntries();
      } catch (error) {
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  const allTags = [...new Set(entries.flatMap(entry => entry.tags))];

  const filteredEntries = entries
    .filter(entry => {
      const matchesSearch = !searchTerm || 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <Container className="py-4">
      <div className="entries-section">
        <h1 style={{
          fontFamily: 'Dancing Script, cursive',
          fontSize: '2.5rem',
          color: '#be185d',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          Your Journal Entries
        </h1>

        <Row className="mb-4">
          <Col md={4}>
            <div style={{position: 'relative'}}>
              <FaSearch style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d1d5db'
              }} />
              <Form.Control
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '45px',
                  borderRadius: '20px',
                  border: '2px solid #fce7f3',
                  background: 'rgba(255, 255, 255, 0.9)'
                }}
              />
            </div>
          </Col>
          
          <Col md={3}>
            <Form.Select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{
                borderRadius: '20px',
                border: '2px solid #fce7f3',
                background: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </Form.Select>
          </Col>
          
          <Col md={3}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                borderRadius: '20px',
                border: '2px solid #fce7f3',
                background: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </Form.Select>
          </Col>
          
          <Col md={2}>
            <Button
              onClick={loadEntries}
              style={{
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #f472b6, #ec4899)',
                border: 'none',
                width: '100%'
              }}
            >
              <FaCalendar className="me-1" />
              Refresh
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center p-4">
            <div className="spinner-border" style={{color: '#f472b6'}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3" style={{color: '#9d174d'}}>Loading your entries...</p>
          </div>
        ) : (
          <>
            <div className="mb-3" style={{color: '#9d174d', textAlign: 'center'}}>
              Showing {filteredEntries.length} of {entries.length} entries
            </div>
            <EntryList 
              entries={filteredEntries} 
              onEdit={() => {}} 
              onDelete={handleDelete} 
            />
          </>
        )}
      </div>
    </Container>
  );
};

export default EntriesPage;