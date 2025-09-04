import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

afterEach(() => {
  localStorage.clear();
});

describe('App Integration Test', () => {
  test('renders login if no token is found', async () => {
    render(<App />);
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
  });

  test('loads welcome message if token is present', async () => {
    localStorage.setItem('token', 'staff-token');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome, Alice \(staff\)/i)).toBeInTheDocument();
    });
  });
});



