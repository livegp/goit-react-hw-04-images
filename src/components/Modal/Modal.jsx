import PropTypes from 'prop-types';
import { Component } from 'react';

import { Container, Overlay } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleOutsideClick = event => {
    const { onClose } = this.props;
    if (this.modalRef && !this.modalRef.contains(event.target)) {
      onClose();
    }
  };

  handleKeyPress = event => {
    const { onClose } = this.props;
    if (event.key === 'Escape') {
      onClose();
    }
  };

  setModalRef = element => {
    this.modalRef = element;
  };

  render() {
    const { src, alt } = this.props;
    return (
      <Overlay>
        <Container ref={this.setModalRef}>
          <img src={src} alt={alt} />
        </Container>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
