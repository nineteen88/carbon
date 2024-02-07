import React from "react";
import styled from "styled-components";
import { MarginProps } from "styled-system";
import Box from "../../box";

export interface RequiredIndicatorProps extends MarginProps {
  children: React.ReactNode;
}

const StyledIndicatorContainer = styled(Box)`
  ::after {
    content: "*";
    color: var(--colorsSemanticNegative500);
    font-weight: 700;
    margin-left: var(--spacing050);
  }
`;

export default ({ children, ...rest }: RequiredIndicatorProps) => (
  <StyledIndicatorContainer {...rest}>{children}</StyledIndicatorContainer>
);
