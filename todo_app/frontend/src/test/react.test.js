import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import '@testing-library/jest-dom'

test('renders todo item component', () => {
  const todo = { id: 1, taskName: 'Sample Todo', status: "pending", urgency: "Medium", date: "20/10/22" };
  const taskList = []
  render(<Card task={todo} taskList={taskList} />);
  const todoTextElement = screen.getByText(/Sample Todo/i);
  expect(todoTextElement).toBeInTheDocument();
});

