import React from "react";
import { TextareaComponent } from "./textarea-test.stories";
import Box from "../box";
import * as stories from "./textarea.stories";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import {
  verifyRequiredAsteriskForLabel,
  checkGoldenOutline,
  useJQueryCssValueAndAssert,
} from "../../../cypress/support/component-helper/common-steps";

import {
  getDataElementByValue,
  tooltipPreview,
  commonInputCharacterLimit,
  body,
  getComponent,
  cyRoot,
  fieldHelpPreview,
  getElement,
} from "../../../cypress/locators";
import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../cypress/support/component-helper/constants";

import { textarea, textareaChildren } from "../../../cypress/locators/textarea";

import { keyCode } from "../../../cypress/support/helper";
import { ICON } from "../../../cypress/locators/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

context("Tests for Textarea component", () => {
  describe("check props for Textarea component", () => {
    it("should render Textarea with data-component prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-component={CHARACTERS.STANDARD} />
      );

      getComponent(CHARACTERS.STANDARD).should("be.visible");
    });

    it("should render Textarea with data-element prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-element={CHARACTERS.STANDARD} />
      );
      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-element", CHARACTERS.STANDARD);
    });

    it("should render Textarea with data-role prop", () => {
      CypressMountWithProviders(
        <TextareaComponent data-role={CHARACTERS.STANDARD} />
      );

      cyRoot()
        .children()
        .children()
        .should("have.attr", "data-role", CHARACTERS.STANDARD);
    });

    it("should render Textarea with id prop", () => {
      CypressMountWithProviders(<TextareaComponent id={CHARACTERS.STANDARD} />);

      textareaChildren().should("have.attr", "id", CHARACTERS.STANDARD);
    });

    it.each(testData)(
      "should render Textarea with label prop set to %s",
      (label) => {
        CypressMountWithProviders(<TextareaComponent label={label} />);

        getDataElementByValue("label").should("have.text", label);
      }
    );

    it("should render Textarea with labelInline prop", () => {
      CypressMountWithProviders(<TextareaComponent labelInline />);

      getDataElementByValue("label")
        .parent()
        .should("have.css", "justify-content", "flex-end");
    });

    it.each([
      ["left", "start"],
      ["right", "end"],
    ])(
      "should render Textarea with labelAlign prop set to %s",
      (labelAlign, cssValue) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelAlign={labelAlign} />
        );

        getDataElementByValue("label")
          .parent()
          .should(($element) =>
            expect($element).to.have.css("justify-content", `flex-${cssValue}`)
          );
      }
    );

    it.each(testData)(
      "should render Textarea with labelHelp prop set to %s",
      (labelHelp) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelHelp={labelHelp} />
        );

        getDataElementByValue("question").trigger("mouseover");
        tooltipPreview().should("have.text", labelHelp);
      }
    );

    it.each([
      [1, "8px"],
      [2, "16px"],
    ])(
      "should render Textarea with labelSpacing prop set to %s",
      (spacing, padding) => {
        CypressMountWithProviders(
          <TextareaComponent labelInline labelSpacing={spacing} />
        );

        getDataElementByValue("label")
          .parent()
          .should("have.css", "padding-right", padding);
      }
    );

    it.each([
      ["10", "90", 135, 1229],
      ["30", "70", 409, 956],
      ["80", "20", 1092, 273],
    ])(
      "should use %s as labelWidth, %s as inputWidth and render it with correct label and input width ratios",
      (label, input, labelRatio, inputRatio) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelWidth={label}
            inputWidth={input}
          />
        );

        getDataElementByValue("label")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", labelRatio);
          });

        getDataElementByValue("input")
          .parent()
          .then(($el) => {
            useJQueryCssValueAndAssert($el, "width", inputRatio);
          });
      }
    );

    it("should render Textarea with required prop", () => {
      CypressMountWithProviders(<TextareaComponent required />);

      verifyRequiredAsteriskForLabel();
    });

    it.each([
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ])(
      "should input %s characters and warn if over character limit of %s in Textarea",
      (charactersUsed, limit, color) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <TextareaComponent
            enforceCharacterLimit={false}
            characterLimit={limit}
          />
        );

        textareaChildren()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit()
              .should(
                "have.text",
                `${
                  charactersUsed - limit
                    ? `You have ${
                        charactersUsed - limit
                      } ${overCharacters} too many`
                    : `You have ${
                        charactersUsed - limit
                      } ${underCharacters} remaining`
                }`
              )
              .and("have.css", "color", color);
          });
      }
    );

    it.each([
      ["foo", "exist"],
      ["", "not.exist"],
    ])(
      "input hint should be conditionally rendered",
      (inputHint, renderStatus) => {
        CypressMountWithProviders(
          <TextareaComponent
            enforceCharacterLimit={false}
            inputHint={inputHint}
          />
        );

        getDataElementByValue("input-hint").should(renderStatus);
      }
    );

    it.each([
      [4, "exist"],
      ["", "not.exist"],
    ])(
      "character counter hint should be conditionally rendered",
      (characterLimit, renderStatus) => {
        CypressMountWithProviders(
          <TextareaComponent
            enforceCharacterLimit={false}
            characterLimit={characterLimit}
          />
        );

        getDataElementByValue("input-hint").should(renderStatus);
      }
    );

    it.each(["10%", "30%", "50%", "80%", "100%"])(
      "should check maxWidth as %s for TextArea component",
      (maxWidth) => {
        CypressMountWithProviders(<TextareaComponent maxWidth={maxWidth} />);

        getDataElementByValue("input")
          .parent()
          .parent()
          .should("have.css", "max-width", maxWidth);
      }
    );

    it("when maxWidth has no value it should render as 100%", () => {
      CypressMountWithProviders(<TextareaComponent maxWidth="" />);

      getDataElementByValue("input")
        .parent()
        .parent()
        .should("have.css", "max-width", "100%");
    });

    it.each([
      [11, 11],
      [10, 10],
    ])(
      "should input %s characters and enforce character limit of %s in Textarea",
      (charactersUsed, limit) => {
        const inputValue = "12345678901";
        const underCharacters =
          limit - charactersUsed === 1 ? "character" : "characters";
        const overCharacters =
          charactersUsed - limit === 1 ? "character" : "characters";

        CypressMountWithProviders(
          <TextareaComponent enforceCharacterLimit characterLimit={limit} />
        );

        textareaChildren()
          .type(inputValue)
          .then(() => {
            commonInputCharacterLimit().should(
              "have.text",
              `${
                charactersUsed - limit
                  ? `You have ${
                      limit - charactersUsed
                    } ${underCharacters} too many`
                  : `You have ${
                      charactersUsed - limit
                    } ${overCharacters} remaining`
              }`
            );
          });
      }
    );

    it("should render Textarea with name prop", () => {
      CypressMountWithProviders(
        <TextareaComponent name={CHARACTERS.STANDARD} />
      );

      textareaChildren().should("have.attr", "name", CHARACTERS.STANDARD);
    });

    it("should render Textarea with disabled prop", () => {
      CypressMountWithProviders(<TextareaComponent disabled />);

      textareaChildren().should("be.disabled").and("have.attr", "disabled");
    });

    it.each(testData)(
      "should render Textarea with placeholder prop set to %s",
      (placeholder) => {
        CypressMountWithProviders(
          <TextareaComponent placeholder={placeholder} />
        );

        textareaChildren().should("have.attr", "placeholder", placeholder);
      }
    );

    it("should render Textarea with autoFocus prop", () => {
      CypressMountWithProviders(<TextareaComponent autoFocus />);

      body().tab();
      textareaChildren()
        .should("be.focused")
        .then(($el) => {
          checkGoldenOutline($el.parent());
        });
    });

    it("should render Textarea with readOnly prop", () => {
      CypressMountWithProviders(<TextareaComponent readOnly />);

      textareaChildren().and("have.attr", "readOnly");
    });

    it.each(["error", "warning", "info"])(
      "should verify Textarea is displayed with %s validation icon on input",
      (type) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            {...{ [type]: "Message" }}
          />
        );

        textarea().find(ICON).should("have.attr", "data-element", type);
      }
    );

    it.each(["error", "warning", "info"])(
      "should verify Textarea is displayed with %s validation icon on label",
      (type) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            validationOnLabel
            {...{ [type]: "Message" }}
          />
        );

        getDataElementByValue("label")
          .parent()
          .find(ICON)
          .should("have.attr", "data-element", type);
      }
    );

    it.each([
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ])(
      "should verify Textarea input border colour is %s when validation is %s and boolean prop is %s",
      (borderColor, type, bool) => {
        CypressMountWithProviders(
          <TextareaComponent
            labelInline
            labelAlign="right"
            {...{ [type]: bool }}
          />
        );

        textarea().should("have.css", "border-bottom-color", borderColor);
      }
    );

    it.each([
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ])(
      "should use %s as size and render Textarea with %s as height",
      (size, height) => {
        CypressMountWithProviders(<TextareaComponent size={size} />);

        textarea().should("have.css", "min-height", height);
      }
    );

    it.each([
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ])(
      "should check Textarea label alignment is %s with adaptiveLabelBreakpoint %s and viewport 400",
      (displayValue, breakpoint) => {
        cy.viewport(400, 300);

        CypressMountWithProviders(
          <TextareaComponent adaptiveLabelBreakpoint={breakpoint} />
        );

        getDataElementByValue("label")
          .parent()
          .parent()
          .should("have.css", "display", displayValue);
      }
    );

    it.each(testData)(
      "should render Textarea with fieldHelp prop set to %s",
      (fieldHelp) => {
        CypressMountWithProviders(<TextareaComponent fieldHelp={fieldHelp} />);

        fieldHelpPreview().should("have.text", fieldHelp);
      }
    );

    it.each(["add", "filter", "play"])(
      "should render Textarea with inputIcon prop set to %s",
      (icon) => {
        CypressMountWithProviders(<TextareaComponent inputIcon={icon} />);

        getElement(icon).and("be.visible");
      }
    );

    it.each(["top", "bottom", "left", "right"])(
      "should render Textarea component with tooltip positioned to the %s",
      (position) => {
        CypressMountWithProviders(
          <Box m="250px">
            <TextareaComponent
              error={CHARACTERS.STANDARD}
              tooltipPosition={position}
            />
          </Box>
        );
        getDataElementByValue("error").trigger("mouseover");
        tooltipPreview()
          .should("have.text", CHARACTERS.STANDARD)
          .should("have.attr", "data-placement", position);
      }
    );

    it("should render Textarea with helpAriaLabel prop", () => {
      CypressMountWithProviders(
        <TextareaComponent
          labelHelp="field help"
          helpAriaLabel={CHARACTERS.STANDARD}
        />
      );

      getComponent("help").should(
        "have.attr",
        "aria-label",
        CHARACTERS.STANDARD
      );
    });

    it.each(["left", "right"])(
      "should render Textarea with align prop set to %s",
      (align) => {
        CypressMountWithProviders(<TextareaComponent align={align} />);

        textareaChildren().should("have.css", "text-align", align);
      }
    );

    it.each(testData)(
      "should input into Textarea and verify the value",
      (input) => {
        CypressMountWithProviders(<TextareaComponent />);

        textareaChildren().type(input).should("have.text", input);
      }
    );

    it.each(testData)(
      "should render Textarea with value prop set to %s",
      (value) => {
        CypressMountWithProviders(<TextareaComponent value={value} />);

        textareaChildren().should("have.text", value);
      }
    );

    it.each([5, 25, 100])(
      "should render Textarea with cols prop set to %s",
      (cols) => {
        CypressMountWithProviders(<TextareaComponent cols={cols} />);

        textareaChildren().should("have.attr", "cols", cols);
      }
    );

    it.each([5, 25, 100])(
      "should render Textarea with rows prop set to %s",
      (rows) => {
        CypressMountWithProviders(<TextareaComponent rows={rows} />);

        textareaChildren().should("have.attr", "rows", rows);
      }
    );

    it.each([
      [true, 106],
      [false, 64],
    ])(
      "should verify Textarea is displayed with expandable set to %s",
      (boolean, height) => {
        CypressMountWithProviders(<TextareaComponent expandable={boolean} />);

        textareaChildren()
          .type("t{enter}e{enter}s{enter}t{enter}")
          .wait(50)
          .then(($el) => {
            expect(parseInt($el.css("height"))).to.be.within(
              height - 3,
              height + 3
            );
          });
      }
    );
  });

  describe("check events for Textarea component", () => {
    const inputValue = "1";
    let callback;
    beforeEach(() => {
      callback = cy.stub();
    });

    it("should call onChange callback when a type event is triggered", () => {
      CypressMountWithProviders(<TextareaComponent onChange={callback} />);

      textareaChildren()
        .type(inputValue)
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onBlur callback when a blur event is triggered", () => {
      CypressMountWithProviders(<TextareaComponent onBlur={callback} />);

      textareaChildren()
        .click()
        .blur()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onClick callback when a click event is triggered", () => {
      CypressMountWithProviders(<TextareaComponent onClick={callback} />);

      textareaChildren()
        .click()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onFocus callback when a focus event is triggered", () => {
      CypressMountWithProviders(<TextareaComponent onFocus={callback} />);

      textareaChildren()
        .focus()
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it("should call onMouseDown callback when a mousedown event is triggered", () => {
      CypressMountWithProviders(<TextareaComponent onMouseDown={callback} />);

      textareaChildren()
        .trigger("mousedown")
        .then(() => {
          // eslint-disable-next-line no-unused-expressions
          expect(callback).to.have.been.calledOnce;
        });
    });

    it.each([["Enter"], ["Space"]])(
      "should call onKeyDown callback when %s key is triggered",
      (key) => {
        CypressMountWithProviders(<TextareaComponent onKeyDown={callback} />);

        textareaChildren()
          .focus()
          .trigger("keydown", { ...keyCode(key), force: true })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callback).to.have.been.calledOnce;
          });
      }
    );

    it.each([
      [1000, "1"],
      [5000, "5"],
      [10000, "10"],
    ])(
      "should use %s as deferTimeout and defer onChangeDeferred event for %s seconds",
      (timeout) => {
        const callbackOnChange = cy.stub();
        const callbackOnChangeDeff = cy.stub();

        CypressMountWithProviders(
          <TextareaComponent
            deferTimeout={timeout}
            onChange={callbackOnChange}
            onChangeDeferred={callbackOnChangeDeff}
          />
        );

        cy.clock();

        textareaChildren()
          .type(inputValue)
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChange).to.have.been.calledOnce;
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.not.have.been.called;
          })
          .then(() => {
            cy.tick(timeout);
          })
          .then(() => {
            // eslint-disable-next-line no-unused-expressions
            expect(callbackOnChangeDeff).to.have.been.calledOnce;
          });
      }
    );
  });

  describe("Accessibility tests for Textarea component", () => {
    it("should pass accessibility tests for Textarea default story", () => {
      CypressMountWithProviders(<stories.DefaultStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea AutoFocusStory", () => {
      CypressMountWithProviders(<stories.AutoFocusStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea CharacterLimitStory", () => {
      CypressMountWithProviders(<stories.CharacterLimitStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea CustomWidthStory", () => {
      CypressMountWithProviders(<stories.CustomWidthStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea DisabledStory", () => {
      CypressMountWithProviders(<stories.DisabledStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ExpandableStory", () => {
      CypressMountWithProviders(<stories.ExpandableStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea FieldHelpStory", () => {
      CypressMountWithProviders(<stories.FieldHelpStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelAlignStory", () => {
      CypressMountWithProviders(<stories.LabelAlignStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelHelpStory", () => {
      CypressMountWithProviders(<stories.LabelHelpStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea LabelInlineStory", () => {
      CypressMountWithProviders(<stories.LabelInlineStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea MaxWidthStory", () => {
      CypressMountWithProviders(<stories.MaxWidthStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea NewDesignValidationStory", () => {
      CypressMountWithProviders(<stories.NewDesignValidationStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ReadOnlyStory", () => {
      CypressMountWithProviders(<stories.ReadOnlyStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea RequiredStory", () => {
      CypressMountWithProviders(<stories.RequiredStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea UnenforcedCharacterLimitStory", () => {
      CypressMountWithProviders(<stories.UnenforcedCharacterLimitStory />);

      cy.checkAccessibility();
    });

    it("should pass accessibility tests for Textarea ValidationBooleanStory", () => {
      CypressMountWithProviders(<stories.ValidationBooleanStory />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textarea ValidationLabelPositionStory", () => {
      CypressMountWithProviders(<stories.ValidationLabelPositionStory />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textarea ValidationLabelStory", () => {
      CypressMountWithProviders(<stories.ValidationLabelStory />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textarea ValidationStringPositionStory", () => {
      CypressMountWithProviders(<stories.ValidationStringPositionStory />);

      cy.checkAccessibility();
    });

    // FE-5382
    it.skip("should pass accessibility tests for Textarea ValidationStringStory", () => {
      CypressMountWithProviders(<stories.ValidationStringStory />);

      cy.checkAccessibility();
    });
  });
});
