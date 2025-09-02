import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaPen, FaArchive, FaHeart, FaCog, FaCalendar } from 'react-icons/fa';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      padding: '16px 0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
    }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.5rem',
          color: '#0f172a',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '-0.025em'
        }}>
          Moonlit Thoughts
        </Navbar.Brand>
        
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            {[
              { path: '/', icon: FaHome, label: 'Home' },
              { path: '/diary', icon: FaBook, label: 'Diary' },
              { path: '/today', icon: FaArchive, label: 'Today' },
              { path: '/weekly', icon: FaHeart, label: 'Weekly' },
              { path: '/calendar', icon: FaCalendar, label: 'Calendar' },
              { path: '/write', icon: FaPen, label: 'Write' },
              { path: '/entries', icon: FaArchive, label: 'Entries' },
              { path: '/mood', icon: FaHeart, label: 'Mood' },
              { path: '/settings', icon: FaCog, label: 'Settings' }
            ].map(({ path, icon: Icon, label }) => (
              <Nav.Link
                key={path}
                as={Link}
                to={path}
                style={{
                  color: location.pathname === path ? '#3b82f6' : '#64748b',
                  fontWeight: location.pathname === path ? 600 : 500,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: location.pathname === path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;