// frontend/src/test/App.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App.jsx';

test('renders the main header', async () => {
  // Ensure fetch resolves immediately with no recipes to avoid async state update warnings
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
  );

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Recipe Sharing App/i)).toBeInTheDocument();
  });
});
