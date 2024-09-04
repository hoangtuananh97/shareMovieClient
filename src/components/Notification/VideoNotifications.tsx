import React, { useEffect, useState, useCallback } from 'react';
import useWebSocket from "../hooks/useWebSocket";

interface Notifications {
    id: string;
    title: string;
    shared_by: string;
    onClose: () => void;
}

interface WebSocketMessage {
    id: string;
    type: string;
    title?: string;
    shared_by?: string;
}

function isJsonString(data: string): boolean {
    try {
        JSON.parse(data);
    } catch (e) {
        return false;
    }
    return true;
}

const Notification: React.FC<Notifications> = ({ id, title, shared_by, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 10000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="notification info">
            <span className="notification-content">
                <strong>{shared_by}</strong> shared a video <strong>{title}</strong>
            </span>
            <button className="notification-close" onClick={handleClose}>&times;</button>
        </div>
    );
};

const VideoNotifications: React.FC = () => {
    const { message } = useWebSocket('ws://localhost:8000/ws');
    const [notifications, setNotifications] = useState<{ id: string, title: string, shared_by: string }[]>([]);
    // @ts-ignore
    const parsedUser = JSON.parse(localStorage.getItem('token'));
    const currentUser = parsedUser ? parsedUser.email : '';

    useEffect(() => {
        if (message && isJsonString(message)) {
            const messageData = JSON.parse(message);
            const parsedMessageData: WebSocketMessage = messageData.data;

            if (messageData.type === 'newVideo' && currentUser && parsedMessageData.shared_by !== currentUser) {
                setNotifications((prev) => [
                    ...prev,
                    {
                        id: `${new Date().getTime()}-${parsedMessageData.id}`,
                        title: parsedMessageData.title!,
                        shared_by: parsedMessageData.shared_by!,
                    }
                ].slice(-5));
            }
        }
    }, [message, currentUser]);

    const handleRemoveNotification = useCallback((index: number) => {
        setNotifications((prev) => prev.filter((_, i) => i !== index));
    }, []);

    return (
        <div className="notifications-container">
            {notifications.map((note, index) => (
                <Notification
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    shared_by={note.shared_by}
                    onClose={() => handleRemoveNotification(index)}
                />
            ))}
        </div>
    );
};

export default VideoNotifications;
