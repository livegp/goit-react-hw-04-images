import ky from 'ky';
import { toast } from 'react-toastify';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35608601-7cda014b012f6d1bf4756c5e4';
const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12
};

async function onSearch(search, page) {
  const options = {
    searchParams: {
      ...DEFAULT_PARAMS,
      q: search,
      page
    }
  };

  try {
    const gallery = await ky.get(BASE_URL, options).json();
    console.log(gallery);
    return gallery;
  } catch (error) {
    toast.error(`Error fetching data: ${error.message}`);
    throw new Error(`API request failed: ${error.message}`);
  }
}

export default onSearch;
