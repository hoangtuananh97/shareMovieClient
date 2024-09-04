import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from './Header';

const mockStore = configureStore([]);

describe('Header component', () => {
  it('renders login form when not authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });

    render(
        <Provider store={store}>
          <Header onOpenModal={() => {}} />
        </Provider>
    );

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login / Register')).toBeInTheDocument();
  });

  it('renders user info when authenticated', () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });

    localStorage.setItem('token', JSON.stringify({ email: 'test@example.com' }));

    render(
        <Provider store={store}>
          <Header onOpenModal={() => {}} />
        </Provider>
    );

    expect(screen.getByText('Share a Movie')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('dispatches login action when form is submitted', () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });

    render(
        <Provider store={store}>
          <Header onOpenModal={() => {}} />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Login / Register'));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'LOGIN_USER',
      payload: { email: 'test@example.com', password: 'password123' },
    });
  });
});
