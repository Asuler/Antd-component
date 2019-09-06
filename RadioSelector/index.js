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
    if (!options) options = [{ label: "label1", value: '2' }, { label: 'label2', value: '1' }];
    return (
      <div>
        {options.map((item, index) => {
          return (
            <Checkbox
              onChange={this.handleChange}
              value={item.value}
              checked={value === item.value}
            >
              {item.label}
            </Checkbox>
          );
        })}
        {/* <Checkbox onChange={this.handleChange} value="2" checked={value === '2'}>
          {options[0]}
        </Checkbox>
        <Checkbox onChange={this.handleChange} value="1" checked={value === '1'}>
          {options[1]}
        </Checkbox> */}
      </div>
    );
  }
}
