export interface ProductInterface {
  title: string
  img: {
    contentType: string,
    data: any,
  }
  averageRating: number
  description: string
  minCost: number
  maxCost: number
  category: string
  company: string
  createdAt: number
}

export interface ProductCardInterface {
  title: string
  imgUrl: string
  averageRating: number
  id: string
}
