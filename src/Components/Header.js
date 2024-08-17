import { AppBar, Container, Toolbar, Typography, Select, MenuItem  } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { CryptoState } from '../CryptoContex';


const StyledTypography = styled(Typography)`
  flex: 1;
  color: #f7e707;
  font-size: 1.2rem;
  font-family: 'Roboto Mono', monospace;
  font-weight: bold;
  cursor: pointer;
`;

function Header() {
  const {currency, setCurrency} = CryptoState();
  console.log(currency);
  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      mode: "dark"
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <AppBar position="static" color="transparent">
        <Container>
          <Toolbar>
            <StyledTypography onClick={() => navigate('/')}>Crypto Tracker</StyledTypography>
            <Select variant='outlined'
              sx={{
                width: 100,
                height: 40,
                marginRight: 15
              }}
              value={currency}
              onChange = {(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header;