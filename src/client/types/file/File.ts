export interface File {
  id: string,
  name: string,
  uploadTime: Date,
  uploader: Uploader,
  projectId: string
}

export interface Uploader {
  teamMemberId: string,
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}
