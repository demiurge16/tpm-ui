export interface Note {
  id: string,
  content: string,
  author: Author,
  createdAt: Date,
  projectId: string
}

export interface Author {
  teamMemberId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}
