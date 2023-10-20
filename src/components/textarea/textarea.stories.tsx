import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import I18nProvider from "../i18n-provider";

import Textarea, { TextareaProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<TextareaProps>>;

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const DefaultStory: Story = () => {
  const [state, setState] = useState("");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Textarea label="Textarea" value={state} onChange={setValue} />;
};
DefaultStory.storyName = "Default";

export const DisabledStory: Story = () => {
  return <Textarea label="Textarea" disabled />;
};
DisabledStory.storyName = "Disabled";

export const LabelAlignStory: Story = () => {
  return (
    <>
      {(["right", "left"] as const).map((alignment) => (
        <Textarea
          label="Textarea"
          labelInline
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};
LabelAlignStory.storyName = "Label Align";

export const ReadOnlyStory: Story = () => {
  return <Textarea label="Textarea" readOnly />;
};
ReadOnlyStory.storyName = "Read Only";

export const AutoFocusStory: Story = () => {
  return <Textarea label="Textarea" autoFocus />;
};
AutoFocusStory.storyName = "Auto Focus";
AutoFocusStory.parameters = { chromatic: { disableSnapshot: true } };

export const ExpandableStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
    />
  );
};
ExpandableStory.parameters = { chromatic: { disableSnapshot: true } };

export const CharacterLimitStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Textarea"
      inputHint="Hint text (optional)."
      expandable
      value={value}
      onChange={({ target }) => setValue(target.value)}
      characterLimit={50}
    />
  );
};
CharacterLimitStory.storyName = "Character Limit";

export const TranslationsCharacterLimitStory: Story = () => {
  const [value, setValue] = useState("");
  return (
    <I18nProvider
      locale={{
        locale: () => "fr-FR",
        characterCount: {
          tooManyCharacters: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère restant`
              : `${formattedCount} caractères restants`,
          charactersLeft: (count, formattedCount) =>
            count === 1
              ? `${formattedCount} caractère de trop`
              : `${formattedCount} personnages de trop`,
          visuallyHiddenHint: (formattedCount) =>
            `Vous pouvez saisir jusqu'à ${formattedCount} caractères`,
        },
      }}
    >
      <Textarea
        label="Textarea"
        inputHint="Texte de l'indice (facultatif)."
        expandable
        value={value}
        onChange={({ target }) => setValue(target.value)}
        characterLimit={50}
      />
    </I18nProvider>
  );
};
TranslationsCharacterLimitStory.storyName = "Translations Character Limit";

export const LabelInlineStory: Story = () => {
  return <Textarea label="Textarea" labelInline />;
};
LabelInlineStory.storyName = "Label Inline";

export const CustomWidthStory: Story = () => {
  return (
    <Textarea label="Textarea" labelInline labelWidth={50} inputWidth={50} />
  );
};
CustomWidthStory.storyName = "Custom Width";

export const FieldHelpStory: Story = () => {
  return <Textarea label="Textarea" fieldHelp="Help" />;
};
FieldHelpStory.storyName = "Field Help";

export const MaxWidthStory: Story = () => {
  return <Textarea label="Textarea" maxWidth="70%" />;
};
MaxWidthStory.storyName = "Max Width";

export const InputHintStory: Story = () => {
  return <Textarea label="Textarea" inputHint="Hint text (optional)." />;
};
InputHintStory.storyName = "Input Hint";

export const LabelHelpStory: Story = () => {
  return <Textarea label="Textarea" labelHelp="Help" helpAriaLabel="Help" />;
};
LabelHelpStory.storyName = "Label Help";

export const RequiredStory: Story = () => {
  return <Textarea label="Textarea" required />;
};
RequiredStory.storyName = "Required";

export const ValidationStringStory: Story = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};
ValidationStringStory.storyName = "Validations - String - Component";

export const ValidationStringPositionStory: Story = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-component`}>
          <Textarea
            label="Textarea"
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="bottom"
          />
        </Box>
      ))}
    </>
  );
};
ValidationStringPositionStory.storyName =
  "Validations - String - With Tooltip Position Overriden - Component";
ValidationStringPositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ValidationLabelStory: Story = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
          />
          <Textarea
            label="Textarea - readOnly"
            validationOnLabel
            readOnly
            {...{ [validationType]: "Message" }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};
ValidationLabelStory.storyName = "Validations - String - Label";

export const ValidationLabelPositionStory: Story = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-string-label`}>
          <Textarea
            label="Textarea"
            validationOnLabel
            {...{ [validationType]: "Message" }}
            mb={2}
            tooltipPosition="top"
          />
        </Box>
      ))}
    </>
  );
};
ValidationLabelPositionStory.storyName =
  "Validations - String - With Tooltip Position Overriden - Label";
ValidationLabelPositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const NewDesignValidationStory: Story = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      {["error", "warning"].map((validationType) => (
        <Box width={296} key={`${validationType}-string-component`}>
          <Textarea
            label={`${validationType}`}
            inputHint="Hint text (optional)."
            {...{ [validationType]: "Message" }}
            m={4}
          />
          <Textarea
            label={`readOnly - ${validationType}`}
            inputHint="Hint text (optional)."
            readOnly
            {...{ [validationType]: "Message" }}
            m={4}
          />
        </Box>
      ))}
    </CarbonProvider>
  );
};
NewDesignValidationStory.storyName = "Validations - String - New Design";

export const ValidationBooleanStory: Story = () => {
  return (
    <>
      {["error", "warning", "info"].map((validationType) => (
        <Box key={`${validationType}-boolean-component`}>
          <Textarea label="Textarea" {...{ [validationType]: true }} mb={2} />
          <Textarea
            label="Textarea - readOnly"
            readOnly
            {...{ [validationType]: true }}
            mb={2}
          />
        </Box>
      ))}
    </>
  );
};
ValidationBooleanStory.storyName = "Validations - Boolean";
