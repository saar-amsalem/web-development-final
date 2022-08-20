import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Matan',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Omer',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Noa',
      slug: 'noa-bensa',
      category: 'girl',
      image: '/images/p1.jpg',
      price: 2,
      countInStock: 10,
      brand: 'noa',
      rating: 10,
      numReviews: 10000000000,
      description: ' טוב',
    },
    {
      // _id: '2',
      name: 'MatanGa',
      slug: 'matanga',
      category: 'boy',
      image: '/images/p2.jpg',
      price: 2000000,
      countInStock: 0,
      brand: 'matan',
      rating: 1.5,
      numReviews: 10000000000000,
      description: '',
    },
    {
      // _id: '3',
      name: 'Almogiii',
      slug: 'almogii',
      category: 'girl',
      image: '/images/p3.jpg',
      price: 20000,
      countInStock: 2,
      brand: 'almog',
      rating: 10,
      numReviews: 1000,
      description: 'מ דחוף!!!!!!!',
    },
    {
      // _id: '4',
      name: 'Shanin',
      slug: 'shani-]',
      category: 'girl',
      image: '/images/p4.jpg',
      price: 9,
      countInStock: 0,
      brand: 'girl',
      rating: 8,
      numReviews: 100,
      description: 'רן',
    },
  ],
};

export default data;
