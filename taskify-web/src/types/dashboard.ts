/** dashboard 정보 인터페이스 */
export interface DashboardData {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

/** getDashboards의 응답 데이터 인터페이스 */
export interface DashboardsData {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardData[];
}

export interface ChangeDashBoardForm {
  title: string;
  color: string;
}
