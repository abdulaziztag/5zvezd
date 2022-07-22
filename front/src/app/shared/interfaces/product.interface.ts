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
  img: {
    data: any,
    contentType: string,
  }
  averageRating: number
  _id: string
}
