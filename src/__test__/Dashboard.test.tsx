import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
describe('Dashboard Component', () => {
  it('renders the provided text', () => {
    const text = 'Welcome to the Dashboard';
    render(
      <Router>
        <Dashboard text={text} />
      </Router>,
    );
    const dashboardText = screen.getByText(text);
    expect(dashboardText).toBeInTheDocument();
  });
  it('renders the React logo', () => {
    render(
      <Router>
        <Dashboard text="Sample Text" />
      </Router>,
    );
    const logo = screen.getByAltText('react-logo');
    expect(logo).toBeInTheDocument();
  });
});
