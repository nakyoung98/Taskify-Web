import classNames from 'classnames/bind';
import { MouseEvent } from 'react';
import Image from 'next/image';
import styles from './Card.module.scss';
import UserBadge from '../ui-user-badge/UserBadge';
import Calendar from './calendar.svg';
import ChipSubject from '../ui-chip-subject/chipSubject';

const cx = classNames.bind(styles);

type CardProps = {
  imageUrl?: string;
  title: string;
  /**TODO: tag에 대한 type을 추후 추가로 신설해야할 듯  */
  tags?: string[];
  /**TODO: expiredDate type 명확히  */
  expiredDate?: string;
  user?: string;
  clickable?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export default function Card({
  imageUrl,
  title,
  tags,
  expiredDate,
  user,
  clickable = true,
  onClick = () => {},
}: CardProps) {
  return (
    <button
      className={cx('button_unstyled')}
      type="button"
      onClick={onClick}
      disabled={clickable}
    >
      <article className={cx('card-container', clickable ? 'clickable' : null)}>
        {imageUrl && (
          <div className={cx('card-container__thumbnail')}>
            <Image
              src={imageUrl}
              alt={`${title} 카드`}
              objectFit="cover"
              fill
            />
          </div>
        )}
        <header className={cx('card-container__header')}>
          <h1 className={cx('card-container__title')}>{title}</h1>
        </header>
        <section className={cx('card-container__section')}>
          <div className={cx('card-container__tags')}>
            {/** TODO: color 적용 */}
            {tags?.map((tag) => {
              return <ChipSubject label={tag} key={tag} />;
            })}
          </div>
        </section>
        <footer className={cx('card-container__footer')}>
          <div className={cx('card-container__expired-date')}>
            <Calendar className={cx('card-container__expired-date_icon')} />
            {expiredDate && (
              <span className={cx('card-container__expired-date_text')}>
                {expiredDate}
              </span>
            )}
          </div>
          {/** TODO: user가 있으면 UserBadge에 userData에 맞게 데이터를 불러와야함 */}
          {/** TODO: 반응형 userBadge 적용 */}
          {user && <UserBadge text={user} color="orange" />}
        </footer>
      </article>
    </button>
  );
}
