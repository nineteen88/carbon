import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import { Checkbox, CheckboxGroup } from ".";

export const Default: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Example checkbox"
      name="checkbox-default"
      required
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const Sizes: ComponentStory<typeof Checkbox> = () => (
  <>
    <Checkbox
      label="Small"
      key="checkbox-small"
      name="checkbox-small"
      size="small"
    />
    <Checkbox
      label="Large"
      key="checkbox-large"
      name="checkbox-large"
      size="large"
    />
  </>
);

export const Disabled: ComponentStory<typeof Checkbox> = () => (
  <Checkbox disabled label="Disabled checkbox" name="checkbox-disabled" />
);

export const Reversed: ComponentStory<typeof Checkbox> = () => (
  <Checkbox label="Reversed checkbox" name="checkbox-reverse" reverse />
);

export const WithFieldHelp: ComponentStory<typeof Checkbox> = () => (
  <>
    <Checkbox
      fieldHelp="This text provides help for the input."
      label="With fieldHelp"
      key="checkbox-fieldhelp"
      name="checkbox-fieldhelp"
    />
    <Checkbox
      fieldHelp="This text provides help for the input."
      fieldHelpInline
      label="With inline fieldHelp"
      key="checkbox-fieldhelp-inline"
      name="checkbox-fieldhelp-inline"
    />
  </>
);

export const WithLabelHelp: ComponentStory<typeof Checkbox> = () => (
  <Checkbox
    helpAriaLabel="This text provides more information for the label."
    label="With labelHelp"
    labelHelp="This text provides more information for the label."
    name="checkbox-labelHelp"
  />
);

export const WithCustomLabelWidth: ComponentStory<typeof Checkbox> = () => (
  <Checkbox
    label="With custom labelWidth"
    labelWidth={100}
    name="checkbox-custom-label"
  />
);

export const CheckboxGroupStory: ComponentStory<typeof Checkbox> = () => (
  <CheckboxGroup required legend="Checkbox Group">
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-${label}`}
        key={`checkbox-group-${label}`}
        name={`checkbox-group-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);

export const CheckboxGroupWithInlineLegend: ComponentStory<
  typeof Checkbox
> = () => (
  <CheckboxGroup
    legend="Checkbox Group"
    legendSpacing={2}
    legendWidth={10}
    legendInline
  >
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-${label}`}
        key={`checkbox-group-${label}`}
        name={`checkbox-group-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);

export const Required: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox"
      name="checkbox-required"
      required
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const CheckboxGroupRequired: ComponentStory<typeof Checkbox> = () => (
  <CheckboxGroup required legend="Checkbox Group">
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-required-${label}`}
        key={`checkbox-group-required-${label}`}
        name={`checkbox-group-required-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);

export const IsOptional: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      label="Checkbox"
      name="checkbox-is-optional"
      isOptional
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export const CheckboxGroupIsOptional: ComponentStory<typeof Checkbox> = () => (
  <CheckboxGroup isOptional legend="Checkbox Group">
    {["One", "Two", "Three"].map((label) => (
      <Checkbox
        id={`checkbox-group-is-optional-${label}`}
        key={`checkbox-group-is-optional-${label}`}
        name={`checkbox-group-is-optional-${label}`}
        label={label}
      />
    ))}
  </CheckboxGroup>
);
