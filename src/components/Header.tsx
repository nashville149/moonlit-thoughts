import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { FaBookOpen } from 'react-icons/fa';

interface HeaderProps {
  onNewEntry: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewEntry }) => {
  return (
    <Navbar as="header" className="header">
      <Container>
        <Navbar.Brand href="#home" className="header-title">
          <FaBookOpen className="header-icon" />
          Moonlit Thoughts
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
           <button className="new-entry-btn" onClick={onNewEntry}>
            + New Entry
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
