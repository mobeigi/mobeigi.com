'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeMode } from '@/types/theme';
import { resolvedThemeToThemeMode } from '@/utils/theme';
import { format as formatDate } from 'date-fns';
import BaseTooltip from '../BaseTooltip';
import { GitContributionGraphProps } from './types';
import ClipLoader from 'react-spinners/ClipLoader';
import { GitContributionGraphContainer, SpinnerWrapper } from './styled';

import * as echarts from 'echarts/core';
import type { CallbackDataParams } from 'echarts/types/src/util/types.js';
import type { CalendarOption } from 'echarts/types/dist/shared.js';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { HeatmapChart } from 'echarts/charts';
import { TooltipComponent, VisualMapComponent, CalendarComponent } from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';
import { useBreakpoint } from '@/utils/breakpoints';

echarts.use([HeatmapChart, TooltipComponent, VisualMapComponent, CalendarComponent, SVGRenderer]);

const tooltipId = 'git-contribution-graph-tooltip';
type CalendarMonthLabelFormatter = Exclude<NonNullable<CalendarOption['monthLabel']>['formatter'], string | undefined>;

export const GitContributionGraph = ({ data }: GitContributionGraphProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const chartRef = useRef<ReactEChartsCore>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  const resolvedThemeMode = resolvedThemeToThemeMode(resolvedTheme);

  const { isMobileWidth } = useBreakpoint();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Set start/end dates based on incoming data
  const startDate = data[0][0];
  const endDate = data[data.length - 1][0];

  // Memoize formatter to prevent re-renders which can slow down chart
  const monthLabelFormatter = useCallback<CalendarMonthLabelFormatter>((value) => `{padded|${value.nameMap}}`, []);

  const option: echarts.EChartsCoreOption = {
    backgroundColor: 'transparent', // avoid darkMode theme background colour
    tooltip: { show: false },
    visualMap: {
      show: false,
      min: 0,
      max: 20,
      inRange: {
        color:
          resolvedThemeMode === ThemeMode.Dark
            ? ['#3a2e2f', '#5e2f33', '#84373a', '#af3a3d', '#fb4d56']
            : ['#e8d6d8', '#ffb7bb', '#ff8a91', '#ff5c66', '#fb4d56'],
      },
      type: 'piecewise',
      splitNumber: 5,
      pieces: [{ min: 20 }, { min: 10, max: 20 }, { min: 3, max: 10 }, { min: 1, max: 3 }, { value: 0 }],
    },
    calendar: {
      top: 20,
      left: 50,
      right: 20,
      cellSize: [isMobileWidth ? 20 : 18.83],
      range: [startDate, endDate],
      orient: isMobileWidth ? 'vertical' : 'horizontal',
      itemStyle: {
        borderWidth: 0,
        color: 'transparent',
      },
      dayLabel: {
        silent: true,
        nameMap: ['', 'Mon', '', 'Wed', '', 'Fri', ''],
      },
      monthLabel: {
        silent: true,
        align: 'left',
        rich: {
          padded: {
            padding: [0, 0, 0, 2], // Simulate margin
          },
        },
        formatter: monthLabelFormatter,
      },
      yearLabel: { show: false },
      splitLine: { show: false },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      itemStyle: {
        borderRadius: 6,
        borderWidth: isMobileWidth ? 5 : 2,
        borderColor: 'var(--theme-background)', // should match background colour of the chart container
      },
      data: data,
    },
  };

  /**
   * We rely on this function to update the tooltip position and content, triggered by the mouseover event.
   */
  const updateTooltip = useCallback((params: CallbackDataParams) => {
    if (!params.value || !chartRef.current) {
      return;
    }

    const chart = chartRef.current.getEchartsInstance();
    if (!chart) {
      return;
    }

    const [x, y] = chart.convertToPixel({ seriesIndex: 0 }, params.value as number[]);

    // Get the bounding box of the ECharts container
    const echartsContainerRect = chart.getDom().getBoundingClientRect();

    // Adjust to obtain absolute page coordinates
    const absoluteX = window.scrollX + echartsContainerRect.left + x;
    const absoluteY = window.scrollY + echartsContainerRect.top + y;

    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${absoluteX}px`;
      tooltipRef.current.style.top = `${absoluteY}px`;
    }

    const [date, contributionCount] = params.value as [string, number];
    const dateString = formatDate(date, 'd MMMM yyyy');

    setTooltipContent(
      contributionCount > 0
        ? `${contributionCount} contributions on ${dateString}`
        : `No contributions on ${dateString}`,
    );
    setIsTooltipOpen(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsTooltipOpen(false);
  }, []);

  const onEvents = {
    mouseover: updateTooltip,
    mouseout: hideTooltip,
  };

  if (!isLoaded) {
    return (
      <GitContributionGraphContainer>
        <SpinnerWrapper>
          <ClipLoader size={'2em'} color="var(--theme-text-subtle)" />
        </SpinnerWrapper>
      </GitContributionGraphContainer>
    );
  }

  return (
    <GitContributionGraphContainer>
      <ReactEChartsCore
        ref={chartRef}
        echarts={echarts}
        option={option}
        theme={resolvedThemeMode === ThemeMode.Dark ? 'dark' : undefined}
        onEvents={onEvents}
        style={{ width: '100%', height: '100%' }}
      />

      <BaseTooltip id={tooltipId} isOpen={isTooltipOpen} />
      <span
        ref={tooltipRef}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent || ''}
        style={{
          position: 'absolute',
          // Initially offscreen
          left: '-9999px',
          top: '-9999px',
          pointerEvents: 'none',
        }}
      />
    </GitContributionGraphContainer>
  );
};
