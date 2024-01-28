import React, { ReactNode, MouseEventHandler } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationButton.module.scss';

// Binding styles with classNames utility
const cx = classNames.bind(styles);

// Declare button prop type for pagination button
type PaginationButtonProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  flipped?: boolean; // 좌우반전
  disabled?: boolean; // 활성/비활성
};

// PaginationButton component
function PaginationButton({
  children,
  onClick,
  flipped,
  disabled,
}: PaginationButtonProps) {
  const paginationContainerClass = cx('pagination-container', {
    disabled: disabled,
  });
  const paginationbuttonClass = cx('pagination-button', {
    flipped: flipped,
  });
  const flippedButtonClass = cx('pagination-button', {
    flipped: !flipped,
  });

  return (
    <div className={paginationContainerClass}>
      <button
        type="button"
        className={paginationbuttonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <button
        type="button"
        className={flippedButtonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}

// Default prop values
PaginationButton.defaultProps = {
  flipped: false,
  disabled: false,
};

export default PaginationButton;
