import React from 'react';
import PropTypes from 'prop-types';
import StyledTabHeader from './tab-header.style';

const TabHeader = ({
  isTabSelected, className, tabId, id, onClick, onKeyDown, tabIndex, position, title
}) => {
  return (
    <StyledTabHeader
      isTabSelected={ isTabSelected }
      aria-selected={ isTabSelected }
      className={ className }
      data-element='select-tab'
      data-tabid={ tabId }
      id={ id }
      onClick={ onClick }
      onKeyDown={ onKeyDown }
      role='tab'
      tabIndex={ tabIndex }
      position={ position }
    >
      {title}
    </StyledTabHeader>
  );
};

TabHeader.defaultProps = {
  position: 'horizontal'
};

TabHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isTabSelected: PropTypes.bool,
  position: PropTypes.string,
  className: PropTypes.string,
  tabId: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.string
};

export default TabHeader;
