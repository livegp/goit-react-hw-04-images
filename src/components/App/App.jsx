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
    fetchData(search, page);
  }, [search, page]);

  const handleSearchSubmit = newSearch => {
    if (newSearch !== search) {
      setSearch(newSearch);
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

  const fetchData = (search, page) => {
    setLoading(true);

    onSearch(search, page)
      .then(newData => {
        setHits(prevHits =>
          page === 1 ? newData.hits : [...prevHits, ...newData.hits]
        );
        setTotal(newData.totalHits);
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
