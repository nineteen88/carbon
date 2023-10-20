import { ArgTypes, Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import TileFooter, { TileFooterProps } from "./tile-footer.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
}) as Partial<ArgTypes<TileFooterProps>>;

const meta: Meta<typeof TileFooter> = {
  title: "Tile Footer",
  component: TileFooter,
  tags: ["isHidden"],
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof TileFooter>;

export const Default: Story = {
  args: {
    children: [],
  },
};
