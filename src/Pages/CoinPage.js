import React, { useEffect , useState } from 'react'
import { CryptoState } from '../CryptoContex';
import axios from 'axios';
import { SingleCoin } from '../Config/api';
import { useParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import CoinsInfo from '../Components/CoinsInfo';
import { LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberWithCommas } from '../Components/Banner/Carousel';

function CoinPage() {
    const [coins, setCoins] =  useState();
    const {currency , symbol} = CryptoState();
    const {id} = useParams();
    const theme = useTheme(); // Add this line

    const fetchCoin = async () => {
      
      const {data} = await axios.get(SingleCoin(id));
      setCoins(data);
    };
    console.log(coins)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      fetchCoin();
    },[]);


    const Mainbox = styled('div')({
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      
    });

    const Sidebar = styled('div')({
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    });

   const Heading = styled(Typography)({
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto Mono',
     
    });

    const Description = styled(Typography)({
      width: '100%',
      fontFamily: 'Roboto Mono',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    });
    const MarketData = styled('div')({
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    })
    if(!coins) return <LinearProgress style={{ backgroundColor: 'gold' }} />;
  return (
    <Mainbox>
      <Sidebar> 
        <img src={coins?.image.large} alt={coins?.name} height="200" style={{marginBottom: 20}}/>
        <Heading variant="h3">{coins?.name}</Heading>
        <Description variant='subtitle1'> {coins?.description?.en? parse(coins.description.en.split(". ")[0]) : ''}</Description>
        <MarketData>
          <span style={{display: 'flex'}}>
            <Heading variant='h6'> Rank: {" "}</Heading>
              &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Roboto Mono",
              }}
            >
            {numberWithCommas(coins?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{display: 'flex'}}>
            <Heading variant='h6'>Current Price: {" "}</Heading>
              &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Roboto Mono",
              }}
            >
             {symbol} {" "} {numberWithCommas(coins?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display: 'flex'}}>
            <Heading variant='h6'>Market Cap: {" "}</Heading>
              &nbsp;&nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Roboto Mono",
              }}
            >
             {symbol} {" "} {numberWithCommas(coins?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))} M
            </Typography>
          </span>
        </MarketData>

        </Sidebar>
      <CoinsInfo coins={coins}/>
    </Mainbox>
  )
}

export default CoinPage
