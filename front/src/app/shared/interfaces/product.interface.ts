export interface ProductInterface {
  title: string
  img: string,
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
  img: string,
  averageRating: number
  _id: string
}

export interface FilteredProductsInterface {
  title: string,
  averageRating: number,
  img: string,
  company: string,
  category: string,
  minCost: number,
  maxCost: number,
  createdAt: number,
  _id: string
}
