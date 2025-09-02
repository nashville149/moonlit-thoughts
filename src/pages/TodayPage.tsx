import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaSave } from 'react-icons/fa';
import { getEntries, saveEntry } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const TodayPage: React.FC = () => {
  const [todaysPlans, setTodaysPlans] = useState<JournalEntry | null>(null);
  const [achievements, setAchievements] = useState('');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTodaysPlans();
  }, []);

  const loadTodaysPlans = async () => {
    const entries = await getEntries();
    
    // Find the most recent entry with nextDayPlans (plans for today)
    const plansEntry = entries
      .filter(entry => entry.nextDayPlans && entry.nextDayPlans.trim())
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    setTodaysPlans(plansEntry || null);
  };

  const extractTasks = (plansText: string) => {
    const lines = plansText.split('\n');
    const tasks: string[] = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•') && trimmed.length > 2) {
        const task = trimmed.substring(1).trim();
        // Include tasks that have content after the bullet point
        if (task && task !== '' && !task.endsWith(':') && task.length > 3) {
          tasks.push(task);
        }
      }
    });
    
    return tasks;
  };

  const toggleTask = (task: string) => {
    setCompletedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  const saveAchievements = async () => {
    if (!achievements.trim()) {
      alert('Please write your achievements first!');
      return;
    }
    
    setSaving(true);
    try {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: `Today's Achievements - ${new Date().toLocaleDateString()}`,
        content: achievements,
        date: new Date().toISOString(),
        tags: ['achievements', 'today'],
        mood: '✨',
        gratitude: [],
        nextDayPlans: `Completed Tasks: ${completedTasks.length}\n\nAchievements:\n${achievements}`,
        dailyMood: 'Accomplished'
      };
      
      await saveEntry(entry);
      
      // Success feedback
      alert('🎉 Achievements saved successfully!');
      
      // Clear the form
      setAchievements('');
      setCompletedTasks([]);
      
      // Reload data
      await loadTodaysPlans();
      
    } catch (error) {
      console.error('Save error:', error);
      alert('❌ Failed to save achievements. Please try again.');
    }
    setSaving(false);
  };

  const tasks = todaysPlans ? extractTasks(todaysPlans.nextDayPlans) : [];

  return (
    <Container className="py-5">
      <div className="today-header">
        <h1 className="today-title">Today's Progress 📊</h1>
        <p className="today-subtitle">Track what you've accomplished</p>
        <div className="today-date">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <Row>
        <Col lg={8} className="mx-auto">
          {todaysPlans ? (
            <>
              {/* Today's Plans Review */}
              <Card className="plans-review-card mb-4">
                <Card.Body>
                  <h3 className="card-title">Your Plans for Today 📋</h3>
                  <div className="plans-content">
                    {todaysPlans.nextDayPlans.split('\n').map((line, index) => (
                      <div key={index} className={`plan-line ${line.trim().startsWith('🌅') || line.trim().startsWith('📋') || line.trim().startsWith('💕') || line.trim().startsWith('🌙') ? 'section-header' : ''}`}>
                        {line}
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Task Checklist */}
              {tasks.length > 0 && (
                <Card className="task-checklist-card mb-4">
                  <Card.Body>
                    <h3 className="card-title">Task Checklist ✅</h3>
                    <div className="task-progress">
                      <span className="progress-text">
                        {completedTasks.length} of {tasks.length} completed
                      </span>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${(completedTasks.length / tasks.length) * 100}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="task-list">
                      {tasks.map((task, index) => (
                        <div key={index} className="task-item">
                          <button
                            className={`task-checkbox ${completedTasks.includes(task) ? 'completed' : ''}`}
                            onClick={() => toggleTask(task)}
                          >
                            {completedTasks.includes(task) ? <FaCheck /> : <FaTimes />}
                          </button>
                          <span className={`task-text ${completedTasks.includes(task) ? 'completed' : ''}`}>
                            {task}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              )}
            </>
          ) : (
            <Card className="no-plans-card mb-4">
              <Card.Body className="text-center">
                <h3>No Plans Found 📝</h3>
                <p>Go to the Diary page to create your plans, then come back here to track your progress!</p>
                <div className="mt-3">
                  <Link to="/diary" className="create-plans-btn me-2 btn">
                    📅 Create Plans
                  </Link>
                  <Button variant="outline-secondary" onClick={loadTodaysPlans}>
                    🔄 Refresh
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Achievements Section */}
          <Card className="achievements-card">
            <Card.Body>
              <h3 className="card-title">What Did You Achieve Today? 🏆</h3>
              
              <div className="mb-3">
                <label className="form-label" style={{fontWeight: 500, color: '#831843'}}>Your Achievements</label>
                <textarea
                  className="form-control achievements-textarea"
                  rows={6}
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder="✨ What did you accomplish today?

• Tasks I completed:
• Goals I achieved:
• Challenges I overcame:
• Things I learned:
• How I grew today:
• What made me proud:"
                  style={{
                    border: '2px solid #fce7f3',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    background: 'rgba(252, 228, 236, 0.3)',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              {achievements.trim() && (
                <div className="achievement-preview mb-3" style={{
                  background: 'rgba(244, 114, 182, 0.1)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: '#831843'
                }}>
                  📝 Preview: {achievements.length} characters written
                </div>
              )}
              
              <div className="text-center">
                <Button 
                  onClick={saveAchievements}
                  disabled={!achievements.trim() || saving}
                  style={{
                    background: saving ? '#6b7280' : 'linear-gradient(135deg, #34d399, #10b981)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 32px',
                    fontWeight: 500,
                    boxShadow: '0 4px 15px rgba(52, 211, 153, 0.25)'
                  }}
                >
                  <FaSave className="me-2" />
                  {saving ? 'Saving...' : 'Save Today\'s Achievements'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodayPage;