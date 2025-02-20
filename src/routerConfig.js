import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    // ...existing routes...
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;
