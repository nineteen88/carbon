import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { ButtonToggle, ButtonToggleGroupProps, ButtonToggleProps } from ".";
import {
  ButtonToggleComponent,
  ButtonToggleGroupComponent,
  ButtonToggleGroupNotInBox,
  WithOutsideButtons,
  ButtonToggleGroupComponentGroupedChildren,
} from "./components.test-pw";
import {
  buttonTogglePreview,
  buttonToggleButton,
} from "../../../playwright/components/button-toggle";
import {
  buttonToggleGroup,
  buttonToggleGroupHelp,
  buttonToggleGroupHelpIcon,
} from "../../../playwright/components/button-toggle-group";
import {
  icon,
  getDataElementByValue,
} from "../../../playwright/components/index";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkGoldenOutline,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { HooksConfig } from "../../../playwright";

const characters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const helpAlignment: [string, boolean][] = [
  ["inline", true],
  ["outline", false],
];

const testPropValue = CHARACTERS.STANDARD;

test.describe("Styling tests", () => {
  test(`should have the expected styling when opt out flag is true`, async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<ButtonToggleGroupComponent />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    const toggleButton1 = buttonToggleButton(page).nth(0);
    const toggleButton2 = buttonToggleButton(page).nth(1);
    const toggleButton3 = buttonToggleButton(page).nth(2);

    await toggleButton1.focus();
    await checkGoldenOutline(toggleButton1);
    await toggleButton2.focus();
    await checkGoldenOutline(toggleButton2);
    await toggleButton3.focus();
    await checkGoldenOutline(toggleButton3);
  });

  test(`should have the expected styling when opt out flag is false`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    const toggleButton1 = buttonToggleButton(page).nth(0);
    const toggleButton2 = buttonToggleButton(page).nth(1);
    const toggleButton3 = buttonToggleButton(page).nth(2);

    await toggleButton1.focus();
    await expect(toggleButton1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toggleButton1).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await toggleButton2.focus();
    await expect(toggleButton2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toggleButton2).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    await toggleButton3.focus();
    await expect(toggleButton3).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(toggleButton3).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
  });

  test(`has the expected border-radius styling on a single toggle button`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggle>Foo</ButtonToggle>);

    await expect(buttonToggleButton(page)).toHaveCSS("border-radius", "4px");
  });

  test(`should have the expected border-radius styling when the children have the grouped prop set`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponentGroupedChildren />);

    await expect(buttonToggleButton(page).nth(0)).toHaveCSS(
      "border-radius",
      "4px 0px 0px 4px"
    );
    await expect(buttonToggleButton(page).nth(1)).toHaveCSS(
      "border-radius",
      "0px"
    );
    await expect(buttonToggleButton(page).nth(2)).toHaveCSS(
      "border-radius",
      "0px 4px 4px 0px"
    );
  });

  test(`should have the expected border-radius styling when children do not have grouped prop set`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent />);

    await expect(buttonToggleButton(page).nth(0)).toHaveCSS(
      "border-radius",
      "4px"
    );
    await expect(buttonToggleButton(page).nth(1)).toHaveCSS(
      "border-radius",
      "4px"
    );
    await expect(buttonToggleButton(page).nth(2)).toHaveCSS(
      "border-radius",
      "4px"
    );
  });
});

