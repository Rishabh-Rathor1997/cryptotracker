import React, { useState , useEffect   } from 'react'

import { styled } from '@mui/material/styles';

import { CryptoState } from '../../CryptoContex';
import axios from 'axios';
import { TrendingCoins } from '../../Config/api'; // Update the import statement
import AliceCarousel, { Link } from 'react-alice-carousel';

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carouseltag = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  });

function Carousel() {

    const [trending, setTrending] = useState([]);
    const  {currency , symbol} =  CryptoState();
    const fethTrandingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    console.log(trending);

    useEffect(() => {
        fethTrandingCoins();
    }, [currency]);

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;
        return (
            <Link style={{ display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "#fff",

            }} to = {`/coin/${coin.id}`} >
                <img src = {coin?.image} alt = {coin.name} height = "80" style = {{marginBottom : 10}} />
                <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(28, 218, 21)" : "#f85515",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 , fontFamily : "Roboto Mono" }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
            </Link>
        )
    });

    const responsives = {
        0: {
            items: 1,
        },
        1024: {
            items: 5,
            itemsFit: 'contain',
        },
        786: {
            items: 3,
            itemsFit: 'contain',
        },
        512 : {
            items : 2,
            itemsFit: 'contain',
        }

    };
   

  return (
    <Carouseltag >
       <AliceCarousel
       infinite
       autoPlayInterval={1000}
       mouseTracking
       animationDuration={1500}
       disableDotsControls
       disableButtonsControls
       responsive={responsives}
       autoPlay
       items={items}
       
       
       />
    </Carouseltag>
  )
}

export default Carousel
