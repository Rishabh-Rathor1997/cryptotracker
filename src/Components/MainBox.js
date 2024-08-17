import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale } from 'chart.js/auto';
import SelectButton from "./SelectButton";
import { chartDays } from "../Config/data";


Chart.register(CategoryScale, LinearScale);


const MainboxsidebBox = styled('div')`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 40px;
  @media (max-width: 960px) {
    width: 100%;
    margin-top: 0;
    padding: 20px;
    padding-top: 0;
  }
`;

function MainBox({ historicData, flag, days, currency, setDays ,setflag }) {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  }, [historicData]);

  const getChartData = () => {
    return {
      labels: historicData.map((coin) => {
        let date = new Date(coin[0]);
        let time =
          date.getHours() > 12
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
        return days === 1 ? time : date.toLocaleDateString();
      }),

      datasets: [
        {
          data: historicData.map((coin) => coin[1]),
          label: `Price (Past ${days} Days) in ${currency}`,
          borderColor: '#EEBC1D',
        },
      ],
    };
  };

  return (
    <MainboxsidebBox>
      {!historicData ? (
        <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
      ) : (

        <>
        <Line
          data={getChartData()}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
          alt="Line chart showing price over time"
          ref={(chartInstance) => setChartInstance(chartInstance)}
        />
        <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            onClick={() => {setDays(day.value);
              setflag(false);
            }}
            selected={day.value === days}
          >
            {day.label}
          </SelectButton>
        ))}
      </div>
      </>
      )}
    </MainboxsidebBox>
  );
}

export default MainBox;