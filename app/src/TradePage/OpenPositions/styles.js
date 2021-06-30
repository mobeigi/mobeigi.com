import styled from 'styled-components';

export const OpenPositionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;

  * {
    margin-top: 5em;
  }
`;

export const HoldingsPieChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  width: 100%;
  margin: 0 auto;
`;

export default { OpenPositionsContainer, HoldingsPieChartContainer };
