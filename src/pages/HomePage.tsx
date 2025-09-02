import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPen, FaBook, FaHeart, FaCog, FaArchive } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <div className="modern-home">
      <Container fluid className="px-0">
        {/* Hero Section */}
        <section className="hero-section">
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6}>
                <div className="hero-content">
                  <h1 className="hero-title">Your Digital Journal</h1>
                  <p className="hero-subtitle">Capture thoughts, track moods, and reflect on your journey with a beautiful, intuitive journaling experience.</p>
                  <div className="hero-actions">
                    <Link to="/write" className="btn-primary-large">
                      <FaPen className="me-2" />
                      Start Writing
                    </Link>
                    <Link to="/entries" className="btn-secondary-large">
                      <FaBook className="me-2" />
                      Browse Entries
                    </Link>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className="hero-visual">
                  <div className="feature-preview">
                    <div className="preview-header">
                      <div className="preview-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="preview-content">
                      <div className="preview-line long"></div>
                      <div className="preview-line medium"></div>
                      <div className="preview-line short"></div>
                      <div className="preview-emoji">😊 ✨ 💭</div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <Container>
            <div className="section-header">
              <h2>Everything you need to journal</h2>
              <p>Powerful features designed for mindful reflection</p>
            </div>
            <Row className="g-4">
              <Col md={6} lg={3}>
                <Link to="/diary" className="feature-card">
                  <div className="feature-icon">
                    <FaBook />
                  </div>
                  <h3>Plan Tomorrow</h3>
                  <p>Set intentions and goals for the day ahead</p>
                </Link>
              </Col>
              <Col md={6} lg={3}>
                <Link to="/today" className="feature-card">
                  <div className="feature-icon">
                    <FaArchive />
                  </div>
                  <h3>Track Progress</h3>
                  <p>Monitor daily achievements and completed tasks</p>
                </Link>
              </Col>
              <Col md={6} lg={3}>
                <Link to="/weekly" className="feature-card">
                  <div className="feature-icon">
                    <FaHeart />
                  </div>
                  <h3>Weekly Insights</h3>
                  <p>Visualize patterns and celebrate growth</p>
                </Link>
              </Col>
              <Col md={6} lg={3}>
                <Link to="/calendar" className="feature-card">
                  <div className="feature-icon">
                    <FaCog />
                  </div>
                  <h3>Calendar View</h3>
                  <p>Browse entries by date and timeline</p>
                </Link>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Quick Stats */}
        <section className="stats-section">
          <Container>
            <Row className="text-center">
              <Col md={4}>
                <div className="stat-item">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Unlimited Entries</div>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-item">
                  <div className="stat-number">📱</div>
                  <div className="stat-label">Mobile Friendly</div>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-item">
                  <div className="stat-number">🔒</div>
                  <div className="stat-label">Private & Secure</div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;