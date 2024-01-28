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
  const containerClass = cx('pagination-container', {
    disabled: disabled,
  });
  const buttonClass = cx('pagination-button', {
    flipped: flipped,
  });
  const secondButtonClass = cx('pagination-button', {
    flipped: !flipped,
  });

  return (
    <div className={containerClass}>
      <button
        type="button"
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <button
        type="button"
        className={secondButtonClass}
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
