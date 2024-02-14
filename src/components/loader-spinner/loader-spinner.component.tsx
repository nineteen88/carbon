import React, { useRef, useState } from "react";
import { MarginProps } from "styled-system";
import tagComponent, {
    TagProps,
  } from "../../__internal__/utils/helpers/tags/tags";
import { StyledLoaderSpinner, StyledSpinnerWheel, StyledSpinnerBackground } from "./loader-spinner.style";

// see if we can move this to config later on 
export type LoaderSpinnerSizes = "XS" | "S" | "M" | "L" | "XL";

// add more colours down the line to align with the DS 
export interface LoaderSpinnerProps extends MarginProps, TagProps {
  size?: LoaderSpinnerSizes;
  color?: "action" | "neutral" | "inverse" | "gradient";
  tracked?: boolean;
  motion?: boolean;
  /** The total animation time (in seconds) */
  animationTime?: number;
}

export const LoaderSpinner = ({
    size = "M",
    color = "action",
    motion = true,
    tracked = false,
    animationTime = 1.5,
  ...rest
}: LoaderSpinnerProps) => {

  return (
    <StyledLoaderSpinner
    {...tagComponent("loader-spinner", rest)}
    {...rest}
  >
    <StyledSpinnerWheel size={size} color={color} motion={motion} tracked={tracked} animationTime={animationTime}/>
  <StyledSpinnerBackground size={size} color={color} />
  </StyledLoaderSpinner>
  );
};

export default LoaderSpinner;
