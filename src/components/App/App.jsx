import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './App.styled';
import onSearch from '../../services/api';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Searchbar from '../Searchbar/Searchbar';

class App extends Component {
  state = {
    search: '',
    hits: [],
    loading: false,
    modal: false,
    selected: null,
    page: 1,
    total: 0
  };

  componentDidUpdate(_, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchData(search, page);
    }
  }

  handleSearchSubmit = search => {
    const { search: currentSearch } = this.state;
    if (currentSearch !== search) {
      this.setState({ search, page: 1 });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  selectItem = selected => {
    this.setState({ selected, modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  fetchData = (search, page) => {
    this.setState({ loading: true });

    onSearch(search, page)
      .then(newData => {
        this.setState(prevState => ({
          hits:
            page === 1 ? newData.hits : [...prevState.hits, ...newData.hits],
          total: newData.totalHits,
          loading: false
        }));
      })
      .catch(error => {
        toast.error(`Error fetching data: ${error.message}`);
        this.setState({ loading: false });
      });
  };

  render() {
    const { hits, loading, modal, selected, total } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery data={hits} onClick={this.selectItem} />{' '}
        {/* Renamed "data" to "hits" */}
        {loading && <Loader />}
        {modal && selected && (
          <Modal
            onClose={this.closeModal}
            src={selected.largeImageURL}
            alt={selected.tags}
          />
        )}
        {!loading && hits.length < total && (
          <Button onClick={this.handleLoadMore} />
        )}
        <ToastContainer hideProgressBar />
      </Container>
    );
  }
}

export default App;
