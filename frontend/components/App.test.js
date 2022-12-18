// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})
test('renders without errors', () => {
  render(<AppFunctional />)
});

test('renders the Coordinates header', () => {
  render(<AppFunctional />);
  const h3 = screen.getById(/coordinates/i);
  expect(h3).toBeInTheDocument();
});

test('renders ONE error message if user submits invalid email', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'Kyle');
  userEvent.click(screen.getByText(/submit/i));
  const error = screen.getByText(/Ouch: email must be a valid email/i);
  expect(error).toBeInTheDocument();
});

test('typing in input matches input value', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'Kyle');
  expect(screen.getByText(/Kyle/i)).toBeInTheDocument();
});

test('clicking submit resets the email input', async () => {
  render(<AppFunctional />);
  userEvent.type(screen.getByPlaceholderText('type email'), 'sorry@miss.jackson');
  userEvent.click(screen.getByText(/submit/i));
  expect(screen.getByPlaceholderText('type email')).toBeInTheDocument();
});

