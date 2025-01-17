import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWindowSize } from './utilis/useWindowSize';

const Orb: React.FC = () => {
  const { width, height } = useWindowSize();

  const moveOrb = keyframes`
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(${width}px, ${height / 2}px);
    }
    100% {
      transform: translate(0, 0);
    }
  `;

  const OrbStyled = styled.div`
    width: 70vh;
    height: 70vh;
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    margin-left: -37vh;
    margin-top: -37vh;
    background: linear-gradient(180deg, #f56692 0%, #f2994a 100%);
    filter: blur(200px);
    animation: ${moveOrb} 60s alternate linear infinite;
    pointer-events: none;
    user-select: none;
  `;

  return <OrbStyled />;
};

export default Orb;
