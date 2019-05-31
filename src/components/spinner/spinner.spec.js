import React from 'react';
import TestRenderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import Spinner from './spinner.component';
import StyledSpinner from './spinner.style';
import OptionsHelper from '../../utils/helpers/options-helper';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import { classicSpinnerColors, classicSpinnerSizes } from './classicSpinnerValues';

function render(props) {
  return shallow(<Spinner { ...props } />);
}

function renderStyles(props) {
  return TestRenderer.create(<StyledSpinner { ...props } />);
}

describe('Spinner', () => {
  let wrapper;
  it('renders as expected', () => {
    wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it('contains custom className if passed as a prop', () => {
    wrapper = render({ className: 'class' });
    expect(wrapper.find('.class').exists()).toEqual(true);
  });

  it('applies color reflecting type if passed', () => {
    OptionsHelper.colors.map((type) => {
      wrapper = renderStyles({ type });
      assertStyleMatch(
        {
          borderTopColor: classicSpinnerColors[type].borderTop,
          borderBottomColor: classicSpinnerColors[type].borderBottom,
          borderRightColor: classicSpinnerColors[type].borderRight,
          borderLeftColor: classicSpinnerColors[type].borderLeft
        },
        wrapper.toJSON()
      );
    });
  });

  it('applies width, height and border-width dependent on the passed size', () => {
    OptionsHelper.sizesFull.map((size) => {
      wrapper = renderStyles({ size });
      assertStyleMatch(
        {
          width: classicSpinnerSizes[size].width,
          height: classicSpinnerSizes[size].height,
          borderWidth: classicSpinnerSizes[size].borderWidth
        },
        wrapper.toJSON()
      );
    });
  });
});
