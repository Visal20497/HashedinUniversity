const mockData = [
  {
    id: 1,
    title: 'React Basics',
    price: 100,
    discountedPrice: 80,
    educator: 'John Doe',
    courseDetails:
      'Learn the basics of React, including components, state, and props. This course will help you build a strong foundation in React.',
    timeLeft: '10 days',
    recommendedCourse: 'Advanced React',
    videoUrl: 'https://www.youtube.com/embed/Y6aYx_KKM7A?si=fqrzCNib0G3YFow8',
  },
  {
    id: 2,
    title: 'Advanced React',
    price: 150,
    educator: 'Jane Smith',
    courseDetails:
      'Dive deeper into React with hooks, context, and advanced patterns. Enhance your React skills to build more complex applications.',
    timeLeft: '15 days',
    recommendedCourse: 'React and Redux',
    videoUrl: 'https://www.youtube.com/embed/qTDnwmMF5q8?si=j_O9UhJzLH72c5PH',
  },
  {
    id: 3,
    title: 'React and Redux',
    price: 120,
    discountedPrice: 90,
    educator: 'Alice Johnson',
    courseDetails:
      'Integrate Redux with React for state management in complex applications. Learn how to manage state effectively in large-scale applications.',
    timeLeft: '12 days',
    recommendedCourse: 'Next.js Mastery',
    videoUrl: 'https://www.youtube.com/embed/qTDnwmMF5q8?si=j_O9UhJzLH72c5PH',
  },
  {
    id: 4,
    title: 'Vue.js Fundamentals',
    price: 90,
    discountedPrice: 70,
    educator: 'Bob Brown',
    courseDetails:
      'Get started with Vue.js and learn how to build dynamic web applications. This course covers the core concepts of Vue.js.',
    timeLeft: '8 days',
    recommendedCourse: 'Nuxt.js Deep Dive',
    videoUrl: 'https://www.youtube.com/embed/nhBVL41-_Cw?si=QjVC3-R0DzjpgLn-',
  },
  {
    id: 5,
    title: 'Angular for Beginners',
    price: 110,
    educator: 'Charlie Black',
    courseDetails:
      'An introduction to Angular, covering the basics of components and services. Build your first Angular application with ease.',
    timeLeft: '20 days',
    recommendedCourse: 'Advanced Angular',
    videoUrl: 'https://www.youtube.com/embed/Ata9cSC2WpM',
  },
  {
    id: 6,
    title: 'Advanced Angular',
    price: 140,
    discountedPrice: 120,
    educator: 'Diana White',
    courseDetails:
      'Explore advanced Angular topics like RxJS, NgRx, and performance optimization. Take your Angular skills to the next level.',
    timeLeft: '18 days',
    recommendedCourse: 'Angular for Beginners',
    videoUrl: 'https://www.youtube.com/embed/Ata9cSC2WpM',
  },
  {
    id: 7,
    title: 'Svelte Essentials',
    price: 80,
    educator: 'Eve Green',
    courseDetails:
      'Learn the essentials of Svelte, a modern JavaScript framework for building UIs. This course will guide you through the basics of Svelte.',
    timeLeft: '5 days',
    recommendedCourse: 'JavaScript Essentials',
    videoUrl: 'https://www.youtube.com/embed/H1eEFfAkIik',
  },
  {
    id: 8,
    title: 'Next.js Mastery',
    price: 130,
    discountedPrice: 100,
    educator: 'Frank Blue',
    courseDetails:
      'Master Next.js for server-side rendering and static site generation. Learn how to build fast and scalable web applications with Next.js.',
    timeLeft: '25 days',
    recommendedCourse: 'React Basics',
    videoUrl:
      'https://www.youtube.com/watch?v=wm5gMKuwSYk&list=PL6QREj8te1P7gixBDSU8JLvQndTEEX3c3',
  },
  {
    id: 9,
    title: 'Nuxt.js Deep Dive',
    price: 120,
    educator: 'Grace Yellow',
    courseDetails:
      'Deep dive into Nuxt.js for building powerful Vue.js applications. Understand the advanced features of Nuxt.js for production-ready apps.',
    timeLeft: '30 days',
    recommendedCourse: 'Vue.js Fundamentals',
    videoUrl:
      'https://www.youtube.com/watch?v=wm5gMKuwSYk&list=PL6QREj8te1P7gixBDSU8JLvQndTEEX3c3',
  },
  {
    id: 10,
    title: 'React Native Basics',
    price: 110,
    discountedPrice: 90,
    educator: 'Hank Purple',
    courseDetails:
      'Get started with React Native to build mobile applications for iOS and Android. Learn the fundamentals of React Native development.',
    timeLeft: '14 days',
    recommendedCourse: 'React Basics',
    videoUrl:
      'https://www.youtube.com/watch?v=hzzCveeczSQ&list=PLC3y8-rFHvwhiQJD1di4eRVN30WWCXkg1',
  },
  {
    id: 11,
    title: 'JavaScript Essentials',
    price: 70,
    educator: 'Ivy Orange',
    courseDetails:
      'Learn the essentials of JavaScript, the language of the web. This course covers the core concepts of JavaScript programming.',
    timeLeft: '7 days',
    recommendedCourse: 'TypeScript in Depth',
    videoUrl: 'https://www.youtube.com/watch?v=bC07ItX8x_Y',
  },
  {
    id: 12,
    title: 'TypeScript in Depth',
    price: 100,
    discountedPrice: 85,
    educator: 'Jack Red',
    courseDetails:
      'Explore TypeScript and how it enhances JavaScript development. Learn how to use TypeScript for building robust applications.',
    timeLeft: '22 days',
    recommendedCourse: 'JavaScript Essentials',
    videoUrl: 'https://www.youtube.com/watch?v=30LWjhZzg50',
  },
  {
    id: 13,
    title: 'Node.js Fundamentals',
    price: 95,
    educator: 'Karen Pink',
    courseDetails:
      'Learn the fundamentals of Node.js for building server-side applications. This course covers the basics of Node.js development.',
    timeLeft: '9 days',
    recommendedCourse: 'Express.js Advanced',
    videoUrl: 'https://www.youtube.com/watch?v=ENrzD9HAZK4',
  },
  {
    id: 14,
    title: 'Express.js Advanced',
    price: 110,
    discountedPrice: 95,
    educator: 'Leo Brown',
    courseDetails:
      'Advanced topics in Express.js for building robust web applications. Learn how to create scalable and maintainable Express.js apps.',
    timeLeft: '11 days',
    recommendedCourse: 'Node.js Fundamentals',
    videoUrl: 'https://www.youtube.com/watch?v=SccSCuHhOw0',
  },
  {
    id: 15,
    title: 'GraphQL Basics',
    price: 120,
    educator: 'Mona Grey',
    courseDetails:
      'Introduction to GraphQL for building flexible APIs. Understand the core concepts of GraphQL and how to use it in your projects.',
    timeLeft: '13 days',
    recommendedCourse: 'Apollo Client Mastery',
    videoUrl: 'https://www.youtube.com/watch?v=Zg4XIpnLWQg',
  },
  {
    id: 16,
    title: 'Apollo Client Mastery',
    price: 130,
    discountedPrice: 110,
    educator: 'Nina Silver',
    courseDetails:
      'Master Apollo Client for managing GraphQL data in your applications. Learn how to efficiently handle GraphQL queries and mutations.',
    timeLeft: '17 days',
    recommendedCourse: 'GraphQL Basics',
    videoUrl:
      'https://www.youtube.com/watch?v=xMCnDesBggM&list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y',
  },
];

export default mockData;
