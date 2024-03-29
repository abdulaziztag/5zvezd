import {TabInterface} from "../interfaces/tab.interface";

export const tabs = (): TabInterface[]  => {
  const brand = 'brand';
  const category = 'category';

  return [
    {
      title: 'Brands',
      queryKey: brand,
      list: [
        {
          listItemTitle: 'Pepsi-Co',
          params: `pepsi-co`
        },
        {
          listItemTitle: 'Lactel',
          params: `lactel`
        },
        {
          listItemTitle: 'The Cola-Cola',
          params: 'coca-cola'
        },
        {
          listItemTitle: 'Danone',
          params: 'danone'
        }
      ],
    },
    {
      title: 'Categories',
      queryKey: category,
      list: [
        {
          listItemTitle: 'Medicine',
          params: `medicine`
        },
        {
          listItemTitle: 'Drink',
          params: `drink`
        }
      ]
    }
  ]
}
