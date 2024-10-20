import './App.css';

import { Button, useColorMode } from '@chakra-ui/react';
function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode} />
    </>
  );
}

export default App;
