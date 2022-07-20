export interface CommentInterface {
  title: string,
  body: string,
  firstName: string,
  lastName: string,
  rating: number,
  createdAt: number,
  user: string,
  userInfo: {
    firstName?: string,
    lastName?: string,
    img?: {
      contentType: string,
      data: any,
    },
  }[]
}
