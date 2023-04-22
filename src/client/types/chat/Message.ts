export interface CreateMessage {
  message: string;
}

export interface Message {
  id: string,
  message: string,
  timestamp: Date,
  author: Author,
}

export interface Author {
  teamMemberId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}
