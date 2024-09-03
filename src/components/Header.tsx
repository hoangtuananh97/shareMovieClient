import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../store/actions/userActions";
import { AppState } from "../types";

interface HeaderProps {
    onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (newErrors.email || newErrors.password) {
            setErrors(newErrors);
        } else {
            dispatch(loginUser({ email, password }));
        }
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    // @ts-ignore
    const parsedUser = JSON.parse(localStorage.getItem('token')) || null;
    const emailUser = parsedUser ? parsedUser.email : '';

    return (
        <header className="header">
            <div className="logo">
                <i className="fas fa-home" aria-hidden="true"></i>
                <h1>Funny Movies</h1>
            </div>
            {isAuthenticated ? (
                <div className="user-info">
                    <span>Hello, <strong>{emailUser}</strong> </span>
                    <button onClick={onOpenModal}>Share a Movie</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form className="auth" onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'error-input' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'error-input' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    <button type="submit">Login / Register</button>
                </form>
            )}
        </header>
    );
};

export default Header;
