import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const lightTheme = {
  background: '#d2d2d2',
  color: '#000',
  buttonBackground: '#ebebeb',
  buttonColor: '#000',
};

const darkTheme = {
  background: '#000',
  color: '#fff',
  buttonBackground: '#555',
  buttonColor: '#d5d5d5',
};

const themes = {
  light: lightTheme,
  dark: darkTheme,
};

type ThemeType = keyof typeof themes;

const Calculator = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      event.preventDefault();
      const key = event.key;
      const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', '*', '-', '+', 'Enter', 'Escape', 'Backspace', '.'];

      if (validKeys.includes(key)) {
        const keyMap: { [key: string]: string } = {
          'Enter': '=',
          'Escape': 'C',
          'Backspace': '←',
        };

        handleButtonClick(keyMap[key] || key);
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [expression, result]);

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const evaluatedResult = eval(expression);
        setResult(evaluatedResult.toString());
        setExpression(evaluatedResult.toString());
      } catch {
        setResult('Error');
        setExpression('');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '←') {
      setExpression((prev) => prev.slice(0, -1));
    } else {
      if (result) {
        setExpression(result + value);
        setResult('');
      } else {
        setExpression((prev) => prev + value);
      }
    }
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <CalculatorContainer>
        <Container>
          <IconButton onClick={handleToggleTheme}>
            {theme === 'light' ? <MdDarkMode size={20} /> : <MdLightMode size={20} />}
          </IconButton>
          <Screen>{expression || result || '0'}</Screen>
          <ButtonGrid>
            {['C', '←', '(', ')', '/', '7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=',].map((button) => (
              <Button
                key={button}
                onClick={() => handleButtonClick(button)}
                special={button === '='}
                clear={button === 'C'}
              >
                {button}
              </Button>
            ))}
          </ButtonGrid>
        </Container>
      </CalculatorContainer>
    </ThemeProvider>
  );
};

const CalculatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  z-index: 2;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.3s, color 0.3s;
`;

const Container = styled.div`
  padding: 1rem;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 600px; 
  z-index: 3;

  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const Screen = styled.div`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.color};
  text-align: right;
  padding: 8px;
  font-size: 2em;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: background-color 0.3s, color 0.3s;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button<{ special?: boolean; clear?: boolean }>`
  background-color: ${({ theme, special, clear }) =>
    clear ? '#4e69a2' : special ? '#8c29de' : theme.buttonBackground};
  color: ${({ theme, special, clear }) =>
    clear ? '#fff' : special ? '#fff' : theme.buttonColor};
  font-size: 1.5em;
  border: none;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme, special, clear }) =>
      clear ? '#4e69a2' : special ? '#8c29de' : theme.color};
    color: ${({ theme, special, clear }) =>
      clear ? '#fff' : special ? '#fff' : theme.buttonBackground};
  }
`;

const IconButton = styled.button`
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.color};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

export default Calculator;
