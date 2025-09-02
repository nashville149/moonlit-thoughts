import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DiaryPage from './pages/DiaryPage';
import TodayPage from './pages/TodayPage';
import WeeklyPage from './pages/WeeklyPage';
import CalendarPage from './pages/CalendarPage';
import WritePage from './pages/WritePage';
import EntriesPage from './pages/EntriesPage';
import MoodPage from './pages/MoodPage';
import SettingsPage from './pages/SettingsPage';
import EntryForm from './components/EntryForm';
import type { JournalEntry } from './types';
import { saveEntry } from './utils/entryManager';

function App() {
  const [entryToEdit] = useState<JournalEntry | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSaveVisible] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const handleSave = async (entry: JournalEntry) => {
    try {
      await saveEntry(entry);
      setShowForm(false);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };



  return (
    <Router>
      <div className="app">
        {/* Floating Stars */}
        <div className="stars">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="star" style={{top: `${Math.random() * 100}%`}}>
              ✨
            </div>
          ))}
        </div>
        
        {/* Theme Toggle */}
        <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </div>
        
        {/* Auto-save Indicator */}
        <div className={`auto-save ${autoSaveVisible ? 'show' : ''}`}>
          ✓ Auto-saved
        </div>
        
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/today" element={<TodayPage />} />
          <Route path="/weekly" element={<WeeklyPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/tags" element={<EntriesPage />} />
          <Route path="/prompts" element={<WritePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        
        <EntryForm
          show={showForm}
          onHide={() => setShowForm(false)}
          onSave={handleSave}
          entryToEdit={entryToEdit}
        />
      </div>
    </Router>
  );
}

export default App;