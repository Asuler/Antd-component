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
import DataSet from '@antv/data-set';

export default class LineBarChart extends React.Component {
  chartIns = null;
  componentDidMount = () => {
    console.log(this.chartIns);
  };
  render() {
    const { height = 300, data = [] } = this.props;
    console.log(data);
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['收入', '支出'],
      // 展开字段集
      key: 'type',
      // key字段
      value: 'value', // value字段
    });
    console.log(dv);
    // const label = {
    //   textStyle: {
    //     fill: '#fff',
    //   },
    // };
    console.log(dv);

    // 让刻度从0开始
    const scale = {
      label: {
        type: 'timeCat', //不加就要报错
      },
      交易笔数: {
        min: 0,
        // tickInterval:1000
        minTickInterval:1
      },
      收入: {
        min: 0,
      },
      支出: {
        min: 0,
      },
    };
    const label={
      textStyle:{
        fill:"#CEE9FF"
      }
    }
    return (
      <div>
        <Chart
          height={height}
          data={dv}
          forceFit
          padding={[20, 140, 40, 70]}
          scale={scale}
          onGetG2Instance={chart => {
            this.chartIns = chart;
          }}
        >
          {/* 右侧图例 */}
          {/* <Legend position="right-top" name=""/> */}
          <Legend
            name="type"
            position="right-center"
            allowAllCanceled
            custom={true}
            offsetX={25}
            textStyle={{
              textAlign: 'start', // 文本对齐方向，可取值为： start middle end
              fill: '#CEE9FF', // 文本的颜色
              fontSize: '12', // 文本大小
            }}
            items={[
              {
                value: '收入',
                marker: {
                  symbol: 'square',
                  fill: '#3AA0FF',
                  radius: 5,
                },
              },
              {
                value: '支出',
                marker: {
                  symbol: 'square',
                  fill: '#FAD337',
                  radius: 5,
                },
              },
              {
                value: '交易笔数',
                marker: {
                  symbol: 'square',
                  fill: '#fff',
                  radius: 5,
                },
              },
            ]}
            onClick={ev => {
              const item = ev.item;
              const value = item.value;
              const checked = ev.checked;
              const geoms = this.chartIns.getAllGeoms();
              console.log('geoms', geoms);
              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i];
                if (geom.getYScale().field === value && value === '交易笔数') {
                  if (checked) {
                    geom.show();
                  } else {
                    geom.hide();
                  }
                } else if (geom.getYScale().field === 'value' && value !== '交易笔数') {
                  geom.getShapes().map(shape => {
                    if (shape._cfg.origin._origin.type == value) {
                      shape._cfg.visible = !shape._cfg.visible;
                    }
                    shape.get('canvas').draw();
                    return shape;
                  });
                }
              }
            }}
          />
          {/* 横坐标 */}
          <Axis name="label" label={label} />
          {/* 左边纵坐标 */}
          <Axis name="value" label={label} position="left" grid={null} />
          {/* 右边纵坐标 */}
          <Axis name="交易笔数" label={label} position="right" grid={null} />
          <Tooltip
            crosshairs={{
              type: 'y',
              style: {
                stroke: '#fff', // 边框的颜色
              },
            }}
            g2-tooltip={{
              background: 'rgba(8,24,67,0.8)',
              boxShadow: 'none',
              color: '',
            }}
            g2-tooltip-title={{
              width: '86px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}
          />

          {/* 双柱图 */}
          <Geom
            type="interval"
            position="label*value"
            // #3AA0FF对应收入,#FAD337对应支出  颜色
            color={['type', ['#3AA0FF', '#FAD337']]}
            adjust={[
              {
                type: 'dodge',
                marginRatio: 9 / 32,
                // dodgeBy: 'type',
              },
            ]}
          />
          {/* 折线 */}
          <Geom
            type="path"
            position="label*交易笔数"
            size={2}
            // shape="交易笔数"
            color="#CEE9FF" //影响tooltip上的marker颜色
            style={{
              stroke: '#CEE9FF',
              lineWidth: 1,
            }}
          />
          {/* 折线上的点 */}
          <Geom
            type="point"
            position="label*交易笔数"
            size={2}
            shape="交易笔数"
            style={{
              stroke: '#CEE9FF',
              lineWidth: 1,
            }}
          />
        </Chart>
      </div>
    );
  }
}
