import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';

export default class DateRangePicker extends PureComponent {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  handleReset = () => {
    this.setState({
      startValue: null,
      endValue: null,
      endOpen: false,
    });
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState(
      {
        [field]: value,
      },
      () => {
        if (this.props.onChange) {
          this.props.onChange([this.state.startValue, this.state.endValue]);
          console.log([this.state.startValue, this.state.endValue]);
        }
      },
    );
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div
        {...this.props}
        style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}
      >
        <DatePicker
          disabledDate={this.disabledStartDate}
          // showTime
          format="YYYY-MM-DD"
          value={startValue}
          placeholder="开始时间"
          onChange={this.onStartChange}
          style={{ width: '49%', minWidth: 1 }}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          // showTime
          format="YYYY-MM-DD"
          value={endValue}
          placeholder="结束时间"
          onChange={this.onEndChange}
          style={{ width: '49%', minWidth: 1 }}
        />
      </div>
    );
  }
}
