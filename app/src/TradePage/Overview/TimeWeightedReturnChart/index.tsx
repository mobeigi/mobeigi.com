import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { init } from 'echarts';
import type { EChartsOption } from 'echarts';
import ReactDOMServer from 'react-dom/server';

import { COLORS } from '../../../shared/constants/Colors';
import type { TimeWeightedReturnChartProps } from './types';
import { Tooltip } from './tooltip';

export const TimeWeightedReturnChart = ({ portfolioData: data, marketData }: TimeWeightedReturnChartProps) => {
  const seriesData = data.map((entry) => [moment(entry.date).format('yyyy-MM-DD'), (entry.return * 100).toFixed(2)]);
  const seriesMarketData = marketData.map((entry) => [
    moment(entry.date).format('yyyy-MM-DD'),
    (entry.return * 100).toFixed(2),
  ]);

  const options = {
    title: {
      show: false,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          formatter: (params: any) => {
            switch (params.axisDimension) {
              case 'x':
                return params.value;
              case 'y':
                return `${Number(params.value).toFixed(2)}%`;
              default:
                return params.value;
            }
          },
        },
      },
      formatter: (params: any) => {
        const tooltipPortfolioData = params[0] && {
          date: params[0].data[0],
          color: params[0].color,
          seriesName: params[0].seriesName,
          returnPercentage: params[0].data[1],
        };
        const tooltipMarketData = params[1] && {
          date: params[1].data[0],
          color: params[1].color,
          seriesName: params[1].seriesName,
          returnPercentage: params[1].data[1],
        };
        const tooltipHtml = ReactDOMServer.renderToString(
          <Tooltip portfolioData={tooltipPortfolioData} marketData={tooltipMarketData} />
        );
        return tooltipHtml;
      },
      backgroundColor: 'rgba(245, 245, 245, 0.9)',
      borderWidth: 1,
      borderColor: COLORS.white,
      padding: 10,
      textStyle: {
        color: COLORS.black60,
      },
    },
    axisPointer: {
      link: [{ xAxisIndex: 'all' }],
    },
    toolbox: {
      show: false,
    },
    brush: {
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: {
        colorAlpha: 0.1,
      },
    },
    grid: [
      {
        left: '10%',
        right: '10%',
        top: '5%',
        bottom: '0',
        height: '62%',
      },
    ],
    xAxis: {
      type: 'category',
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      axisLabel: {
        show: true,
        interval: (index: number) => index % 28 === 0, // Show each 28th day as month on axis
        formatter: (value: string) => {
          const date = moment(value).toDate();
          return moment(date).format('MMMM YYYY');
        },
        color: COLORS.grey,
        margin: 15,
      },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100,
      },
    },
    yAxis: {
      scale: true,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)',
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [COLORS.slateAsh],
        },
      },
      axisLabel: {
        formatter: '{value}%',
        margin: 5,
        color: COLORS.grey,
      },
    },
    series: [
      {
        name: 'Portfolio',
        type: 'line',
        data: seriesData,
        smooth: true,
        showSymbol: false,
        symbolSize: 7,
        itemStyle: {
          color: '#3392ff',
          opacity: 1,
        },
        lineStyle: {
          color: '#3392ff',
          opacity: 0.7,
          width: 2.5,
        },
      },
      {
        name: 'Market',
        type: 'line',
        data: seriesMarketData,
        smooth: true,
        showSymbol: false,
        symbolSize: 7,
        itemStyle: {
          color: '#7B68EE',
          opacity: 1,
        },
        lineStyle: {
          color: '#7B68EE',
          opacity: 0.7,
          width: 2.5,
        },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        bottom: '2%',
        start: 0,
        end: 100,
        height: '20%',
      },
    ],
  } as EChartsOption;

  const chartDivContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartDivContainerRef.current) {
      const chart = init(chartDivContainerRef.current);
      chart.setOption(options);
      window.onresize = () => {
        chart.resize();
      };
    }
  }, []);

  return <div ref={chartDivContainerRef} style={{ width: '100%', height: '100%' }} />;
};
