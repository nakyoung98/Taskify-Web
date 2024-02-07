import classNames from 'classnames/bind';
import CardColumn from '@/components/commons/ui-card-column/CardColumn';
import { CardsWithColumn } from './types';
import ColumnHeader from '@/components/commons/ui-card-column/ColumnHeader';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import Card from '@/components/commons/ui-card/Card';
import styles from './DashboardForm.module.scss';

const cx = classNames.bind(styles);

type DashboardFormProps = {
  cardsWithColumns: CardsWithColumn[];
};

export default function DashboardForm({
  cardsWithColumns = [],
}: DashboardFormProps) {
  return (
    <section className={cx('dashboard-form')}>
      {cardsWithColumns.map(({ column, cards }) => {
        return (
          <>
            <CardColumn key={column.id}>
              <ColumnHeader
                columnName={column.title}
                columnItemCount={cards.length}
                columnSettingOnClick={() => {
                  /** TODO: onClick 모달 띄우기 */
                }}
              />
              <AddButton
                onClick={() => {
                  /** TODO: 카드 추가 onClick */
                }}
                addCase="addToDo"
              />
              {cards.map((card) => (
                <Card
                  key={card.id}
                  user={card.assignee.nickname}
                  title={card.title}
                  tags={card.tags}
                  imageUrl={card.imageUrl}
                  expiredDate={card.dueDate}
                  onClick={() => {
                    /** TODO: 카드 onClick */
                  }}
                  clickable
                />
              ))}
            </CardColumn>
            <div className={cx('dashboard-form__divider')} />
          </>
        );
      })}
      <div className={cx('dashboard-form__add-column')}>
        <AddButton
          onClick={() => {
            /** TODO: 칼럼 추가 onClick  */
          }}
          addCase="addColumn"
        />
      </div>
    </section>
  );
}
