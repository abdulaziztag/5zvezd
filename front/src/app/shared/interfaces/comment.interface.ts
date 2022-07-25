export interface CommentInterface {
  title: string,
  body: string,
  rating: number,
  createdAt: number,
  user: string,
  userInfo: {
    firstName: string,
    lastName: string,
    img?: string,
  }[]
}
