import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import StyledIconButton from "../../icon-button/icon-button.style";
import StyledBox from "../../box/box.style";
import StyledSearch from "../../search/search.style";
import StyledIcon from "../../icon/icon.style";
import StyledButton from "../../button/button.style";
import menuConfigVariants from "../menu.config";
import { MenuFullscreenProps } from "./menu-full-screen.component";
import { MenuType } from "../menu.context";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { StyledLink } from "../../link/link.style";

interface StyledMenuFullScreenProps
  extends Pick<MenuFullscreenProps, "isOpen" | "startPosition"> {
  menuType: MenuType;
}

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
  box-shadow: none;
`;

const StyledMenuFullscreen = styled.div<StyledMenuFullScreenProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  outline: none;

  && {
    ${StyledLink} {
      max-width: 100vw;
    }

    ${StyledLink} > a,
    ${StyledLink} > button,
    > div {
      font-size: var(--fontSizes200);
    }
  }

  ${({ isOpen, menuType, startPosition, theme }) => css`
    background-color: ${menuConfigVariants[menuType].background};
    z-index: ${theme.zIndex.fullScreenModal};

    && {
      ${StyledSearch} {
        ${StyledIcon} {
          display: inline-flex;
          bottom: auto;
        }

        ${StyledButton} {
          display: flex;
          line-height: normal;
          padding-bottom: 0;

          &:focus {
            border-bottom-right-radius: var(--borderRadius050);
            border-top-right-radius: var(--borderRadius050);

            ${!theme.focusRedesignOptOut
              ? addFocusStyling()
              : /* istanbul ignore next */ oldFocusStyling}
          }
        }
      }
    }

    ${isOpen &&
    css`
      visibility: visible;
      ${startPosition}: 0;
      transition: all 0.3s ease;
    `}

    ${!isOpen &&
    css`
      visibility: hidden;
      ${startPosition}: -100%;
      transition: all 0.3s ease;
    `}
  `}

  ${StyledBox} {
    &::-webkit-scrollbar {
      width: 16px;
    }
  }
`;

const StyledMenuFullscreenHeader = styled.div<StyledMenuFullScreenProps>`
  height: 40px;

  ${StyledIconButton} {
    position: absolute;
    z-index: 1;
    right: 16px;
    top: 8px;
  }

  ${({ menuType }) => css`
    background-color: ${menuConfigVariants[menuType].submenuItemBackground};
  `}
`;

StyledMenuFullscreen.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuFullscreen, StyledMenuFullscreenHeader };
