import PropTypes from 'prop-types';

import Container from './ImageGallery.styled';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ data, onClick }) {
  const selectItem = id => {
    const selectedImage = data.find(image => image.id === id);
    if (selectedImage) {
      onClick(selectedImage);
    }
  };

  return (
    data && (
      <Container>
        {data.map(image => (
          <ImageGalleryItem
            key={image.id}
            id={image.id}
            src={image.webformatURL}
            alt={image.tags}
            onClick={selectItem}
          />
        ))}
      </Container>
    )
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default ImageGallery;
