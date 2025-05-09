import { TOrder, TOrdersData } from '@utils-types';
import { To } from 'react-router-dom';

export const mockFeedOrders: TOrdersData = {
  orders: [
    {
      _id: '681d3e40c2f30c001cb227db',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2025-05-08T23:29:04.173Z',
      updatedAt: '2025-05-08T23:29:05.448Z',
      number: 76633
    },
    {
      _id: '681d279ec2f30c001cb227c9',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2025-05-08T21:52:30.312Z',
      updatedAt: '2025-05-08T21:52:30.997Z',
      number: 76632
    },
    {
      _id: '681d226fc2f30c001cb227c5',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный фалленианский люминесцентный метеоритный бургер',
      createdAt: '2025-05-08T21:30:23.140Z',
      updatedAt: '2025-05-08T21:30:23.877Z',
      number: 76631
    }
  ],
  total: 76259,
  totalToday: 90
};

export const mockUserOrders: TOrder[] = [
  {
    _id: '681d3e40c2f30c001cb227db',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-05-08T23:29:04.173Z',
    updatedAt: '2025-05-08T23:29:05.448Z',
    number: 76633
  },
  {
    _id: '681d279ec2f30c001cb227c9',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2025-05-08T21:52:30.312Z',
    updatedAt: '2025-05-08T21:52:30.997Z',
    number: 76632
  },
  {
    _id: '681d226fc2f30c001cb227c5',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный фалленианский люминесцентный метеоритный бургер',
    createdAt: '2025-05-08T21:30:23.140Z',
    updatedAt: '2025-05-08T21:30:23.877Z',
    number: 76631
  }
];

export const mockOrder: TOrder = {
  _id: '68178184e8e61d001cec5f6f',
  ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
  status: 'done',
  name: 'Флюоресцентный люминесцентный бургер',
  createdAt: '2025-05-04T15:02:28.432Z',
  updatedAt: '2025-05-04T15:02:29.196Z',
  number: 76197
};

export const mockErrorMessage = 'Ошибка';
