export interface ColumnBase {
  title: string;
}
export interface ColumnDetails extends ColumnBase {
  dashboardId: number;
}

export interface ColumnCreateRequest extends ColumnDetails {}
export interface ColumnEditRequest extends ColumnBase {}

export interface ColumnResponse extends ColumnDetails {
  id: number;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}