test.describe("Prop tests", () => {
  test(`should render Button-Toggle with aria-label prop`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent aria-label="cypress-aria" />);

    await expect(buttonToggleButton(page).first()).toHaveAttribute(
      "aria-label",
      "cypress-aria"
    );
  });

  test(`should render Button-Toggle with aria-labelledby prop`, async ({
    mount,
    page,
  }) => {
    await mount(
      <ButtonToggleComponent aria-labelledby={CHARACTERS.STANDARD} />
    );

    await expect(buttonToggleButton(page).first()).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD
    );
  });

  ([
    [true, "true"],
    [false, "false"],
  ] as [ButtonToggleProps["pressed"], string][]).forEach(
    ([state, ariaPressed]) => {
      test(`should check when pressed prop is ${state} that Button-Toggle has aria-pressed attribute ${ariaPressed}`, async ({
        mount,
        page,
      }) => {
        await mount(<ButtonToggleComponent pressed={state} />);

        await expect(buttonToggleButton(page).first()).toHaveAttribute(
          "aria-pressed",
          ariaPressed
        );
      });
    }
  );

  test(`should check when that Button-Toggle has aria-pressed attribute true`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent pressed />);

    await expect(buttonToggleButton(page).first()).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  test(`should render Button-Toggle with data-component prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-component={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator("..")
    ).toHaveAttribute("data-component", CHARACTERS.STANDARD);
  });

  test(`should render Button-Toggle with data-element prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator("..")
    ).toHaveAttribute("data-element", CHARACTERS.STANDARD);
  });

  test(`should render Button-Toggle with data-role prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-role={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator("..")
    ).toHaveAttribute("data-role", CHARACTERS.STANDARD);
  });

  ([
    [SIZE.SMALL, 32],
    [SIZE.MEDIUM, 40],
    [SIZE.LARGE, 48],
  ] as [ButtonToggleProps["size"], number][]).forEach(([size, height]) => {
    test(`should check when prop is ${size} that Button-Toggle height is ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
      );

      const buttonPreview = buttonTogglePreview(page).nth(0);
      await assertCssValueIsApproximately(buttonPreview, "height", height);
    });
  });

  (["add", "share", "tick"] as const).forEach((type) => {
    test(`should check that Button-Toggle has ${type} icon`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
          {" "}
          {type}
        </ButtonToggleComponent>
      );

      await expect(icon(page).nth(0)).toHaveAttribute("type", type);
    });
  });

  ([
    [SIZE.SMALL, "small"],
    [SIZE.MEDIUM, "medium"],
    [SIZE.LARGE, "large"],
  ] as [ButtonToggleProps["buttonIconSize"], string][]).forEach(
    ([iconSize, actualSize]) => {
      test(`should check that Button-Toggle icon size is ${iconSize}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <ButtonToggleComponent buttonIcon="tick" buttonIconSize={iconSize}>
            {" "}
            {iconSize}
          </ButtonToggleComponent>
        );

        const buttonIcon = icon(page).nth(0);
        await expect(buttonIcon).toHaveAttribute("font-size", actualSize);
        await expect(buttonIcon).toHaveAttribute("type", "tick");
      });
    }
  );

  ([
    [true, "-1px"],
    [false, "8px"],
  ] as const).forEach(([state, margin]) => {
    test(`should render Button-Toggle when Grouped prop is ${state} with margin-left value of ${margin}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleComponent grouped={state} />);

      await expect(buttonTogglePreview(page).nth(1)).toHaveCSS(
        "margin-left",
        margin
      );
    });
  });

  [...characters].forEach(([labelText]) => {
    test(`should check Button-Toggle text is ${labelText} when Children prop is set to ${labelText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggle>{labelText}</ButtonToggle>);

      await expect(buttonToggleButton(page)).toHaveText(labelText);
    });
  });

  test(`should render Button-Toggle with Value set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent value={CHARACTERS.STANDARD} />);

    await expect(buttonToggleButton(page).nth(0)).toHaveAttribute(
      "value",
      CHARACTERS.STANDARD
    );
  });
});

test.describe("Event tests", () => {
  test(`should render Button-Toggle disabled`, async ({ mount, page }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        disabled
        onClick={() => {
          callbackCount += 1;
        }}
      />
    );

    await expect(buttonToggleButton(page).nth(0)).toBeDisabled();
    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(0);
  });

  test(`should call onFocus callback when a focus event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />
    );

    const toggleButton = buttonToggleButton(page).nth(0);
    await toggleButton.focus();
    expect(callbackCount).toBe(1);
  });

  test(`should call onBlur callback when a blur event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />
    );

    const toggleButton = buttonToggleButton(page).nth(0);
    await toggleButton.focus();
    await toggleButton.blur();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests for Button-Toggle component", () => {
  test(`should pass accessibility tests for Button-Toggle default story`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Button-Toggle disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent disabled />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Button-Toggle grouped`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent grouped />);

    await checkAccessibility(page);
  });

  ([
    [SIZE.SMALL, 32],
    [SIZE.MEDIUM, 40],
    [SIZE.LARGE, 48],
  ] as [ButtonToggleProps["size"], number][]).forEach(([size]) => {
    test(`should pass accessibility tests for Button-Toggle ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>
      );

      await checkAccessibility(page);
    });
  });

  (["add", "share", "tick"] as ButtonToggleProps["buttonIcon"][]).forEach(
    (type) => {
      test(`should pass accessibility tests for Button-Toggle with ${type} icon`, async ({
        mount,
        page,
      }) => {
        await mount(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>
        );

        await checkAccessibility(page);
      });
    }
  );
});

