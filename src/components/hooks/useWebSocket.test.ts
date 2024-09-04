import useWebSocket from './useWebSocket';
import {renderHook} from "@testing-library/react";
import {act} from "react";

describe('useWebSocket hook', () => {
    let mockWebSocket: any;

    beforeEach(() => {
        mockWebSocket = {
            send: jest.fn(),
            close: jest.fn(),
            onmessage: null,
            onclose: null,
            onerror: null,
        };

        global.WebSocket = jest.fn(() => mockWebSocket) as any;
    });

    it('connects to WebSocket and returns socket object', () => {
        const { result } = renderHook(() => useWebSocket('ws://example.com'));

        expect(result.current.socket).toBe(mockWebSocket);
    });

    it('sends message through WebSocket', () => {
        const { result } = renderHook(() => useWebSocket('ws://example.com'));

        act(() => {
            result.current.sendMessage('test message');
        });

        expect(mockWebSocket.send).toHaveBeenCalledWith('test message');
    });

    it('updates message state when receiving a message', () => {
        const { result } = renderHook(() => useWebSocket('ws://example.com'));

        act(() => {
            mockWebSocket.onmessage({ data: 'received message' });
        });

        expect(result.current.message).toBe('received message');
    });

    it('attempts to reconnect when connection is closed', () => {
        jest.useFakeTimers();
        renderHook(() => useWebSocket('ws://example.com'));

        act(() => {
            mockWebSocket.onclose();
        });

        jest.advanceTimersByTime(5000);

        expect(global.WebSocket).toHaveBeenCalledTimes(2);
        jest.useRealTimers();
    });
});
