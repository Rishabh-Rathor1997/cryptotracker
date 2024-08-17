import axios from 'axios'
import React ,  {useState , useEffect} from 'react'
import { CryptoState } from '../CryptoContex'
import { CoinList } from '../Config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, Table, TableContainer, TableHead, TableRow, TableCell, TextField, Typography, TableBody, Paper, Pagination } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { numberWithCommas } from './Banner/Carousel';

const Row = styled(TableRow)({
  backgroundColor: "#16171a",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#131111",
  },
  fontFamily: "Montserrat",
});








const theme = createTheme();



function CoinTable() {

  const { currency , symbol} = CryptoState();
  const [coins, setCoins] = useState([])
  const [Loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const [page , setPage] = useState(1);

  const fetchCoins = async () => {
      setLoading(true);
      const {data} = await  axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
  }

  console.log(coins)

  useEffect(() => {
      fetchCoins();
   }
      ,[currency])

  const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff"
          },
          mode: "dark"
        },
      });


  const handleSearch = () => { 
    return coins.filter((coin) => coin.name.toLowerCase().includes(search)) ||
    coins.filter((coin) => coin.symbol.toLowerCase().includes(search));
  };

  const  ulStyles = {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  }
    

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container style={{ textAlign: "center" }}>
      <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {Loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Roboto Mono",
                        fonstSize: "18px",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <Row
                        onClick={() => navigate(`/coins/${row.id}`)}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </Row>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Pagination */}
        <Pagination
            
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            count={parseInt((handleSearch()?.length / 10).toFixed(0))}
            classes={{ ul:  {
              "& .MuiPaginationItem-root": {
                color: "gold",
              },
            } }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinTable
