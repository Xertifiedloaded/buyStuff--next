import icon from '../assets/pizza.jpg'
import { toggleSidebar } from './ReduxComponent/ReduxStore';

interface ProductProps {
  productId?: number;
  productImage: string;
  productName: string;
  productDetails?: string;
  productPrice: number;
  category: string
}


export const categories: string[] = [
  'Panties',
  'Brallets',
  'Shorts',
  'Bra',
  'Night Wears',
  'Boxers'
];

export const PRODUCTS: ProductProps[] = [
  {
    productId: 1,
    productImage: icon,
    productName: 'Plain Chicken Regular',
    productDetails: 'No Sausage, Single Portion of Chicken',
    productPrice: 2000,
    category: 'Boxers'
  },
  {
    productId: 2,
    productImage: icon,
    productName: 'Double Chicken Regular',
    productDetails: '2Sausages, Single Portion of Chicken',
    productPrice: 2600,
    category: 'Brallets'
  },
  {
    productId: 3,
    productImage: icon,
    productName: 'Single Chicken Special',
    productDetails: '1Sausage, Double Portions of Chicken',
    productPrice: 3100,
    category: 'Night Wears'
  },
  {
    productId: 4,
    productImage: icon,
    productName: 'Single Chicken Regular',
    productDetails: '1 Sausage, single Portions of Chicken',
    productPrice: 2300,
    category: 'Shorts'
  },
  {
    productId: 5,
    productImage: icon,
    productName: 'Plain Chicken Special',
    productDetails: 'No Sausage, double Portions of Chicken',
    productPrice: 2800,
    category: 'Shorts'
  },
  {
    productId: 6,
    productImage: icon,
    productName: 'Double Chicken Special',
    productDetails: '2 Sausage, Double Portions of Chicken',
    productPrice: 3400,
    category: 'Boxers'
  },
  {
    productId: 7,
    productImage: icon,
    productName: 'Extra Ketchup',
    productPrice: 200,
    category: 'Boxers'
  },
  {
    productId: 8,
    productImage: icon,
    productName: 'Extra French Fries',
    productPrice: 1500,
    productDetails: '1 Portion of Chips and Ketchup',
    category: 'Bra'
  },
  {
    productId: 9,
    productImage: icon,
    productName: '2 Pieces of Chicken Drumsticks',
    productPrice: 2400,
    category: 'Bra'
  },
  {
    productId: 10,
    productImage: icon,
    productName: 'Chicken & French Fries',
    productPrice: 3700,
    productDetails: 'Crispy Chicken, French Fries and Ketchup',
    category: 'Bra'
  },
  {
    productId: 11,
    productImage: icon,
    productName: 'Box of Chicken Drumsticks',
    productPrice: 6000,
    productDetails: '5 Pieces of Crispy Fried Chicken',
    category: 'Panties'
  },
  {
    productId: 12,
    productImage: icon,
    productName: 'Plantain Cubes',
    productPrice: 500,
    category: 'Panties'
  },
  {
    productId: 13,
    productImage: icon,
    productName: '1portion of Jollof Rice and Chicken',
    productPrice: 2400,
    category: 'food'
  },
  {
    productId: 14,
    productImage: icon,
    productName: 'Poundo Yam',
    productPrice: 3000,
    productDetails: 'Poundo Yam and Egusi Soup with Beef',
    category: 'Panties',
  },
  {
    productId: 15,
    productImage: icon,
    productName: '2Portions of Jollof Rice and Chicken',
    productPrice: 3400,
    category: 'Night Wears',
  },
  {
    productId: 16,
    productImage: icon,
    productName: 'Jollof Rice, Fried Rice and Chicken',
    productPrice: 3600,
    category: 'Night Wears',
  },

];