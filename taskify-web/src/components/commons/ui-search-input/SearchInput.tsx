import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { debounce } from 'lodash';
import { Input } from '../ui-input/Input';

type SearchInputProps = {
  onSearch: (value: string) => void;
};

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [searchValue, setSearchValue] = useState<string>('');

  const debounceSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 1000),
    [],
  );

  const onSearchHandler = (value: string) => {
    setSearchValue(value);
    debounceSearch(value);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchHandler(e.target.value);
  };

  const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debounceSearch.cancel();
      onSearch(e.currentTarget.value);
    }
  };

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  }, [debounceSearch]);

  return (
    <Input
      value={searchValue}
      onChange={onChangeHandler}
      onKeyDown={onKeydownHandler}
    />
  );
}
