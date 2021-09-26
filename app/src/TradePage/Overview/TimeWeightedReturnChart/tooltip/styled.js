import styled from 'styled-components';

export const TooltipContainer = styled.div``;

export const DateWrapper = styled.p`
  font-family: monospace;
`;

export const Icon = styled.div`
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 50%;
  display: inline-block;
  height: 10px;
  margin-left: 6px;
  margin-right: 8px;
  width: 10px;
`;

export const ReturnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const ReturnRow = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 140px;
`;
export const IconContainer = styled.span`
  flex: 1;
`;
export const SeriesNameContainer = styled.span`
  flex: 2 1 auto;
  text-align: left;
`;
export const ReturnPercentageContainer = styled.span`
  flex: 3;
  color: ${(props) => props.color};
  font-weight: bold;
`;
