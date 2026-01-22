import { createPortal } from 'react-dom';
import { useState } from 'react';
import type { Launch } from '../../types';
import './Modal.css';

type ModalProps = {
  isOpen: boolean;
  launch: Launch | null;
  onClose: () => void;
};

export function Modal({ isOpen, launch, onClose }: ModalProps) {
  const [imageError, setImageError] = useState(false);

  if (!isOpen || !launch) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    return null;
  }

  const imageSrc = launch.links?.mission_patch;
  const showFallback = !imageSrc || imageError;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">{launch.mission_name}</h2>

        {showFallback ? (
          <div className="modal-image-error">Изображение недоступно</div>
        ) : (
          <img
            src={imageSrc}
            alt={launch.mission_name}
            className="modal-image"
            onError={() => setImageError(true)}
          />
        )}

        <p className="modal-filed">
          <strong>
            Mission name:
            <br />
          </strong>
          {launch.mission_name}
        </p>

        <p className="modal-field">
          <strong>
            Rocket name: <br />
          </strong>
          {launch.rocket?.rocket_name}
        </p>

        <p className="modal-field">
          <strong>
            Details: <br />
          </strong>
          {launch.details || 'No details provided'}
        </p>
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
