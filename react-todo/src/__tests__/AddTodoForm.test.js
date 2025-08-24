// src/__tests__/AddTodoForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
    expect(screen.getByText('Add Todo')).toBeInTheDocument();
  });

  test('calls onAdd with input value when form is submitted', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);
    
    expect(mockOnAdd).toHaveBeenCalledWith('New Todo');
  });

  test('clears input after form submission', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });

  test('does not call onAdd when input is empty', () => {
    render(<AddTodoForm onAdd={mockOnAdd} />);
    
    const button = screen.getByText('Add Todo');
    
    fireEvent.click(button);
    
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});