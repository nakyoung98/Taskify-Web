import { UserData } from '../ui-user-state-dropdown/types';

export interface MemberList {
  members: Array<UserData>;
  totalCount: number;
}

export interface CardCreate {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: File | undefined;
}
