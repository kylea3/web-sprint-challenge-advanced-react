import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import AppFunctional from './AppFunctional';


const email = document.querySelector('#email');
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

test('renders ONE error message if user submits invalid email', () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'Kyle');
  userEvent.click(screen.getByTestId(/submit/i));
  screen.findByText('Ouch: email is required')
})

test('typing in input matches input value', () => {
  render(<AppFunctional />);
  const email = document.querySelector('#email');
  fireEvent.change(email, { target: { value: 'Kyle' } });
  screen.findByText('Kyle');
});

test('clicking submit resets the email input', () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'sorry@miss.jackson');
  userEvent.click(screen.getByTestId(/submit/i));
  expect(screen.getByPlaceholderText('type email')).toBeInTheDocument();
});

