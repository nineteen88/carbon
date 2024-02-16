import React, { useRef } from "react";
import Event from "../../../__internal__/utils/helpers/events";
import Typography from "../../typography";
import Icon from "../../icon";
import { StyledSort, StyledSpaceHolder } from "./sort.style";
import guid from "../../../__internal__/utils/helpers/guid";
import useLocale from "../../../hooks/__internal__/useLocale";

export interface SortProps {
  /** if `asc` it will show `sort_up` icon, if `desc` it will show `sort_down` */
  sortType?: "ascending" | "descending" | false;
  /** Callback fired when the `FlatTableSortHeader` is clicked */
  onClick?: () => void;
  /** Sets the content of `FlatTableSortHeader` */
  children?: React.ReactNode;
  /**
   * Creates an accessible name for `FlatTableSortHeader`, it is recommended that the
   * text content of the `FlatTableSortHeader` as well as the current `sortType` are included
   * in this accessible name
   */
  accessibleName?: string;
}

const Sort = ({ children, onClick, sortType, accessibleName }: SortProps) => {
  const id = useRef(guid());
  const locale = useLocale();

  const verifiedChild = typeof children === "string" ? children : undefined;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (Event.isEnterOrSpaceKey(e)) {
      e.preventDefault();
      return onClick?.();
    }

    return null;
  };

  return (
    <>
      <Typography variant="span" id={id.current} screenReaderOnly>
        {accessibleName || locale.sort.accessibleName(verifiedChild, sortType)}
      </Typography>
      <StyledSort
        role="button"
        onKeyDown={onKeyDown}
        tabIndex={0}
        onClick={onClick}
        sortType={sortType}
        aria-labelledby={id.current}
      >
        {children}
        {sortType && (
          <Icon
            type={sortType === "ascending" ? "sort_up" : "sort_down"}
            color="--colorsUtilityMajor200"
          />
        )}
      </StyledSort>
      {!sortType && <StyledSpaceHolder />}
    </>
  );
};

export default Sort;
