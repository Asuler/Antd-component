import { Charts } from 'ant-design-pro';
import { Empty } from 'antd';
import React, { useState } from 'react';
import range from 'lodash/range';
import Pie from '@/components/Pie';
import PieUrl from '@/assets/pie.png';
import styles from './index.less';
import MyIcon from '../Icon';
// const { TimelineChart, Pie } = Charts;
const defaultData = range(20).map(i => {
  const randomNum = Math.ceil(Math.random() * 10) + i;
  return {
    x: `123458902${randomNum}  杭州`,
    y: randomNum,
  };
});

// const pieHeight=parseInt((window.innerHeight - 328) / 2);
export default ({
  height = 200,
  width = '80%',
  data = [],
  callApi = () => console.log('callApi'),
  name = '总分值',
  colors,
  unit = '分',
  placeholderStyle = {},
  placeholderUrl,
}) => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const boxStyle = {
    width,
    margin: '0 auto',
    height: '100%',
    position: 'relative',
  };
  let isZero;
  if (data && data.length) {
    isZero = Object.keys(data).every(item => {
      if (data[item].y === 0) {
        return true;
      }
    });
  }
  if(data&&data.length==0){
    isZero=true
  }

  const renderEle = (
    <div>
      <Pie
        height={height}
        // padding={[10,10,10,10]}
        colors={isZero ? ['gray'] : colors}
        hasLegend
        subTitle={name}
        handleClick={callApi}
        total={() => (
          <span
            style={{ color: '#fff' }}
            dangerouslySetInnerHTML={{
              __html: data.reduce((pre, now) => now.y + pre, 0),
            }}
          />
        )}
        // percent={70}
        data={data}
        valueFormat={val => (
          <span
            style={{ color: val === 0 ? 'gray' : '#8db8dc' }}
            dangerouslySetInnerHTML={{ __html: `${val}${unit}` }}
          />
        )}
      />
    </div>
  );
  // const left = windowWidth < 1440 ? '-18px' : 'calc((100% - 1040px)/2 - 140px)';
  const placeholder = (
    <div className={styles['chart-placeholder']} style={{height:height}}>
       <MyIcon type="iconbianzu"/>
       <div className={styles.nomore}>暂无数据</div>
    </div>
   
  );

  return (
    <div style={boxStyle}>
      {!isZero&&renderEle}
      {/* {placeholder} */}
      {isZero ? placeholder : null}
    </div>
  );
};
