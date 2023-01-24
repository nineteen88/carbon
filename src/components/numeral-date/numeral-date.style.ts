import styled, { css } from "styled-components";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import StyledIconSpan from "../../__internal__/input-icon-toggle/input-icon-toggle.style";
import StyledInputPresentantion from "../../__internal__/input/input-presentation.style";
import StyledFormField from "../../__internal__/form-field/form-field.style";

interface StyledDateFieldProps {
  isEnd?: boolean;
  isMiddle?: boolean;
  isYearInput?: boolean;
  hasValidationIcon?: boolean;
}

export const StyledNumeralDate = styled.div<{ name?: string }>`
  display: inline-flex;
  border: 1px solid transparent;
  border-radius: 0px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 2px;
  padding-top: 1px;

  ${StyledFormField} {
    margin-top: 0px;
  }
`;

export const StyledDateField = styled.div<StyledDateFieldProps>`
  ${({ isYearInput, isEnd, hasValidationIcon, isMiddle }) => {
    const yearInputOrError = isYearInput || (isEnd && hasValidationIcon);

    return css`
      ${StyledInputPresentantion} {
        position: relative;
        width: ${yearInputOrError ? "78px;" : "58px;"};
        text-align: center;

        :first-of-type {
        border-top-left-radius: var(--borderRadius100);
        border-bottom-left-radius: var(--borderRadius100);
        }
  
        :last-of-type {
        border-top-right-radius: var(--borderRadius100);
        border-bottom-right-radius: var(--borderRadius100);
        }
        

        ${
          (isMiddle || isEnd) &&
          css`
            margin-left: -1px;
          `
        }

        ${StyledIconSpan} {
          width: 32px;
          z-index: 999;
        }

        ${StyledValidationIcon} {
          z-index: 9000;
        }
      `;
  }}
`;
