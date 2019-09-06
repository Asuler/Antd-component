import React from 'react';
import { mount, render } from 'enzyme';
import DateRangePicker from './index';

describe('DateRangePicker', () => {
  it('日期范围选择器', () => {
    const onChange = jest.fn();
    const wrapper = mount(<DateRangePicker onChange={onChange} />);

    wrapper.setProps({ value: ['2019-07-09', '2019-07-09'] });
    expect(
      render(
        wrapper
          .find('Trigger')
          .at(0)
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
  });
});
