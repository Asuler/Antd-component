import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import hexToRgba from 'hex-to-rgba';
import MyIcon from '@/components/MyIcon'
export default class LineChart extends React.Component {
  chartIns = null;
  handleClick = e => {
    let clickItem = this.chartIns.getTooltipItems({
      x: e.x,
      y: e.y,
    });
    console.log(clickItem);
    const { onClick } = this.props;
    onClick && onClick();
  };
  render() {
    const { height = 300, lineColor = '#E5C53E', title = '支出情况', data = [] } = this.props;
    const areaBg = hexToRgba(lineColor, 0.5);
    // const data = [
    //   {
    //     x: '1750',
    //     y: 106,
    //   },
    //   {
    //     x: '1800',
    //     y: 107,
    //   },
    //   {
    //     x: '1850',
    //     y: 111,
    //   },
    //   {
    //     x: '1900',
    //     y: 1766,
    //   },
    //   {
    //     x: '1950',
    //     y: 221,
    //   },
    //   {
    //     x: '1999',
    //     y: 767,
    //   },
    //   {
    //     x: '2050',
    //     y: 133,
    //   },
    // ];
    data.forEach(item => (item.title = title));
    const label = {
      textStyle: {
        fill: '#fff',
      },
    };
    const isZero = !Boolean(data && data.length);
    console.log(isZero,"isZeroLineChart")
    const placeholder = (
      <div className="chart-placeholder" style={{ height: height }}>
        <MyIcon type="iconbianzu" />
        <div className="nomore">暂无数据</div>
      </div>
    );
    return (
      <div>
        {!isZero && (
          <Chart
            height={height}
            data={data}
            forceFit
            padding={[50, 50, 50, 50]}
            onPlotClick={this.handleClick}
            onGetG2Instance={g2Chart => {
              this.chartIns = g2Chart;
            }}
          >
            <Axis
              name="y"
              label={label}
              grid={null}
              line={{
                stroke: '#fff',
                fill: '#ffffff',
                lineWidth: 1,
              }}
            />
            <Axis name="x" label={label} />
            <Legend
              position="top-right"
              background={{ fill: lineColor }}
              textStyle={{
                fill: '#fff',
              }}
              offsetX={15}
              useHtml={true}
              g2-legend-marker={{
                background: lineColor,
              }}
            />
            <Tooltip
              crosshairs={{
                type: 'y',
                style: {
                  stroke: '#FFF',
                  lineWidth: 3,
                },
              }}
              g2-tooltip={{
                background: 'rgba(8,24,67,0.8)',
                boxShadow: 'none',
                color: '',
              }}
              g2-tooltip-title={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: '#fff',
              }}
            />
            <Geom type="areaStack" position="x*y" color={['title', [areaBg]]} tooltip={false} />
            <Geom type="lineStack" position="x*y" color={['title', [lineColor]]} />
          </Chart>
        )}
        {isZero && placeholder}
      </div>
    );
  }
}
