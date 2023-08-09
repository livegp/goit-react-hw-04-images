import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './App.styled';
import onSearch from '../../services/api';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

function App() {
  const [search, setSearch] = useState('');
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (search !== '' || page !== 1) {
      fetchData(search, page);
    }
  }, [search, page]); // eslint-disable-line

  const handleSearchSubmit = input => {
    if (search !== input) {
      setSearch(input);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const selectItem = item => {
    setSelected(item);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const fetchData = (searchIn, pageNumber) => {
    setLoading(true);

    onSearch(searchIn, pageNumber)
      .then(newData => {
        setTotal(newData.totalHits);
        const newHits =
          pageNumber === 1 ? newData.hits : [...hits, ...newData.hits];
        setHits(newHits);
        setLoading(false);
      })
      .catch(error => {
        toast.error(`Error fetching data: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery data={hits} onClick={selectItem} />
      {loading && <Loader />}
      {modal && selected && (
        <Modal
          onClose={closeModal}
          src={selected.largeImageURL}
          alt={selected.tags}
        />
      )}
      {!loading && hits.length < total && <Button onClick={handleLoadMore} />}
      <ToastContainer hideProgressBar />
    </Container>
  );
}

export default App;
