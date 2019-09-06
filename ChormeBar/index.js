import React, { PureComponent } from 'react';
import { Button } from 'antd';
import ChromeTabs from './chrome-tabs';

const ChormeTab = props => (
  <div className="chrome-tab" active={props.active ? 'true' : undefined}>
    <div className="chrome-tab-dividers"></div>
    <div className="chrome-tab-background">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <symbol id="chrome-tab-geometry-left" viewBox="0 0 214 36">
            <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
          </symbol>
          <symbol id="chrome-tab-geometry-right" viewBox="0 0 214 36">
            <use xlinkHref="#chrome-tab-geometry-left" />
          </symbol>
          <clipPath id="crop">
            <rect className="mask" width="100%" height="100%" x="0" />
          </clipPath>
        </defs>
        <svg width="52%" height="100%">
          <use
            xlinkHref="#chrome-tab-geometry-left"
            width="214"
            height="36"
            className="chrome-tab-geometry"
          />
        </svg>
        <g transform="scale(-1, 1)">
          <svg width="52%" height="100%" x="-100%" y="0">
            <use
              xlinkHref="#chrome-tab-geometry-right"
              width="214"
              height="36"
              className="chrome-tab-geometry"
            />
          </svg>
        </g>
      </svg>
    </div>
    <div className="chrome-tab-content">
      {/* <div
        className="chrome-tab-favicon"
        style={{ backgroundImage: "url('demo/images/google-favicon.ico')" }}
      ></div> */}
      <svg
        className="icon svg-icon aside-bar-icon chrome-tab-favicon"
        aria-hidden="true"
        style={{ marginRight: 20 }}
      >
        <use xlinkHref="#icontianjia" />
      </svg>
      <div className="chrome-tab-title">{props.title}</div>
      <div className="chrome-tab-drag-handle"></div>
      <div className="chrome-tab-close" onClick={props.onDelete}></div>
    </div>
  </div>
);
export default class ChormeBar extends React.Component {
  el = null;

  chromeTab = null;

  state = {
    tabs: [
      { active: true, title: '111111' },
      { active: false, title: '22222' },
      { active: false, title: '3333' },
      { active: false, title: '44444' },
      { active: false, title: '55555' },
    ],
  };

  componentDidMount = () => {
    this.el = document.querySelector('.chrome-tabs');
    this.chromeTab = new ChromeTabs();
    this.chromeTab.init(this.el);
    // console.log(chromeTabs);
  };

  componentDidUpdate = () => {
    const { tabs } = this.state;
    this.chromeTab.init(this.el);
    const Els = this.el.querySelectorAll('.chrome-tab');
    tabs.forEach((item, index) => {
      if (Els && Els.length) {
        Els[index].removeAttribute('active');
        if (item.active) Els[index].setAttribute('active', '');
      }
    });
  };

  handleAdd = () => {
    const { tabs } = this.state;
    tabs.forEach(item => {
      item.active = false;
    });
    tabs.push({ active: 'true', title: `${new Date()}` });
    this.setState({
      tabs: [...tabs],
    });

    console.log({ tabs });
  };

  handleDelete = index => {
    const { tabs } = this.state;

    tabs.forEach(item => {
      item.active = false;
    });
    if (tabs.length - 1 === index) {
      // 点击的是最后一个，就把前一个高亮
      tabs[index - 1].active = true;
    } else {
      // 否则就高亮后面一个
      tabs[index + 1].active = true;
    }
    tabs.splice(index, 1);

    console.log('删除tabs后', tabs);
    this.setState({
      tabs: [...tabs],
    });
    // tabs[index].active = true;
  };

  render() {
    const { tabs } = this.state;
    console.log('render里获取的tabs', tabs);
    return (
      <div>
        <div className="chrome-tabs">
          <div className="chrome-tabs-content">
            {tabs.map((item, index) => {
              console.log(item);
              return (
                <ChormeTab
                  title={item.title}
                  active={item.active}
                  onDelete={() => {
                    this.handleDelete(index);
                  }}
                />
              );
            })}

            {/* <ChormeTab title="asdfsad2" />
            <ChormeTab title="asdfsad3" />
            <ChormeTab title="asdfsad4" /> */}
          </div>
          <div className="chrome-tabs-bottom-bar"></div>
        </div>
        <div className="chrome-tabs-optional-shadow-below-bottom-bar"></div>

        <div>
          <Button onClick={this.handleAdd}>添加</Button>
        </div>
      </div>
    );
  }
}
