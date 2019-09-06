import React from 'react';
import { mount, render } from 'enzyme';
import RadioSelector from './index';

describe('RadioSelector', () => {
  it('responses hover events', () => {
    const onChange = jest.fn();
    const wrapper = mount(<RadioSelector options={['已反馈', '未反馈']} onChange={onChange} />);

    wrapper
      .find('.ant-checkbox-input')
      .at(0)
      .simulate('change');
    expect(onChange).toHaveBeenCalledWith('2');

    wrapper
      .find('.ant-checkbox-input')
      .at(1)
      .simulate('change');
    expect(onChange).toHaveBeenCalledWith('1');
  });
});
