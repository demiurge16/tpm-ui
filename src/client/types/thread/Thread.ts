export interface Thread {
  id: string,
  title: string,
  content: string,
  author: Author,
  createdAt: Date,
  project: ProjectShortView,
  replies: Reply[],
  status: ThreadStatus,
  likes: Like[],
  dislikes: Dislike[]
}

export interface Reply {
  id: string,
  content: string,
  author: Author,
  createdAt: Date,
  parentReplyId: string | null,
}

export interface ThreadStatus {
  status: ThreadStatusCode,
  name: string,
  description: string,
}

export type ThreadStatusCode = "DRAFT" | "ACTIVE" | "FREEZE" | "CLOSED" | "ARCHIVED" | "DELETED";

export interface Author {
  teamMemberId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}

export interface ProjectShortView {
  id: string;
  title: string;
  status: ProjectStatus;
}

export type StatusCode = "DRAFT" | "READY_TO_START" | "ACTIVE" | "ON_HOLD" | "READY_TO_DELIVER" | "DELIVERED" | "CANCELLED" | "INVOICED" | "PAID";

export interface ProjectStatus {
  status: StatusCode;
  name: string;
  description: string;
}

export interface Like {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface Dislike {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ThreadLike {
  id: string;
  likesCount: number;
}

export interface ThreadNewStatus {
  id: string;
  status: ThreadStatusCode;
}
