import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { userEvent, within } from "@storybook/testing-library";
import DateInput, { DateChangeEvent } from "./date.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
} from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "Date Input/Test",
  component: DateInput,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: commonTextboxArgTypes(),
};

export const DateStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <DateInput
      name="dateinput"
      value={state}
      onChange={setValue}
      onBlur={(ev) => {
        action("onBlur")(ev.target.value);
      }}
      onKeyDown={(ev) =>
        action("onKeyDown")((ev.target as HTMLInputElement).value)
      }
      onClick={(ev) => action("onClick")((ev.target as HTMLInputElement).value)}
      {...getCommonTextboxArgsWithSpecialCaracters(args)}
    />
  );
};

DateStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

export const NewValidationStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("2019-04-04");
  const setValue = (ev: DateChangeEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.formattedValue);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <DateInput
        name="dateinput"
        m={2}
        value={state}
        onChange={setValue}
        onBlur={(ev) => {
          action("onBlur")(ev.target.value);
        }}
        onKeyDown={(ev) =>
          action("onKeyDown")((ev.target as HTMLInputElement).value)
        }
        onClick={(ev) =>
          action("onClick")((ev.target as HTMLInputElement).value)
        }
        {...getCommonTextboxArgsWithSpecialCaracters(args)}
      />
    </CarbonProvider>
  );
};

NewValidationStory.args = {
  minDate: "",
  maxDate: "",
  allowEmptyValue: false,
  mt: 0,
  ...getCommonTextboxArgs(),
};

// Storybook Play Function Stories
export const DateClickStory = {
  render: () => {
    // Render component as a function that returns the component
    const RenderComponent = () => {
      const [state, setState] = useState("2019-04-04");
      const setValue = (ev: DateChangeEvent) => {
        action("onChange")(ev.target.value);
        setState(ev.target.value.formattedValue);
      };

      return (
        <DateInput
          name="dateinput"
          label="Label"
          value={state}
          onChange={setValue}
          onBlur={(ev) => {
            action("onBlur")(ev.target.value);
          }}
          onKeyDown={(ev) =>
            action("onKeyDown")((ev.target as HTMLInputElement).value)
          }
          onClick={(ev) =>
            action("onClick")((ev.target as HTMLInputElement).value)
          }
        />
      );
    };

    return <RenderComponent />;
  },
  // Defines the play function and interactions
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const textboxInput = canvas.getByLabelText("Label");
    await userEvent.click(textboxInput);
    const nextMonthButton = canvas.getByLabelText("Next month", {
      selector: "button",
    });
    await userEvent.click(nextMonthButton);
  },
};
