import { Meta, StoryObj } from "@storybook/react";
import { renderOpen } from "../popover-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["isHidden"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof renderOpen> = {
  title: "Render Open",
  component: renderOpen,
  tags: ["isHidden"],
};

export default meta;
type Story = StoryObj<typeof renderOpen>;

export const Default: Story = {
  args: {},
};
