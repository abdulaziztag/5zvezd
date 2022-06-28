import {TabInterface} from "../interfaces/tab.interface";

export const tabs = (): TabInterface[]  => {
  const brand = 'brand'
  const category = 'category'

  return [
    {
      title: 'Brands',
      list: [
        {
          listItemTitle: 'Pepsi-Co',
          url: `/${brand}/pepsi-co`
        },
        {
          listItemTitle: 'Lactel',
          url: `/${brand}/lactel`
        }
      ]
    },
    {
      title: 'Categories',
      list: [
        {
          listItemTitle: 'Medicine',
          url: `/${category}/medicine`
        },
        {
          listItemTitle: 'Drinks',
          url: `/${category}/drinks`
        }
      ]
    }
  ]
}
