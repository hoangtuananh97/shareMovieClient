import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    const onCloseMock = jest.fn();

    it('renders nothing when show is false', () => {
        render(
            <Modal show={false} onClose={onCloseMock}>
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });

    it('renders content when show is true', () => {
        render(
            <Modal show={true} onClose={onCloseMock}>
                <div>Modal content</div>
            </Modal>
        );

        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('calls onClose when clicking the close button', () => {
        render(
            <Modal show={true} onClose={onCloseMock}>
                <div>Modal content</div>
            </Modal>
        );

        fireEvent.click(screen.getByRole('button'));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking the overlay', () => {
        render(
            <Modal show={true} onClose={onCloseMock}>
                <div>Modal content</div>
            </Modal>
        );

        // eslint-disable-next-line testing-library/no-node-access
        const overlay = screen.getByText('Modal content').parentElement?.parentElement;
        if (overlay) {
            fireEvent.click(overlay);
            // eslint-disable-next-line jest/no-conditional-expect
            expect(onCloseMock).toHaveBeenCalledTimes(1);
        } else {
            throw new Error('Overlay element not found');
        }
    });

    it('does not call onClose when clicking the modal content', () => {
        render(
            <Modal show={true} onClose={onCloseMock}>
                <div>Modal content</div>
            </Modal>
        );

        fireEvent.click(screen.getByText('Modal content'));
        expect(onCloseMock).not.toHaveBeenCalled();
    });
});
