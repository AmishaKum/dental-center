import React, { useEffect } from 'react';
import { seedLocalStorage } from './data/initData';
import AppRouter from './AppRouter';

function App() {
  useEffect(() => {
    seedLocalStorage(); // 👈 this loads admin & patient user data
  }, []);

  return <AppRouter />;
}

export default App;
