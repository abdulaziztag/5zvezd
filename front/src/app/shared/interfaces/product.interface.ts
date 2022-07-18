export interface ProductInterface {
  title: string
  imgUrl: string
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
