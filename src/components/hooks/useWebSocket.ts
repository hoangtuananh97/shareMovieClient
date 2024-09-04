import { useEffect, useState, useRef } from 'react';

interface WebSocketHook {
  socket: WebSocket | null;
  message: string | null;
  sendMessage: (msg: string) => void;
}

const useWebSocket = (url: string, retryInterval = 5000): WebSocketHook => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const retryTimeoutRef = useRef<number | null>(null);

  const connect = () => {
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onmessage = (event) => {
      console.log('Received WebSocket message');
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('WebSocket closed, attempting to reconnect...');
      scheduleReconnect();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
  };

  const scheduleReconnect = () => {
    if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    retryTimeoutRef.current = window.setTimeout(() => {
      connect();
    }, retryInterval);
  };

  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (socket) socket.close();
      if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
    };
  }, [url]);

  return { socket, message, sendMessage };
};

export default useWebSocket;
