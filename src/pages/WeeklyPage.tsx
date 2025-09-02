import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaSave, FaCheck } from 'react-icons/fa';
import { getEntries, saveEntry } from '../utils/entryManager';
import type { JournalEntry } from '../types';

const WeeklyPage: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [todayAchievements, setTodayAchievements] = useState('');
  const [todayTasks, setTodayTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadWeeklyData();
  }, []);

  const loadWeeklyData = async () => {
    const entries = await getEntries();
    const weekData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      // Find plans for this day
      const plansEntry = entries.find(entry => {
        const planDate = new Date(entry.date);
        planDate.setDate(planDate.getDate() + 1);
        return planDate.toDateString() === dateStr && entry.nextDayPlans;
      });
      
      // Find achievements for this day
      const achievementEntry = entries.find(entry => {
        const entryDate = new Date(entry.date).toDateString();
        return entryDate === dateStr && entry.tags.includes('achievements');
      });
      
      const tasks = plansEntry ? extractTasks(plansEntry.nextDayPlans) : [];
      const completed = achievementEntry ? extractCompletedTasks(achievementEntry.nextDayPlans) : 0;
      
      weekData.push({
        date: date,
        dateStr: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        totalTasks: tasks.length,
        completedTasks: completed,
        completionRate: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0,
        hasPlans: !!plansEntry,
        hasAchievements: !!achievementEntry
      });
    }
    
    setWeeklyData(weekData);
    
    // Load today's data
    const today = weekData[6];
    if (today && today.hasPlans) {
      const todayPlans = entries.find(entry => {
        const planDate = new Date(entry.date);
        planDate.setDate(planDate.getDate() + 1);
        return planDate.toDateString() === today.dateStr && entry.nextDayPlans;
      });
      if (todayPlans) {
        setTodayTasks(extractTasks(todayPlans.nextDayPlans));
      }
    }
  };

  const extractTasks = (plansText: string) => {
    const lines = plansText.split('\n');
    const tasks: string[] = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('•') && trimmed.length > 3) {
        const task = trimmed.substring(1).trim();
        if (task && !task.endsWith(':')) {
          tasks.push(task);
        }
      }
    });
    
    return tasks;
  };

  const extractCompletedTasks = (achievementText: string) => {
    const matches = achievementText.match(/Completed Tasks: (\d+)/);
    return matches ? parseInt(matches[1]) : 0;
  };

  const saveAchievements = async () => {
    setSaving(true);
    try {
      const entry: JournalEntry = {
        id: Date.now().toString(),
        title: `Daily Achievements - ${new Date().toLocaleDateString()}`,
        content: todayAchievements,
        date: new Date().toISOString(),
        tags: ['achievements', 'daily'],
        mood: '🏆',
        gratitude: [],
        nextDayPlans: `Completed Tasks: ${completedTasks.length}\n\nAchievements:\n${todayAchievements}`,
        dailyMood: 'Accomplished'
      };
      
      await saveEntry(entry);
      await loadWeeklyData();
      setTodayAchievements('');
      setCompletedTasks([]);
    } catch (error) {
      alert('Failed to save achievements.');
    }
    setSaving(false);
  };

  const maxTasks = Math.max(...weeklyData.map(d => d.totalTasks), 1);

  return (
    <Container className="py-5">
      <div className="weekly-header">
        <h1 className="weekly-title">Weekly Progress 📊</h1>
        <p className="weekly-subtitle">Track your achievements over the week</p>
      </div>

      <Row>
        <Col lg={10} className="mx-auto">
          {/* Weekly Chart */}
          <Card className="weekly-chart-card mb-4">
            <Card.Body>
              <h3 className="chart-title">This Week's Performance</h3>
              <div className="chart-container">
                {weeklyData.map((day, index) => (
                  <div key={index} className="chart-day">
                    <div className="chart-bars">
                      <div 
                        className="chart-bar total"
                        style={{height: `${(day.totalTasks / maxTasks) * 100}px`}}
                        title={`${day.totalTasks} total tasks`}
                      ></div>
                      <div 
                        className="chart-bar completed"
                        style={{height: `${(day.completedTasks / maxTasks) * 100}px`}}
                        title={`${day.completedTasks} completed tasks`}
                      ></div>
                    </div>
                    <div className="chart-percentage">{day.completionRate}%</div>
                    <div className="chart-day-name">{day.dayName}</div>
                    <div className="chart-date">{day.date.getDate()}</div>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color total"></div>
                  <span>Total Tasks</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color completed"></div>
                  <span>Completed</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Today's Tasks */}
          {todayTasks.length > 0 && (
            <Card className="today-tasks-card mb-4">
              <Card.Body>
                <h3 className="card-title">Today's Tasks ✅</h3>
                <div className="task-list">
                  {todayTasks.map((task, index) => (
                    <div key={index} className="task-item">
                      <button
                        className={`task-checkbox ${completedTasks.includes(task) ? 'completed' : ''}`}
                        onClick={() => setCompletedTasks(prev => 
                          prev.includes(task) 
                            ? prev.filter(t => t !== task)
                            : [...prev, task]
                        )}
                      >
                        <FaCheck />
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

          {/* Achievements Form */}
          <Card className="achievements-form-card">
            <Card.Body>
              <h3 className="card-title">Today's Achievements 🏆</h3>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={todayAchievements}
                  onChange={(e) => setTodayAchievements(e.target.value)}
                  placeholder="What did you accomplish today?
• Tasks completed
• Goals achieved  
• Challenges overcome
• Skills learned
• Progress made"
                  className="achievements-textarea"
                />
              </Form.Group>
              
              <div className="achievements-summary">
                <span className="summary-text">
                  Tasks completed: {completedTasks.length} of {todayTasks.length}
                </span>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={saveAchievements}
                  disabled={!todayAchievements.trim() || saving}
                  className="save-achievements-btn"
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

export default WeeklyPage;