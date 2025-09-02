import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FaMoon, FaSun, FaDownload, FaTrash } from 'react-icons/fa';

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const handleExportData = () => {
    const entries = localStorage.getItem('moonlit-thoughts-entries') || '[]';
    const blob = new Blob([entries], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'moonlit-thoughts-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all your entries? This cannot be undone.')) {
      localStorage.clear();
      alert('All data has been cleared.');
    }
  };

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
          Settings ⚙️
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
                  Appearance
                </h3>

                <div className="mb-4">
                  <Form.Label style={{fontWeight: 500, color: '#831843'}}>Theme</Form.Label>
                  <div style={{display: 'flex', gap: '12px', marginTop: '8px'}}>
                    <Button
                      variant={!darkMode ? 'primary' : 'outline-primary'}
                      onClick={() => setDarkMode(false)}
                      style={{
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaSun /> Light
                    </Button>
                    <Button
                      variant={darkMode ? 'primary' : 'outline-primary'}
                      onClick={() => setDarkMode(true)}
                      style={{
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <FaMoon /> Dark
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Form.Label style={{fontWeight: 500, color: '#831843'}}>Font Size</Form.Label>
                  <Form.Select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    style={{
                      borderRadius: '12px',
                      border: '2px solid #fce7f3',
                      marginTop: '8px'
                    }}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </Form.Select>
                </div>
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
                  Preferences
                </h3>

                <div className="mb-4">
                  <Form.Check
                    type="switch"
                    id="auto-save"
                    label="Auto-save entries"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    style={{fontSize: '1.1rem'}}
                  />
                </div>

                <div className="mb-4">
                  <Form.Check
                    type="switch"
                    id="notifications"
                    label="Daily writing reminders"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    style={{fontSize: '1.1rem'}}
                  />
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
              Data Management
            </h3>

            <Row>
              <Col md={6}>
                <Button
                  onClick={handleExportData}
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #10b981)',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '12px 24px',
                    width: '100%',
                    marginBottom: '16px'
                  }}
                >
                  <FaDownload className="me-2" />
                  Export All Entries
                </Button>
              </Col>
              
              <Col md={6}>
                <Button
                  variant="danger"
                  onClick={handleClearData}
                  style={{
                    borderRadius: '20px',
                    padding: '12px 24px',
                    width: '100%',
                    marginBottom: '16px'
                  }}
                >
                  <FaTrash className="me-2" />
                  Clear All Data
                </Button>
              </Col>
            </Row>

            <div style={{
              background: 'rgba(244, 114, 182, 0.05)',
              padding: '16px',
              borderRadius: '12px',
              marginTop: '16px'
            }}>
              <small style={{color: '#831843'}}>
                💡 Tip: Export your entries regularly to keep your memories safe. 
                Your data is stored locally in your browser.
              </small>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SettingsPage;