import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import Carousel from './Carousel';

const BannerRoot = styled('div')({
  backgroundImage: 'url(./banner2.jpg)',
});

const Tagline = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  });
  


function Banner() {
  return (
    <BannerRoot>
       <Container style ={{
        height: 400,
        display : "flex",
        flexDirection : "column",
        paddingTop : 25,
        justifyContent : "space-around",
       }}>
        <Tagline>
            <Typography
            variant = "h2"
            style = {{
                fontWeight : "bold",
                marginBottom : 15,
                fontFamily : "Roboto Mono",
                
                
            }}
            >
                Crypto Tracker
            </Typography>
            <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
        <Carousel/>
       </Container>

    </BannerRoot>
  );
}
export default Banner;