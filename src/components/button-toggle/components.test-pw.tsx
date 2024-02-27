import React from "react";
import {
  ButtonToggle,
  ButtonToggleGroup,
  ButtonToggleGroupProps,
  ButtonToggleProps,
} from ".";
import Box from "../box";

export const ButtonToggleComponent = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example of an alert",
  ...props
}: ButtonToggleProps) => {
  return (
    <div>
      <ButtonToggle
        name="button-toggle-one"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-two"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Second
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-three"
        onBlur={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Third
      </ButtonToggle>
    </div>
  );
};

export const ButtonToggleGroupComponent = (
  props: Partial<ButtonToggleGroupProps>
) => (
  <Box margin={4} display="flex" flexWrap="nowrap">
    <ButtonToggleGroup
      id="button-toggle-group-id"
      name="button-toggle-group-default"
      label="Grouped example"
      labelHelp="help message"
      helpAriaLabel="Help"
      fieldHelp="field help message"
      onChange={function noRefCheck() {
        ("");
      }}
      {...props}
    >
      <ButtonToggle value="foo" grouped>
        Foo
      </ButtonToggle>
      <ButtonToggle value="bar" grouped>
        Bar
      </ButtonToggle>
      <ButtonToggle value="baz" grouped>
        Baz
      </ButtonToggle>
    </ButtonToggleGroup>
  </Box>
);

export const ButtonToggleGroupNotInBox = (
  props: Partial<ButtonToggleGroupProps>
) => (
  <ButtonToggleGroup
    id="button-toggle-group-id"
    label="Grouped example"
    {...props}
  >
    <ButtonToggle value="foo" grouped>
      Foo
    </ButtonToggle>
    <ButtonToggle value="bar" grouped>
      Bar
    </ButtonToggle>
    <ButtonToggle value="baz" grouped>
      Baz
    </ButtonToggle>
  </ButtonToggleGroup>
);

export const WithOutsideButtons = () => {
  return (
    <>
      <button type="button" id="button-before">
        button before
      </button>
      <ButtonToggleGroup
        id="button-toggle-group"
        name="button-toggle-group"
        label="Button Toggle Group test"
      >
        <ButtonToggle value="foo">Foo</ButtonToggle>
        <ButtonToggle value="bar">Bar</ButtonToggle>
        <ButtonToggle value="baz">Baz</ButtonToggle>
      </ButtonToggleGroup>
      <button type="button" id="button-after">
        button after
      </button>
    </>
  );
};

export const ButtonToggleGroupComponentGroupedChildren = ({ ...props }) => {
  return (
    <div>
      <ButtonToggleGroup
        id="button-toggle-group-default-id"
        name="button-toggle-group-default"
        label="Default example"
        labelHelp="help message"
        helpAriaLabel="Help"
        fieldHelp="field help message"
        onChange={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        <ButtonToggle key="foo" value="foo" grouped>
          Foo
        </ButtonToggle>
        <ButtonToggle key="bar" value="bar" grouped>
          Bar
        </ButtonToggle>
        <ButtonToggle key="baz" value="baz" grouped>
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </div>
  );
};
