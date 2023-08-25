import Card from '@/Components/Card';
import Footer from '@/Components/Footer';
import Icon from '@/Components/Icon';
import SearchBar from '@/Components/SearchBar';
import axios from 'axios';
import { useEffect, useState, ReactNode } from 'react';
import { useToast } from '@/Components/Hooks/UseToast';

interface TApi {
  id: number;
  title: string;
  body: string;
}

type Props = {
  children: ReactNode;
};

export default function Home({ children }: Props) {
  const [InfoApi, setInfoApi] = useState<TApi[]>([]);
  const [searchResults, setSearchResults] = useState<TApi[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deleteInProgress, setDeleteInProgress] = useState<boolean>(false);
  const { showSuccess } = useToast();
  const [clearInput, setClearInput] = useState(false);

  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = searchResults.length > 0 ? searchResults : InfoApi;

  const currentDisplayedCards = currentCards.slice(
    indexOfFirstCard,
    indexOfLastCard,
  );
  //clear inputs

  const handleClearFields = async () => {
    setClearInput(true);
  };
  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
        );
        setInfoApi(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchApi();
  }, []);

  const handleCardDelete = async (index: number) => {
    if (deleteInProgress) return;
    setDeleteInProgress(true);
    setTimeout(() => {
      const newApi = InfoApi.filter((_, i) => i !== index);
      const newSearchResults = searchResults.filter((_, i) => i !== index);

      setInfoApi(newApi);
      setSearchResults(newSearchResults);
      setDeleteInProgress(false);
      handleClearFields();
    }, 1000);

    showSuccess('Removed successfully!');
  };

  const handleSearchResults = (results: TApi[]) => {
    setSearchResults(results);
    setCurrentPage(1);
  };

  return (
    <main>
      <h1 className="font-extrabold fontPoppins text-[#164B60] flex text-3xl items-center justify-center mt-[3em]">
        Creative <p className="p-2 ml-2 bg-[#A2FF86] rounded-[17px]">jungle</p>
      </h1>
      <div className="mt-6">
        <SearchBar
          apiData={InfoApi}
          onSearchResults={handleSearchResults}
          clearInput={clearInput}
        />
      </div>
      <div className="mt-6 mx-[5%] grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentDisplayedCards.map((e, index) => (
          <div key={index} className="mt-6">
            <Card
              key={e.id}
              Title={e.title}
              Text={e.body}
              onDelete={() => handleCardDelete(indexOfFirstCard + index)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center  mt-16 text-[#1B6B93] font-bold">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-4 flex items-center"
        >
          <Icon iconName="chevron_left " className="text-[#1B6B93] pr-2" />
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastCard >= currentCards.length}
          className=" flex items-center"
        >
          Next Page{' '}
          <Icon iconName="chevron_right" className="text-[#1B6B93] pr-2" />
        </button>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </main>
  );
}
