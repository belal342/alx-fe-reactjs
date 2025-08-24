// src/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const addButton = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    expect(todoText).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todoText);
    
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    const deleteButtons = screen.getAllByText('Delete');
    
    expect(todoText).toBeInTheDocument();
    
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });
});