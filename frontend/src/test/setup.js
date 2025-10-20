// frontend/src/test/setup.js
import '@testing-library/jest-dom';

// Provide a lightweight global fetch mock for tests so components that
// call `fetch` during mount don't throw in Node environments.
// This default mock returns an empty array for successful JSON responses.
global.fetch = global.fetch || jest.fn(() =>
	Promise.resolve({ ok: true, json: () => Promise.resolve([]) })
);