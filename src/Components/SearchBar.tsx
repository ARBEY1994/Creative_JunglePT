import React, { useEffect, useState } from 'react';
import Icon from './Icon';
import { useToast } from './Hooks/UseToast';

interface TApi {
  id: number;
  title: string;
  body: string;
}

interface SearchBarProps {
  apiData: TApi[];
  onSearchResults: (results: TApi[]) => void;
  clearInput: any;
}

export default function SearchBar({
  apiData,
  onSearchResults,
  clearInput,
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const { showSuccess, showError } = useToast();

  const handleSearch = async () => {
    const searchTerm = parseInt(searchValue);
    const results = apiData.filter((item) => item.id === searchTerm);

    if (results.length === 0) {
      showError('ID not fount');
    } else {
      showSuccess('Search successful!');
    }

    onSearchResults(results);
  };

  useEffect(() => {
    if (clearInput) {
      setSearchValue('');
    }
  }, [clearInput]);
  return (
    <>
      <div className="flex justify-center relative">
        <input
          type="text"
          className="h-[46px] border border-[#4FC0D0] w-[80%] lg:w-[30%] pl-4 text-md text-[#C5C5C5] rounded-3xl focus:outline-none focus:border-[#4FC0D0] focus:ring-blue-500"
          placeholder="Buscar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="absolute mt-2 ml-[60%] lg:ml-[25%]">
          <Icon
            iconName="search"
            className="text-[#4FC0D0]   text-3xl cursor-pointer "
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
