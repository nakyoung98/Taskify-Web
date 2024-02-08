export interface CardBase {
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CardDetails extends CardBase {
  columnId: number;
}

export interface CardRequest extends CardDetails {
  assigneeUserId: number;
}

export interface CardCreateRequest extends CardRequest {
  dashboardId: number;
}

export interface CardEditRequest extends CardRequest {}

export interface CardResponse extends CardDetails {
  id: number;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  teamId: string;
  createdAt: string;
  updatedAt: string;
}
