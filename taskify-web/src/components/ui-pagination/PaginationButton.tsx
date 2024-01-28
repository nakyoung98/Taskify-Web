import React, { MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';
import ArrowIcon from './arrow.svg';

const cx = classNames.bind(styles);

type PaginationButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  flipped?: boolean;
  disabled?: boolean;
};

function PaginationButton({
  onClick,
  flipped,
  disabled,
}: PaginationButtonProps) {
  const paginationClass = cx('pagination-button', {
    flipped: flipped,
    disabled: disabled,
  });

  return (
    <div>
      <button
        type="button"
        className={paginationClass}
        onClick={onClick}
        disabled={disabled}
      >
        pagination
      </button>
    </div>
  );
}

PaginationButton.defaultProps = {
  flipped: false,
  disabled: false,
};

export default PaginationButton;
