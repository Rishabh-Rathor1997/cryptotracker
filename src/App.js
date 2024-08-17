import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Hompage from './Pages/Hompage';
import CoinPage from './Pages/CoinPage';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';



const AppContainer = styled('div')({
  backgroundColor: "#14161a",
  color: "#fff",
  minHeight: "100vh",
});

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContainer>
          <Header/>
          <Routes>
            <Route path="/" element={<Hompage/>} />
            <Route path="/coins/:id" element={<CoinPage/>} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;