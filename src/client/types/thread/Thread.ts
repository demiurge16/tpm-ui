export interface Thread {
  id: string,
  title: string,
  content: string,
  author: Author,
  createdAt: Date,
  project: ProjectShortView,
  status: ThreadStatus,
  likes: Like[],
  dislikes: Dislike[],
  tags: Tag[]
}

export interface UpdateThread {
  title: string,
  content: string,
  tags: string[]
}

export interface Reply {
  id: string,
  content: string,
  author: Author,
  createdAt: Date,
  deleted: boolean,
  parentReplyId: string | null,
  threadId: string,
  likes: Like[],
  dislikes: Dislike[]
}

export interface CreateReply {
  content: string,
  parentReplyId: string | null
}

export interface UpdateReply {
  content: string
}

export interface ReplyLike {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ReplyLikeRemoved {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ReplyDislike {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ReplyDislikeRemoved {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ThreadStatus {
  status: ThreadStatusCode,
  name: string,
  description: string,
}

export type ThreadStatusCode = "DRAFT" | "ACTIVE" | "FREEZE" | "CLOSED" | "ARCHIVED" | "DELETED";

export interface Author {
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

export interface Tag {
  id: string;
  name: string;
}

export interface ThreadNewStatus {
  id: string;
  status: ThreadStatus;
}

export interface ThreadLike {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ThreadLikeRemoved {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ThreadDislike {
  id: string;
  author: Author;
  createdAt: Date;
}

export interface ThreadDislikeRemoved {
  id: string;
  author: Author;
  createdAt: Date;
}
