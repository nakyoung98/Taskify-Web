import { CardResponse } from '@/types/card';
import { ColumnResponse } from '@/types/column';

export type CardsWithColumn = {
  column: ColumnResponse;
  cards: CardResponse[];
};
