import React from "react";
import { PaddingProps, FlexboxProps } from "styled-system";
import StyledNavigationBar from "./navigation-bar.style";

export type Position = "sticky" | "fixed";
export type Orientation = "top" | "bottom";
export type NavigationType = "light" | "dark" | "white" | "black";

// remove this when `stickyPosition` and `stickyOffset` props are removed
export type StickyPosition = "top" | "bottom";

export interface NavigationBarProps extends PaddingProps, FlexboxProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  /** Color scheme of navigation component */
  navigationType?: NavigationType;
  /** If 'true' the children will not be visible */
  isLoading?: boolean;
  /** Defines the position of sticky navigation bar */
  stickyPosition?: StickyPosition;
  /** Defines the offset of sticky navigation bar */
  stickyOffset?: string;
  /** Defines whether the navigation bar should be positioned fixed or sticky */
  position?: Position;
  /** Defines the offset of navigation bar */
  offset?: string;
  /** Defines whether the navigation bar should be positioned top or bottom */
  orientation?: Orientation;
}

export const NavigationBar = ({
  navigationType = "light",
  isLoading = false,
  children,
  ariaLabel,
  stickyOffset = "0",
  stickyPosition,
  position,
  offset = "0",
  orientation,
  ...props
}: NavigationBarProps): JSX.Element => {
  return (
    <StyledNavigationBar
      role="navigation"
      aria-label={ariaLabel}
      navigationType={navigationType}
      data-component="navigation-bar"
      stickyOffset={stickyOffset}
      stickyPosition={stickyPosition}
      position={position}
      offset={offset}
      orientation={orientation}
      {...props}
    >
      {!isLoading && children}
    </StyledNavigationBar>
  );
};

export default NavigationBar;
