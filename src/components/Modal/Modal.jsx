import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import { Container, Overlay } from './Modal.styled';

function Modal({ src, alt, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyPress = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <Overlay>
      <Container ref={modalRef}>
        <img src={src} alt={alt} />
      </Container>
    </Overlay>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
