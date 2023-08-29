export interface File {
  id: string,
  name: string,
  uploadTime: Date,
  uploader: Uploader,
  projectId: string
}

export interface Uploader {
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
}
