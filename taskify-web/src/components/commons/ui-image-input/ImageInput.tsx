import Image from 'next/image';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  SyntheticEvent,
  useEffect,
} from 'react';
import classNames from 'classnames/bind';
import styles from './ImageInput.module.scss';
import PlusIcon from '../ui-plus-chip/plus.svg';

const cx = classNames.bind(styles);

type ImageInputProps = {
  inputRef: MutableRefObject<HTMLInputElement | null> | undefined;
  imageData: {
    data: File | undefined;
    preview: string;
  };
  setImageData: Dispatch<
    SetStateAction<{
      data: File | undefined;
      preview: string;
    }>
  >;
  location?: 'mypage' | 'modal';
};

/** 파일 인풋입니다.
 * @props inputRef : 반드시 ref 지정해야함
 * @props imageData : {data, preview} 형식의 state(ImageInputProps의 타입을 그대로 사용하면 됩니다.)
 * @props setImageData : setState(ImageInputProps의 타입을 그대로 사용하면 됩니다.)
 * @props location : 디폴드값 mypage이며, modal은 모달용으로 사이즈가 작습니다.
 * @alert data 전송방식은 반드시 multipart/form-data를 사용
 */
export default function ImageInput({
  inputRef,
  imageData,
  setImageData,
  location = 'mypage',
}: ImageInputProps) {
  const handleChange = (
    e: SyntheticEvent & {
      target: HTMLInputElement & { files: FileList | null };
    },
  ) => {
    setImageData((prevValue) => ({ ...prevValue, data: e.target.files?.[0] }));
  };

  useEffect(() => {
    if (!imageData.data) return undefined;
    const nextPreview = URL.createObjectURL(imageData.data);
    setImageData((prevValue) => ({ ...prevValue, preview: nextPreview }));
    return () => {
      URL.revokeObjectURL(nextPreview);
    };
  }, [imageData.data]);

  return (
    <label className={cx('container', location)}>
      <div className={cx('container', location)}>
        {imageData.preview ? (
          <Image
            className={cx('image')}
            src={imageData.preview}
            alt="미리보기"
            fill
          />
        ) : (
          <PlusIcon className={cx('icon')} />
        )}
      </div>
      <input
        ref={inputRef}
        onChange={handleChange}
        type="file"
        name="file"
        className={cx('input')}
        accept="image/*"
      />
    </label>
  );
}
