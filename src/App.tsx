import { useState } from 'react';
import UserContext from './contexts/AuthContext';
import AppRouter from './routers/AppRouter';


function App() {

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const data = { isAuth, setIsAuth }

  return (
    <UserContext.Provider value={data}>
      <AppRouter />
    </UserContext.Provider>
  );
}

export default App;
