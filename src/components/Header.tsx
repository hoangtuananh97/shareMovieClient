import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser, logoutUser} from "../store/actions/userActions";
import {AppState} from "../types";

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginUser({email, password}));
    }
    const handleLogout = () => {
        dispatch(logoutUser())
    }
    // @ts-ignore
    const parsedUser = JSON.parse(localStorage.getItem('token')) || null;
    const emailUser = parsedUser ? parsedUser.email : '';
    return (
        <header className="header">
            <div className="logo">
                <i className="fas fa-home" aria-hidden="true"></i>
                <h1>Funny Movies</h1>
            </div>
            {isAuthenticated ? (<div className="user-info">
                <span>Hello, <strong>{emailUser}</strong> </span>
                <button onClick={onOpenModal}>Share a Movie</button>
                <button onClick={handleLogout}>Logout</button>
            </div>) : (<form className="auth" onSubmit={handleLogin}>
                <input type="email"
                       placeholder="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                       placeholder="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login / Register</button>
            </form>)}

        </header>
    );
};

export default Header;
