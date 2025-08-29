import { render, screen, waitFor} from '@testing-library/react';
import App from './App';

describe('App Integration Test', () => {
  test('renders login if no token is found', async () => {
    localStorage.clear(); 

    render(<App />);

    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Select user/i)).toBeInTheDocument();
  });

  test('loads welcome message if token is present', async () => {
    localStorage.setItem('token', 'staff-token');

    render(<App />);

    await waitFor(() =>
      expect(
        screen.getByText(/Welcome, Alice \(staff\)/i)
      ).toBeInTheDocument()
    );
  });

  test('shows unauthorized if token is invalid', async () => {
    localStorage.setItem('token', 'invalid-token');

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/Login/i)).toBeInTheDocument()
    );
  });
});