test.describe("Prop tests for group component", () => {
  test(`should render Button-Toggle-Group with data-component prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-component={testPropValue} />);

    await expect(page.getByRole("group")).toHaveAttribute(
      "data-component",
      testPropValue
    );
  });

  test(`should render Button-Toggle-Group with data-element prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-element={testPropValue} />);

    await expect(buttonToggleGroup(page).nth(0)).toHaveAttribute(
      "data-element",
      testPropValue
    );
  });

  test(`should render Button-Toggle-Group with data-role prop set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-role={testPropValue} />);

    await expect(buttonToggleGroup(page).nth(0)).toHaveAttribute(
      "data-role",
      testPropValue
    );
  });

  [...characters].forEach(([labelText]) => {
    test(`should render Button-Toggle-Group with ${labelText} as label`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent label={labelText} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(labelText);
    });
  });

  test(`should render Button-Toggle-Group with tooltip set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent labelHelp={testPropValue} />);

    const helpIcon = getDataElementByValue(page, "question");
    await helpIcon.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await expect(getDataElementByValue(page, "tooltip")).toHaveText(
      testPropValue
    );
  });

  [...characters].forEach(([fieldHelpText]) => {
    test(`should render Button-Toggle-Group with ${fieldHelpText} as field help text`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent fieldHelp={fieldHelpText} />);

      await expect(buttonToggleGroupHelp(page)).toHaveText(fieldHelpText);
    });
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should render Button-Toggle-Group with field help ${alignment} if fieldHelpInline is %${state}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent
          fieldHelp="fieldHelpText"
          fieldHelpInline={state}
        />
      );

      if (state) {
        await expect(
          getDataElementByValue(page, "help").locator("..").locator("..")
        ).toHaveAttribute("data-component", "button-toggle-group");
      } else {
        await expect(
          getDataElementByValue(page, "help").locator("..")
        ).toHaveAttribute("data-component", "button-toggle-group");
      }
    });
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should render Button-Toggle-Group with label ${alignment} if labelInline is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent labelInline={state} />);

      const labelParent = buttonToggleGroup(page)
        .locator("div")
        .locator("div")
        .nth(0);
      if (state) {
        await expect(labelParent).toHaveCSS("box-sizing", "border-box");
        await expect(labelParent).toHaveCSS("margin-bottom", "0px");
      } else {
        await expect(labelParent).not.toHaveCSS("box-sizing", "border-box");
        await expect(labelParent).toHaveCSS("margin-bottom", "8px");
      }
    });
  });

  test(`should render Button-Toggle-Group with second button toggle pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent pressed />);

    await expect(buttonToggleButton(page).nth(1)).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  ([
    [25, 341],
    [50, 683],
    [100, 1366],
  ] as [ButtonToggleGroupProps["inputWidth"], number][]).forEach(
    ([labelWidth, width]) => {
      test(`should render Button-Toggle-Group with labelWidth prop of ${labelWidth} and width of ${width}`, async ({
        mount,
        page,
      }) => {
        await mount(<ButtonToggleGroupNotInBox inputWidth={labelWidth} />);

        const buttonParent = buttonToggleButton(page)
          .locator("..")
          .locator("..");
        await assertCssValueIsApproximately(buttonParent, "width", width);
      });
    }
  );

  test(`should render Button-Toggle-Group with helpAriaLabel set to playwright_data`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent helpAriaLabel={testPropValue} />);

    await expect(buttonToggleGroupHelpIcon(page)).toHaveAttribute(
      "aria-label",
      testPropValue
    );
  });

  ([
    ["8px", 1],
    ["16px", 2],
  ] as const).forEach(([padding, spacing]) => {
    test(`should render Button-Toggle-Group with padding of ${padding} if labelSpacing prop is ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />
      );

      await expect(
        getDataElementByValue(page, "label").locator("..")
      ).toHaveCSS("padding-right", padding);
    });
  });

  test(`container div should auto flex`, async ({ mount, page }) => {
    await mount(<ButtonToggleGroupComponent fullWidth />);

    await expect(buttonTogglePreview(page).nth(0)).toHaveCSS(
      "flex",
      "1 1 auto"
    );
  });

  // actual width found now 456px - test should be reviewed
  test(`width of label should be 100% / 450px`, async ({ mount, page }) => {
    await mount(<ButtonToggleGroupNotInBox fullWidth />);

    await assertCssValueIsApproximately(
      buttonToggleButton(page).nth(0),
      "width",
      456
    );
  });
});

test.describe("Event tests for group component", () => {
  test(`should call onChange callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleGroupComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />
    );

    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(1);
  });

  test(`should call onChange callback with undefined when a click event is triggered on the currently-selected button and the allowDeselect prop is true`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleGroupComponent
        value="foo"
        allowDeselect
        onChange={() => {
          callbackCount += 1;
        }}
      />
    );

    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(1);
  });

  test(`should only allow the first button to be tabbed to when no buttons are selected`, async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonBefore.focus();
    await page.keyboard.press("Tab");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(buttonAfter).toBeFocused();
  });

  test(`should only allow the first button to be shift-tabbed to when no buttons are selected`, async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonAfter.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonBefore).toBeFocused();
  });

  test(`should only allow the selected button to be tabbed to when it is selected`, async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonTogglePreview(page).nth(1).click();
    await buttonBefore.focus();
    await page.keyboard.press("Tab");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(buttonAfter).toBeFocused();
  });

  test(`should only allow the selected button to be shift-tabbed to when one is selected`, async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonTogglePreview(page).nth(1).click();
    await buttonAfter.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonBefore).toBeFocused();
  });

  test(`should cycle through the buttons in the group when using the right arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonToggleButton(page).nth(0).click();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(2)).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
  });

  test(`should cycle through the buttons in the group, selecting each one, when using the left arrow key`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonToggleButton(page).nth(0).click();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(2)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
  });
});

test.describe("Accessibility tests for group component", () => {
  test(`should pass accessibility tests for Button-Toggle-Group default story`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Button-Toggle-Group with second button toggle checked`, async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonTogglePreview(page).nth(1).click();
    await checkAccessibility(page);
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should pass accessibility tests for Button-Toggle-Group with label ${alignment} if labelInline is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent labelInline={state} />);

      await checkAccessibility(page);
    });
  });

  ([1, 2] as const).forEach((spacing) => {
    test(`should pass accessibility tests for Button-Toggle-Group with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />
      );

      await checkAccessibility(page);
    });
  });
});
