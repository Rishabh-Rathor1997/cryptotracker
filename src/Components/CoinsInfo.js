import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContex';
import axios from 'axios';
import {  createTheme, CssBaseline } from '@mui/material';
import  { ThemeProvider } from 'styled-components';
import { HistoricalChart } from '../Config/api';
import MainBox from './MainBox';




function CoinsInfo({coins}) {

     const [historicData, setHistoricData] = useState()
     const [days ,setdays] = useState(1);
     const { currency, symbol } = CryptoState();
     const [flag ,setflag] = useState(false);
     const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coins.id, days, currency));
        setflag(true);
        setHistoricData(data.prices);
      };

      useEffect(() => {
        fetchHistoricData();
      },[days ,currency]);

     const darkTheme = createTheme({
       palette: {
         primary: {
           main: "#fff",
         },
         mode : "dark"
        },
     })

  return (
   <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <MainBox historicData={historicData} flag={flag} days={days} setDays={setdays} currency={currency} setflag={setflag} />
      
            
       
   </ThemeProvider>
  )
}

export default CoinsInfo



