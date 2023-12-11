import styled, { css } from "styled-components";
import { margin } from "styled-system";
import shade from "../../style/utils/shade";

import iconUnicodes from "./icon-unicodes";
import baseTheme, { ThemeObject } from "../../style/themes/base";
import iconConfig from "./icon-config";
import browserTypeCheck, {
  isSafari,
} from "../../__internal__/utils/helpers/browser-type-check";
import { toColor } from "../../style/utils/color";
import { IconType } from "./icon-type";
import addFocusStyling from "../../style/utils/add-focus-styling";

export type BackgroundShape = "circle" | "rounded-rect" | "square";

export type BgSize =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

export type FontSize = "small" | "medium" | "large" | "extra-large";

export interface StyledIconProps {
  /** Background colour, provide any color from palette or any valid css color value. */
  bg?: string;
  /** Background shape */
  bgShape?: BackgroundShape;
  /** Background size */
  bgSize?: BgSize;
  /**
   * @private
   * @ignore
   * Add classes to this component
   */
  className?: string;
  /** Icon colour, provide any color from palette or any valid css color value. */
  color?: string;
  /** Sets the icon in the disabled state */
  disabled?: boolean;
  /** Icon font size */
  fontSize?: FontSize;
  /**
   * Icon type
   *
   * The full list of types can be seen [here](https://github.com/Sage/carbon/blob/master/src/components/icon/icon-config.js).
   */
  type: IconType;
}

export interface StyledIconInternalProps {
  isInteractive?: boolean;
  hasTooltip?: boolean;
  theme?: ThemeObject;
}

function adjustIconBgSize(fontSize?: FontSize, bgSize?: BgSize) {
  if (fontSize && fontSize !== "small") {
    return iconConfig.backgroundSize[fontSize];
  }

  return bgSize ? iconConfig.backgroundSize[bgSize] : undefined;
}

const oldFocusStyling = "outline: 2px solid var(--colorsSemanticFocus500);";

const StyledIcon = styled.span<StyledIconProps & StyledIconInternalProps>`
  position: relative;
  vertical-align: middle;
  align-items: center;
  display: inline-flex;
  justify-content: center;

  ${({ fontSize, bgSize }) => css`
    height: ${adjustIconBgSize(fontSize, bgSize)};
    width: ${adjustIconBgSize(fontSize, bgSize)};
  `}

  ${({ bgShape }) => css`
    border-radius: ${bgShape ? iconConfig.backgroundShape[bgShape] : undefined};
  `}

  ${({ type, fontSize }) => css`
    &::before {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      font-family: CarbonIcons;
      content: "${iconUnicodes[type]}";
      font-style: normal;
      font-weight: normal;
      vertical-align: middle;

      ${fontSize &&
      css`
        font-size: ${iconConfig.iconSize[fontSize]};
        line-height: ${iconConfig.iconSize[fontSize]};
      `}

      ${type === "services" &&
      browserTypeCheck(window) &&
      css`
        margin-top: ${fontSize === "small" ? "-7px" : "-8px"};
      `}

        ${type === "services" &&
      isSafari(navigator) &&
      !browserTypeCheck(window) &&
      css`
        margin-top: -6px;
      `}
        
        display: block;
    }
  `}

  ${({ color, bg, theme, disabled, isInteractive }) => css`
    color: ${() => {
      if (disabled) return "var(--colorsYin030)";
      if (color) return toColor(theme, color);
      return "var(--colorsYin090)";
    }};
    background-color: ${bg ? toColor(theme, bg) : "transparent"};

    ${isInteractive &&
    css`
      &:hover {
        color: ${color
          ? shade(toColor(theme, color))(0.2)
          : "var(--colorsYin090)"};
        background-color: ${bg
          ? shade(toColor(theme, bg))(0.2)
          : "transparent"};
      }
    `}
  `}

  ${({ hasTooltip, theme }) =>
    hasTooltip &&
    css`
      :focus {
        ${!theme.focusRedesignOptOut ? addFocusStyling() : oldFocusStyling}
      }
    `}

  ${margin}
`;

StyledIcon.defaultProps = {
  theme: baseTheme,
};

export default StyledIcon;
