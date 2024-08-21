import React, { useRef, useEffect } from 'react';
import { init } from 'echarts';
import type { EChartsOption } from 'echarts';
import { COLORS } from '../../../shared/constants/Colors';
import type { Props } from './types';

export const HoldingsPieChart = ({ data }: Props) => {
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const icon = `<span style="background-color:${params.color};border: 1px solid ${params.color};border-radius:50%;display:inline-block;height:10px;margin-left:7px;margin-top:3px;width:10px;"></span>`;
        return `<span>${icon}&nbsp;&nbsp;&nbsp;<tt>${params.data.description} (<strong>$${
          params.data.name
        }</strong>)</tt><br />${params.seriesName}:&nbsp;&nbsp;&nbsp;<span><strong>${params.data.weight.toFixed(
          2
        )}%</strong></span></span>`;
      },
      backgroundColor: 'rgba(245, 245, 245, 0.9)',
      borderWidth: 1,
      borderColor: COLORS.white,
      padding: 10,
      textStyle: {
        color: COLORS.black60,
      },
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: 'Weight',
        type: 'pie',
        radius: ['40%', '95%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: COLORS.white,
          borderWidth: 2,
        },
        label: {
          position: 'inner',
          fontSize: 14,
          fontWeight: 'bold',
          color: COLORS.white,
        },
        emphasis: {
          label: {
            fontSize: 18,
          },
        },
        labelLine: {
          show: false,
        },
        data,
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
