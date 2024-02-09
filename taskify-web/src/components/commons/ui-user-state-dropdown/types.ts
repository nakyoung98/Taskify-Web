export type UserData = {
  userId: number;
  email: string | undefined;
  nickname: string;
  profileImageUrl: string | null;
};

export type ColumnData = {
  id: number;
  title: string | undefined;
  teamId: string;
  dashboardId: number;
};
