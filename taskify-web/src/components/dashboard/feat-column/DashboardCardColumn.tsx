import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import AddButton from '@/components/commons/ui-add-button/AddButton';
import CardColumn from '@/components/commons/ui-card-column/CardColumn';
import ColumnHeader from '@/components/commons/ui-card-column/ColumnHeader';
import Card from '@/components/commons/ui-card/Card';
import useInfiniteScroll from '@/lib/hooks/useInfiniteScroll';
import styles from './DashboardCardColumn.module.scss';
import { CardListResponse, CardResponse } from '@/types/card';
import { ColumnResponse } from '@/types/column';
import { useColumn } from '@/contexts/ColumnProvider';
import CreateCardModal from '@/components/commons/feat-create-card-modal/CreateCardModal';
import ColumnModal from '@/components/commons/ui-column-modal/ColumnModal';

const cx = classNames.bind(styles);

type DashboardCardColumnProps = {
  column: ColumnResponse;
};

export default function DashboardCardColumn({
  column,
}: DashboardCardColumnProps) {
  const [isCardCreateModalVisible, setCardCreateModalVisible] =
    useState<boolean>(false);
  const [isColumnEditModalVisible, setColumnEditModalVisible] =
    useState<boolean>(false);

  const [cards, setCards] = useState<CardResponse[]>([]);
  const { getCardDataFromColumn } = useColumn();
  const infiniteScrollObserveTarget = useRef<HTMLDivElement | null>(null);
  const { loading, data } = useInfiniteScroll<CardListResponse>({
    root: null,
    target: infiniteScrollObserveTarget,
    threshold: 0.1,
    onIntersect: (cursorId, pageSize) => {
      return getCardDataFromColumn(column.id, pageSize, cursorId);
    },
    hookEnabled: true,
  });

  useEffect(() => {
    if (loading) return;
    const newCards = data?.cards ?? [];
    setCards((prevCards) => [...prevCards, ...newCards]);
  }, [loading, data]);

  return (
    <div>
      <CardColumn>
        <ColumnHeader
          columnName={column.title}
          columnItemCount={data?.totalCount || 0}
          columnSettingOnClick={() => {
            setColumnEditModalVisible(true);
          }}
        />
        <AddButton
          onClick={() => {
            setCardCreateModalVisible(true);
          }}
          addCase="addToDo"
        />
        {cards.map((card) => (
          <Card
            key={card.id}
            user={card.assignee}
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
        <div ref={infiniteScrollObserveTarget} />
      </CardColumn>
      <div className={cx('dashboard-form__divider')} />

      <CreateCardModal
        columnIdNumber={column.id}
        isOpen={isCardCreateModalVisible}
        setIsOpen={(isOpen) => {
          setCardCreateModalVisible(isOpen);
        }}
      />
      <ColumnModal
        isOpen={isColumnEditModalVisible}
        onChangeModalOpenStatus={(isOpen) => {
          setColumnEditModalVisible(isOpen);
        }}
        onColumnChange={() => {}}
        onColumnDelete={() => {}}
      />
    </div>
  );
}
