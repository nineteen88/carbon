import styled, { keyframes, css } from "styled-components";
import { margin } from "styled-system";
import { LOADER_SPINNER_SIZES, LOADER_SPINNER_SIZE_PARAMS } from "./loader-spinner.config";
import { LoaderSpinnerProps } from "./loader-spinner.component";

const StyledLoaderSpinner = styled.div`
  ${margin}
  position: relative;
  display: flex;
`;

// animation is documented here 

const untrackedSpin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const trackedSpin = (color: string) => keyframes`

0% {
    transform: rotate(0deg);
    border-color: transparent;
  }

  25% {
    transform: rotate(90deg);
    border-color: ${calculateColors("Inner", color)} transparent transparent transparent;
  }

  50% {
    transform: rotate(180deg);
    border-color: ${calculateColors("Inner", color)} ${calculateColors("Inner", color)} transparent transparent;
  }


  75% {
    transform: rotate(270deg);
    border-color: ${calculateColors("Inner", color)} ${calculateColors("Inner", color)} ${calculateColors("Inner", color)} transparent;
  }

  100% {
    transform: rotate(360deg);
    border-color: ${calculateColors("Inner", color)};
  }
`;

const calculateColors = (WheelType: "Inner" | "Background", color: string) => {
    switch (color) {
        case 'neutral':
            return WheelType === "Inner" ? "#335B70" : "#CCD6DB"
        case 'action':
          return WheelType === "Inner" ? "#007E45" : "#B3D9C8"
          case 'gradient':
            return WheelType === "Inner" ? "purple" : "white"         
        default:
            return "#FFFFFF"
      }
}

const StyledSpinnerWheel = styled.div<LoaderSpinnerProps>`

${({ animationTime, size = "M", color= "action", motion, tracked}) =>
    css`

  border-width: ${`${LOADER_SPINNER_SIZE_PARAMS[size].borderWidth}px`}
  border-style: solid;
  border-color: ${calculateColors("Inner", color)} ${calculateColors("Inner", color)} transparent transparent;
  width: ${`${LOADER_SPINNER_SIZE_PARAMS[size].dimensions}px`}
  height: ${`${LOADER_SPINNER_SIZE_PARAMS[size].dimensions}px`}
  border-radius: 50%;
  ${motion && css `animation: ${tracked ? trackedSpin(color) : untrackedSpin} ${animationTime}s infinite;`} 
  position: relative;
  flex-shrink: 0;
  z-index: 2;

  &:before,
    &:after {
      content: '';
      width: ${`${LOADER_SPINNER_SIZE_PARAMS[size].roundedCornerWidth}px`}
      height: ${`${LOADER_SPINNER_SIZE_PARAMS[size].roundedCornerWidth}px`}
      border-radius: 50%;
      background: ${calculateColors("Inner", color)} ;
      position: absolute;
    }

    &:before {
      top: 0px
    }

    &:after {
      bottom: 0px;
      right: 0px
    }

    `}
`;

const StyledSpinnerBackground = styled.div<Pick<LoaderSpinnerProps, "size" | "color">>`

${({ size = "M", color= "action" }) =>
    css`

  border-width: ${`${LOADER_SPINNER_SIZE_PARAMS[size].borderWidth}px`}
  border-style: solid;
  ${color === "inverse" && css `opacity: 0.3`};
  border-color: ${calculateColors("Background", color)}
  width: ${`${LOADER_SPINNER_SIZE_PARAMS[size].dimensions}px`}
  height: ${`${LOADER_SPINNER_SIZE_PARAMS[size].dimensions}px`}
  border-radius: 50%;
  position: absolute;
  z-index: 1;
    `}


`;

export {
    StyledLoaderSpinner,
    StyledSpinnerWheel,
    StyledSpinnerBackground,
};
