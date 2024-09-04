// VideoNotifications.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import VideoNotifications from './VideoNotifications';
import useWebSocket from '../hooks/useWebSocket';

// Mock the useWebSocket hook
jest.mock('../hooks/useWebSocket', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseWebSocket = useWebSocket as jest.Mock;

describe('VideoNotifications Component', () => {
    const mockLocalStorage = (userEmail: string | null) => {
        const localStorageMock = (function () {
            let store: { [key: string]: string } = {};
            return {
                getItem: (key: string) => store[key] || null,
                setItem: (key: string, value: string) => (store[key] = value),
                clear: () => (store = {}),
            };
        })();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        // Set the token in localStorage
        localStorage.setItem('token', JSON.stringify({ email: userEmail }));
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers(); // Ensure timers are set to real before each test
    });

    it('renders notifications from WebSocket messages for other users', async () => {
        // Set up mock localStorage with current user email
        mockLocalStorage('current_user@example.com');

        // Mock WebSocket message for another user
        const mockMessage = JSON.stringify({
            type: 'newVideo',
            data: { id: '1', title: 'New Video Title', shared_by: 'other_user@example.com' },
        });

        mockUseWebSocket.mockReturnValue({ message: mockMessage });

        render(<VideoNotifications />);

        // Wait for the notification to be added
        await waitFor(() => {
            expect(screen.getByText('other_user@example.com')).toBeInTheDocument();
            expect(screen.getByText('New Video Title')).toBeInTheDocument();
        });
    });

    it('does not render notification if the current user is the one who shared the video', async () => {
        // Set up mock localStorage with current user email
        mockLocalStorage('current_user@example.com');

        // Mock WebSocket message from the current user
        const mockMessage = JSON.stringify({
            type: 'newVideo',
            data: { id: '1', title: 'New Video Title', shared_by: 'current_user@example.com' },
        });

        mockUseWebSocket.mockReturnValue({ message: mockMessage });

        render(<VideoNotifications />);

        // Ensure no notification is rendered
        await waitFor(() => {
            expect(screen.queryByText('current_user@example.com shared a video New Video Title')).not.toBeInTheDocument();
        });
    });

    it('automatically removes notification after 10 seconds', async () => {
        jest.useFakeTimers(); // Use fake timers for this test

        // Set up mock localStorage with current user email
        mockLocalStorage('current_user@example.com');

        // Mock WebSocket message from another user
        const mockMessage = JSON.stringify({
            type: 'newVideo',
            data: { id: '1', title: 'New Video Title', shared_by: 'other_user@example.com' },
        });

        mockUseWebSocket.mockReturnValue({ message: mockMessage });

        render(<VideoNotifications />);

        // Check the notification is rendered
        await waitFor(() => {
            expect(screen.getByText('other_user@example.com')).toBeInTheDocument();
            expect(screen.getByText('New Video Title')).toBeInTheDocument();
        });

        // Fast forward timers by 10 seconds
        jest.advanceTimersByTime(10000);

        // Check the notification is removed
        await waitFor(() => {
            expect(screen.queryByText('other_user@example.com shared a video New Video Title')).not.toBeInTheDocument();
        });

        jest.useRealTimers(); // Reset to real timers after the test
    });

    it('allows manual removal of notifications by clicking the close button', async () => {
        // Set up mock localStorage with current user email
        mockLocalStorage('current_user@example.com');

        // Mock WebSocket message from another user
        const mockMessage = JSON.stringify({
            type: 'newVideo',
            data: { id: '1', title: 'New Video Title', shared_by: 'other_user@example.com' },
        });

        mockUseWebSocket.mockReturnValue({ message: mockMessage });

        render(<VideoNotifications />);

        // Check the notification is rendered
        await waitFor(() => {
            expect(screen.getByText('other_user@example.com')).toBeInTheDocument();
            expect(screen.getByText('New Video Title')).toBeInTheDocument();
        });

        // Click the close button
        const closeButton = screen.getByRole('button', { name: /×/i });
        fireEvent.click(closeButton);

        // Ensure the notification is removed
        await waitFor(() => {
            expect(screen.queryByText('other_user@example.com shared a video New Video Title')).not.toBeInTheDocument();
        });
    });
});
