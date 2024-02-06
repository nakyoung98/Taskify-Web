import { KeyboardEvent, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TagInput.module.scss';
import ChipSubject from '../ui-chip-subject/chipSubject';

const cx = classNames.bind(styles);

type TagInputProps = {
  tagDataValue: string[];
  setTagDataValue: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TagInput({
  tagDataValue,
  setTagDataValue,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isButtonList, setIsButtonList] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      setTagDataValue((prevArray) => [...prevArray, inputValue]);
      setInputValue('');
      setIsButtonList(true);
    }
  };

  const handleDelete = (chipToDelete: string) => {
    setTagDataValue((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleButtonContainer = () => {
    setIsButtonList(false);
  };

  useEffect(() => {
    if (tagDataValue.length === 0) {
      setIsButtonList(false);
    }
  }, [tagDataValue]);

  return (
    <div className={cx('container')}>
      <button
        type="button"
        onClick={handleButtonContainer}
        className={cx('fix-button')}
      >
        수정
      </button>
      {isButtonList && (
        <div className={cx('button-list')}>
          {tagDataValue.map((data, index) => (
            <ChipSubject
              key={`${Date.now()}-${Math.random()}`}
              label={data}
              onDelete={() => handleDelete(data)}
              index={index}
            />
          ))}
        </div>
      )}
      {!isButtonList && (
        <input
          className={cx('input')}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="입력 후 Enter"
        />
      )}
    </div>
  );
}
