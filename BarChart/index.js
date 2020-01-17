import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import MyIcon from '@/components/MyIcon';

export default class BarChart extends React.Component {
  handleClick = e => {
    const { onClick } = this.props;
    if (e.data && e.data._origin) {
      onClick && onClick(e.data._origin.phoneNumber);
    }
  };
  render() {
    const { height = 300, data=[], title = '支出次数', color = '#3897F2' } = this.props;

    // const cols = {
    //   y: {
    //     tickInterval: 20,
    //   },
    // };
    data.forEach(item => (item.title = title));
    const isZero = !Boolean(data && data.length);
    console.log(isZero, 'isZeroLineChart');
    const placeholder = (
      <div className="chart-placeholder" style={{ height: height }}>
        <MyIcon type="iconbianzu" />
        <div className="nomore">暂无数据</div>
      </div>
    );
    const scales = {
      y: {
        minTickInterval: 1,
      },
      [title]: {
        minTickInterval: 1,
      },
    };
    return (
      <div>
        {!isZero && (
          <Chart
            height={height}
            data={data}
            scales={scales}
            forceFit
            padding={[50, 50, 50, 50]}
            onPlotClick={this.handleClick}
          >
            <Axis
              name="x"
              label={{
                textStyle: {
                  fill: '#CEE9FF',
                },
              }}
            />
            <Axis
              name="y"
              grid={null}
              label={{
                textStyle: {
                  fill: '#CEE9FF',
                },
              }}
              line={{
                stroke: '#fff',
                fill: '#ffffff',
                // lineDash: [2, 2, 3],
                lineWidth: 1,
              }}
            />
            <Tooltip
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
            <Geom type="interval" position="x*y" shape="title" color={color} />

            {/* 通过Geom的shape="title" 来改文字，title在数据源中定义过了*/}
            <Legend position="top-right" textStyle={{ fill: '#fff' }} offsetX={15} />
          </Chart>
        )}
        {isZero && placeholder}
      </div>
    );
  }
}
