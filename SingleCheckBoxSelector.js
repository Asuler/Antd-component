/*
单选框选中了之后再次点击，没办法取消掉
如果用单选框封装的话，antd里的单个的Radio没有onChange的api
如果用RadioGroup，onChange的api只有在选项变化时才会触发，即选中后，再次点击，不触发onChange事件，

非常难受，所以基于antd和checkbox，封装了一个只能单选的复选框组

并且可以取消掉勾选
并且可以放在form的getFieldDecorator里当作正常的表单组件使用
如果要用 form表单的resetFields一键重置值，得在getFieldDecorator里面给它设置initialValue为undefined

*/ 


import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';

export default class RadioSelector extends PureComponent {
  state = {
    value: undefined,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  handleChange = e => {
    const { onChange } = this.props;
    const { value } = this.state;
    if (e.target.value === value) {
      this.setState({ value: undefined });
      if (onChange) onChange(undefined);
      return;
    }
    if (onChange) onChange(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { value } = this.props;
    let { options } = this.props;
    if (!options) options = ['已读', '未读'];
    return (
      <div>
        <Checkbox onChange={this.handleChange} value="2" checked={value === '2'}>
          {options[0]}
        </Checkbox>
        <Checkbox onChange={this.handleChange} value="1" checked={value === '1'}>
          {options[1]}
        </Checkbox>
      </div>
    );
  }
}
