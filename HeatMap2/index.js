import React from 'react';
import { Chart, Geom, Axis, Tooltip, Label } from 'bizcharts';
import moment from 'moment';

let Xs = [];
for (let i = 1; i <= 31; i++) {
  Xs.push(i);
}

export default class HeatMap2 extends React.Component {
  handleClick = e => {
    const { onClick } = this.props;
    console.log(e);
    if (!e.data) return;

    onClick && onClick(e.data.orginTime ? e.data.orginTime : e.data._origin.orginTime);
  };
  render() {
    const { height = 300, data = [],months=[] } = this.props;
    const source = [];
    // let months = [];
    // // 这个months只用于连续三个月,跨了好几年的，不能在后面用去重来提取
    // for (let i = 0; i < data.length; i++) {
    //   const item = data[i];
    //   const time = moment(item.dateTime);
    //   months.push(time.month() + 1);
    // }
    // months = [...new Set(months)];
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const time = moment(item.dateTime);
      const obj = {};
      obj.day = time.date() - 1;
      obj.month = months.findIndex(item => item == time.month() + 1) || 0;  //纵坐标 从0开始
      obj.次数 = item.count;
      obj.orginTime = item.dateTime;
      source.push(obj);
    }

    const cols = {
      day: {
        type: 'cat',
        values: Xs,
      },
      month: {
        type: 'cat',
        values: months,
      },
    };
    return (
      <div>
        <Chart
          height={height}
          data={source}
          scale={cols}
          padding={[0, 0, 50, 30]}
          forceFit
          onPlotClick={this.handleClick}
        >
          <Axis
            name="day"
            grid={{
              align: 'center',
              lineStyle: {
                lineWidth: 1,
                lineDash: null,
                stroke: '#f0f0f0',
              },
              showFirstLine: true,
            }}
            label={{
              textStyle: {
                fill: '#fff',
              },
            }}
          />
          <Axis
            name="month"
            grid={{
              align: 'center',
              lineStyle: {
                lineWidth: 1,
                lineDash: null,
                stroke: '#f0f0f0',
              },
            }}
            label={{
              textStyle: {
                fill: '#fff',
              },
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
          <Geom
            type="polygon"
            position="day*month"
            color={['次数', '#FFCC6B-#BBA16E-#76756E']}
            style={{
              stroke: '#fff',
              lineWidth: 1,
            }}
          >
            <Label
              content="次数"
              offset={-2}
              textStyle={{
                fill: '#fff',
                fontWeight: 'bold',
                shadowBlur: 2,
                // shadowColor: 'rgba(0, 0, 0, .45)',
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
