import React, {useState} from 'react';
import {Provider} from 'react-redux';
import Header from './components/Header';
import MovieGallery from './components/Movie/MovieGallery';
import UploadMovieForm from './components/Movie/UploadMovieForm';
import VideoNotifications from './components/Notification/VideoNotifications';

import Modal from './components/Modal/Modal';
import './App.css';
import store from "./store/store";

function App() {
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Provider store={store}>
            <div className="App">
                <Header onOpenModal={handleOpenModal} />
                <MovieGallery />
                <Modal show={showModal} onClose={handleCloseModal}>
                    <UploadMovieForm />
                </Modal>
                <VideoNotifications />
            </div>
        </Provider>
    );
}

export default App;
