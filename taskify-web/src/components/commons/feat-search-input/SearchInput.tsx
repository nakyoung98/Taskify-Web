import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { debounce } from 'lodash';
import classNames from 'classnames/bind';
import { Input } from '../ui-input/Input';
import SearchIcon from './search.svg';
import styles from './SearchInput.module.scss';

const cx = classNames.bind(styles);

/**
 * SearchInput 컴포넌트의 속성
 * @typedef {Object} SearchInputProps
 * @property {(value: string) => void} onSearch - 사용자가 검색을 트리거할 때 호출될 콜백 함수 검색 값이 이 함수의 인자로 전달됨
 */
type SearchInputProps = {
  onSearch: (value: string) => void;
};

/**
 * 검색 기능을 수행하는 입력 필드를 렌더링
 * 디바운스 메커니즘을 사용, 사용자가 타이핑을 멈춘 후 지정된 시간(500ms) 동안 추가 입력이 없을 때 검색 트리거 'Enter' 키를 누를 때 즉시 검색을 수행
 */
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
    <div className={cx('search-input')}>
      <SearchIcon className={cx('search-input_icon')} />
      <Input
        value={searchValue}
        onChange={onChangeHandler}
        onKeyDown={onKeydownHandler}
        placeholder="검색"
      />
    </div>
  );
}
