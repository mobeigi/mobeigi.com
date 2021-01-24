import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import { init } from 'echarts';
import type { EChartsOption } from 'echarts';

import COLORS from '../../../shared/constants/Colors';

import type { Props } from './types';

const TimeWeightedReturnChart = ({ data }: Props) => {
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
        const icon = `<span data-tooltip="implied-high" style="border-radius: 2px;display: inline-block;height: 12px;margin-right:2px;width: 20px;"><span style="background-color:${params[0].color};border: 1px solid ${params[0].color};border-radius:50%;display:block;height:10px;margin-left:7px;margin-top:3px;width:10px;"></span></span>`;
        const niceDate = moment(params[0].data[0]).format('DD MMMM YYYY');
        const returnColour = params[0].data[1] >= 0 ? COLORS.slateGreen : COLORS.slateRed;

        return `<span><tt>${niceDate}</tt><br />${icon} ${params[0].seriesName}:&nbsp;&nbsp;&nbsp;<span style="color: ${returnColour};"><strong>${params[0].data[1]}%</strong></span></span>`;
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
        name: 'Return',
        type: 'line',
        data: data.map((entry) => [moment(entry.date).format('yyyy-MM-DD'), (entry.return * 100).toFixed(2)]),
        smooth: true,
        itemStyle: {
          color: '#3392ff',
        },
        lineStyle: {
          color: '#3392ff',
          opacity: 0.5,
          width: 3,
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

export default TimeWeightedReturnChart;
