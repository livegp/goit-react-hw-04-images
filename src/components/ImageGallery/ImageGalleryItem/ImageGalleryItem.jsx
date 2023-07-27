import PropTypes from 'prop-types';

import Gallery from './ImageGalleryItem.styled';

function ImageGalleryItem({ id, src, alt, onClick }) {
  return (
    <Gallery>
      <img
        src={src}
        alt={alt}
        onClick={() => onClick(id)}
        role="presentation"
      />
    </Gallery>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ImageGalleryItem;
