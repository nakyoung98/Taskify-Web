import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';
import PaginationButton from './PaginationButton';

const cx = classNames.bind(styles);

function PaginationButtonContainer() {
  const paginationContainerClass = cx('pagination-container');

  return (
    <div className={paginationContainerClass}>
      <PaginationButton
        onClick={() => {
          console.log('왼쪽');
        }}
        disabled
      />
      <PaginationButton
        onClick={() => {
          console.log('오른쪽');
        }}
        flipped
      />
    </div>
  );
}

export default PaginationButtonContainer;
