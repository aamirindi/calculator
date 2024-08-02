import React from 'react';
import Calculator from './Calculator';
import Orb from './Orb';
import styled from 'styled-components';

const App: React.FC = () => {
  return (
    <AppStyled className="App">
      <Orb />
      <Calculator />
    </AppStyled>
  );
};

const AppStyled = styled.div`
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export default App;
