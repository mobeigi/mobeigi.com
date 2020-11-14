import React from 'react';

import { MoonLoader } from 'react-spinners';
import type { State } from './types';
import { StockTwitsIFrame } from './styles';
import { LoaderCss } from '../../shared/styles/common';
import COLORS from '../../shared/constants/Colors';

const stockTwitsStreamUrl = 'https://api.stocktwits.com/widgets/stream';
const widgetOptions = {
  width: '800',
  height: '800',
  user: 'mobeigi',
  avatars: '1',
  scrollbars: '1',
  limit: '10', // TODO: This is bugged, value is off by 1 (too low)
  streaming: '1',
  times: '1',
  header: '0',
  title: '',
  border_color: COLORS.grey,
  border_color_2: COLORS.grey,
  box_color: COLORS.white,
  header_text_color: 'red',
  divider_color: 'cecece',
  stream_color: '282828',
  username_color: COLORS.white,
  username_hover_color: COLORS.white,
  username_font: 'Arial',
  username_size: '14',
  divider_type: 'solid',
  link_color: COLORS.white,
  link_hover_color: COLORS.white,
  link_ticker_color: 'e2c600',
  link_ticker_hover_color: 'e2c600',
  time_color: '999999',
  text_color: COLORS.grey,
  font: 'Arial',
  font_size: '14',
  time_font_size: '12',
};

const StockTwitsWidget = () => {
  const [state, setState] = React.useState<State>({
    loading: true,
  });

  return (
    <div>
      <MoonLoader
        css={LoaderCss}
        size={50}
        color={COLORS.white}
        loading={state.loading}
      />

      <StockTwitsIFrame
        title="StockTwits (@mobeigi)"
        src={`${stockTwitsStreamUrl}?${new URLSearchParams(widgetOptions).toString()}`}
        style={{ display: state.loading ? 'none' : 'initial' }}
        scrolling="no"
        onLoad={() => setState((prevState: State) => ({ ...prevState, loading: false }))}
      />
    </div>
  );
};

export default StockTwitsWidget;
