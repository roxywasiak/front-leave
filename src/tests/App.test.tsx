import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

afterEach(() => {
  localStorage.clear();
});

describe('App Integration Test', () => {
  test('renders login if no token is found', async () => {
    render(<App />);
    expect(await screen.findByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Select user/i)).toBeInTheDocument();
  });

  test('loads welcome message if token is present', async () => {
    localStorage.setItem('token', 'staff-token');
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Welcome, Alice \(staff\)/i)).toBeInTheDocument();
    });
  });

  test('staff can submit a leave request', async () => {
    localStorage.setItem('token', 'staff-token');
    render(<App />);

    // Wait for dashboard to load
    await screen.findByText(/Welcome, Alice/i);


    const input = screen.getByPlaceholderText(/number of days/i);
    const button = screen.getByRole('button', { name: /submit/i });

    await userEvent.clear(input);
    await userEvent.type(input, '3');
    await userEvent.click(button);

    await screen.findByText(/Leave request submitted/i);
  });

  test('manager sees leave requests but not leave request form', async () => {
    localStorage.setItem('token', 'manager-token');
    render(<App />);

    await screen.findByText(/Welcome, Bob \(manager\)/i);

    expect(screen.getByText(/Leave Requests/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/number of days/i)).not.toBeInTheDocument();
  });

  test('admin sees admin dashboard message only', async () => {
    localStorage.setItem('token', 'admin-token');
    render(<App />)

    await screen.findByText(/Admin Dashboard/i);

    expect(screen.queryByText(/Leave Requests/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/number of days/i)).not.toBeInTheDocument();
  });

  test('shows login screen if token is invalid', async () => {
    localStorage.setItem('token', 'invalid-token');
    render(<App />);

    await screen.findByText(/Login/i);
    expect(screen.getByText(/Select user/i)).toBeInTheDocument();
  });
});


