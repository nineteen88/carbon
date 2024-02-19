import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleProps } from ".";

export default {
  title: "Button Toggle/Test",
  includeStories: ["DefaultStory", "WithoutGroup"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => {
  const [value, setValue] = useState<string | undefined>("bar");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedButtonValue?: string
  ) {
    setValue(selectedButtonValue);
    action("value set")(selectedButtonValue);
  }
  return (
    <ButtonToggleGroup
      id="button-toggle-group"
      name="button-toggle-group"
      label="Button Toggle Group test"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help mesage"
      onChange={onChangeHandler}
      value={value}
    >
      <ButtonToggle value="foo">Foo</ButtonToggle>
      <ButtonToggle value="bar">Bar</ButtonToggle>
      <ButtonToggle value="baz">Baz</ButtonToggle>
    </ButtonToggleGroup>
  );
};

export const WithoutGroup = (args: Partial<ButtonToggleProps>) => (
  <div>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-1"
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
      {...args}
    >
      Foo
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-2"
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
      {...args}
    >
      Bar
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-3"
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
      {...args}
    >
      Baz
    </ButtonToggle>
  </div>
);

WithoutGroup.storyName = "without group";
