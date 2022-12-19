import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';


// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
});

test('renders without errors', () => {
  render(<AppFunctional />)
});

test('renders the Coordinates header', () => {
  render(<AppFunctional />);
  const h3 = screen.getByText(/coordinates/i);
  expect(h3).toBeInTheDocument();
});

test('renders ONE error message if user submits invalid email', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'Kyle');
  userEvent.click(screen.getByTestId(/submit/i));
  expect(screen.getByDisplayValue(/Ouch: email must be a valid email/i)).toBeInTheDocument();
});

test('typing in input matches input value', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'Kyle');
  expect(screen.getByDisplayValue(/Kyle/i)).toBeInTheDocument();
});

test('clicking submit resets the email input', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'sorry@miss.jackson');
  userEvent.click(screen.getByTestId(/submit/i));
  expect(screen.getByPlaceholderText('type email')).toBeInTheDocument();
});

