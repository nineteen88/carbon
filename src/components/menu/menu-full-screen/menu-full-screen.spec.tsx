import React, { useState, useEffect } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render as rtlRender, screen } from "@testing-library/react";

import { MenuItem } from "..";
import MenuFullscreen, { MenuFullscreenProps } from ".";
import MenuDivider from "../menu-divider/menu-divider.component";
import MenuContext, { MenuType } from "../menu.context";
import StyledIcon from "../../icon/icon.style";
import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
  StyledMenuModal,
} from "./menu-full-screen.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import Search from "../../search";
import StyledSearch from "../../search/search.style";
import StyledSearchButton from "../../search/search-button.style";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import CarbonProvider from "../../carbon-provider";
import { baseTheme, sageTheme } from "../../../style/themes";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import { StyledSubmenu } from "../__internal__/submenu/submenu.style";

const render = (ui: React.ReactElement, menuType: MenuType = "light") => {
  return mount(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType,
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        {ui}
      </MenuContext.Provider>
    </CarbonProvider>
  );
};

const TestMenu = ({ isOpen }: Pick<MenuFullscreenProps, "isOpen">) => (
  <MenuFullscreen
    isOpen={isOpen}
    onClose={() => {}}
    data-element="bar"
    data-role="baz"
  >
    <MenuItem maxWidth="200px" href="#">
      Menu Item One
    </MenuItem>
    <MenuItem maxWidth="200px" onClick={() => {}} submenu="Menu Item Two">
      <MenuItem maxWidth="200px" href="#">
        Submenu Item One
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Submenu Item Two
      </MenuItem>
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Three
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Four
    </MenuItem>
    <MenuItem maxWidth="200px" submenu="Menu Item Five">
      <MenuItem maxWidth="200px" href="#">
        Submenu Item One
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Submenu Item Two
      </MenuItem>
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Six
    </MenuItem>
  </MenuFullscreen>
);

const MockMenuWithSearch = ({
  isOpen,
  focusInput,
}: {
  isOpen?: boolean;
  focusInput?: boolean;
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (focusInput && ref.current) {
      (ref.current as HTMLInputElement).focus();
    }
  }, [focusInput]);

  return (
    <MenuFullscreen isOpen={isOpen} onClose={() => {}}>
      <MenuItem maxWidth="200px">
        <Search value="" ref={ref} defaultValue="" searchButton />
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Menu Item One
      </MenuItem>
    </MenuFullscreen>
  );
};

const MockMenuWithFalsyValues = ({ isOpen }: { isOpen?: boolean }) => (
  <MenuFullscreen isOpen={isOpen} onClose={() => {}}>
    <MenuItem maxWidth="200px">Submenu Item One</MenuItem>
    {false && <MenuItem href="#">Product Item One</MenuItem>}
  </MenuFullscreen>
);

const UpdatingSubmenu = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 2 ? prev : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <MenuItem submenu={`submenu 2 - count ${counter}`}>
      <MenuItem>Item One </MenuItem>
      <MenuItem>Item Two </MenuItem>
    </MenuItem>
  );
};

const MockFullScreenMenuWithUpdatingItems = () => {
  const [extraItem, setExtraItem] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExtraItem(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <MenuFullscreen onClose={() => {}} isOpen>
      {extraItem ? (
        <MenuItem submenu="extra submenu">
          <MenuItem>Item One </MenuItem>
          <MenuItem>Item Two </MenuItem>
        </MenuItem>
      ) : null}
      <MenuItem submenu="submenu 1">
        <MenuItem>Item One </MenuItem>
        <MenuItem>Item Two </MenuItem>
      </MenuItem>
      <UpdatingSubmenu />
    </MenuFullscreen>
  );
};

describe("MenuFullscreen", () => {
  afterEach(() => {
    // manually clean up DOM due to use of React portals
    window.document.body.innerHTML = "";
  });

  it("by default, menu's root container should not exist", () => {
    rtlRender(
      <MenuFullscreen onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("root container has correct component, element and role data tags when menu is open", () => {
    rtlRender(<TestMenu isOpen />);
    const menu = screen.getByRole("dialog");

    expect(menu).toHaveAttribute("data-component", "menu-fullscreen");
    expect(menu).toHaveAttribute("data-element", "bar");
    expect(menu).toHaveAttribute("data-role", "baz");
  });

  it("root container has correct ARIA properties when menu is open", () => {
    rtlRender(
      <CarbonProvider validationRedesignOptIn theme={sageTheme}>
        <MenuFullscreen isOpen onClose={() => {}} aria-label="My menu" />
      </CarbonProvider>
    );
    const menu = screen.getByRole("dialog");

    expect(menu).toHaveAttribute("role", "dialog");
    expect(menu).toHaveAttribute("aria-modal", "true");
  });

  it("should render children correctly", () => {
    const wrapper = render(<TestMenu isOpen />);
    expect(wrapper.find(MenuItem).length).toEqual(10);
    expect(wrapper.find(MenuDivider).length).toEqual(5);
  });

  it("should set any maxWidth values passed to items to undefined", () => {
    const wrapper = render(<TestMenu isOpen />);
    const items = wrapper.find(StyledMenuItem);
    items.forEach((item) => {
      assertStyleMatch(
        {
          maxWidth: undefined,
        },
        item
      );
    });
  });

  describe("styling", () => {
    it.each<MenuType>(["light", "white", "dark", "black"])(
      "matches the expected as default",
      (menuType) => {
        const wrapper = render(<TestMenu isOpen />, menuType);
        assertStyleMatch(
          {
            position: "fixed",
            top: "0",
            bottom: "0",
            zIndex: `${baseTheme.zIndex.fullScreenModal}`,
          },
          wrapper.find(StyledMenuFullscreen)
        );

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].background,
          },
          wrapper.find(StyledMenuModal)
        );

        ["a", "button", "div"].forEach((el) => {
          assertStyleMatch(
            {
              fontSize: "16px",
            },
            wrapper.find(StyledMenuModal),
            { modifier: el }
          );
        });

        assertStyleMatch(
          {
            position: "absolute",
            zIndex: "1",
            right: "16px",
            top: "8px",
          },
          wrapper.find(StyledMenuFullscreenHeader),
          { modifier: `${StyledIconButton}` }
        );

        assertStyleMatch(
          {
            paddingTop: "var(--spacing200)",
            paddingBottom: "var(--spacing200)",
          },
          wrapper.find(StyledMenuItem)
        );
      }
    );

    describe.each<MenuType>(["light", "white", "dark", "black"])(
      "applies the expected styling when `menuType` is %s",
      (menuType) => {
        it("renders a correct item background", () => {
          const wrapper = render(<TestMenu isOpen />, menuType);
          assertStyleMatch(
            {
              backgroundColor:
                menuConfigVariants[menuType].submenuItemBackground,
            },
            wrapper.find(StyledMenuFullscreenHeader)
          );
        });

        it("renders a correct icon color", () => {
          const wrapper = render(<TestMenu isOpen />, menuType);
          const iconColors = {
            light: "var(--colorsYin090)",
            dark: "var(--colorsYang100)",
            white: "var(--colorsYin090)",
            black: "var(--colorsYang100)",
          };

          assertStyleMatch(
            {
              color: iconColors[menuType],
            },
            wrapper.find(StyledIcon)
          );
        });
      }
    );

    describe("menu item padding", () => {
      testStyledSystemPadding(
        (props) => (
          <MenuContext.Provider
            value={{
              menuType: "light",
              openSubmenuId: null,
              inFullscreenView: true,
              inMenu: true,
              setOpenSubmenuId: () => {},
            }}
          >
            <MenuItem {...props}>Foo</MenuItem>
          </MenuContext.Provider>
        ),
        { pt: "10px", pb: "10px" },
        (component) => component.find(StyledMenuItem)
      );
    });

    describe("submenu item padding", () => {
      testStyledSystemPadding(
        (props) => (
          <MenuContext.Provider
            value={{
              menuType: "light",
              openSubmenuId: null,
              inFullscreenView: true,
              inMenu: true,
              setOpenSubmenuId: () => {},
            }}
          >
            <MenuItem submenu="foo">
              <MenuItem {...props} href="#">
                bar
              </MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        ),
        undefined,
        (component) => component.find(StyledSubmenu).find(StyledMenuItem)
      );
    });
  });

  describe("onClose", () => {
    it("calls the onClose callback when close icon button is clicked", () => {
      const onClose = jest.fn();
      const wrapper = render(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      );
      wrapper.find("button[aria-label='Close']").simulate("click");
      expect(onClose).toHaveBeenCalled();
    });

    it("calls the onClose callback when escape key pressed", () => {
      const onClose = jest.fn();
      render(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      );
      act(() => {
        document.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
          })
        );
      });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("onClick", () => {
    it("calls the onClick callback when menu item is clicked", () => {
      const onClick = jest.fn();
      const wrapper = render(
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem onClick={onClick}>Menu Item One</MenuItem>
        </MenuFullscreen>
      );
      const menuItem = wrapper.find(MenuItem).find("button");
      menuItem.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("focus behaviour", () => {
    it("when menu is opened, its root container is focused", () => {
      rtlRender(<TestMenu isOpen />);
      expect(screen.getByRole("dialog")).toBeFocused();
    });

    describe("when pressing tab key without shift", () => {
      it("does not prevent the browser default behaviour when no Search input with searchButton and no value is rendered", () => {
        const preventDefault = jest.fn();
        const wrapper = render(<TestMenu isOpen />);

        wrapper.find(StyledMenuModal).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        wrapper.find(StyledMenuModal).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).not.toHaveBeenCalled();
        wrapper.find(StyledMenuModal).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).not.toHaveBeenCalled();
      });

      it("prevents the browser default behaviour when Search input with searchButton and no value rendered", () => {
        const preventDefault = jest.fn();
        const wrapper = render(<MockMenuWithSearch isOpen focusInput />);

        expect(wrapper.find(StyledSearch).find("input")).toBeFocused();
        expect(wrapper.find(StyledSearchButton).exists()).toBe(true);
        wrapper.find(StyledMenuModal).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).toHaveBeenCalled();
        expect(wrapper.find(StyledMenuItem).last().find("a")).toBeFocused();
      });
    });
  });

  describe("when clicking outside a submenu", () => {
    it("the app does not crash", () => {
      const wrapper = mount(<TestMenu isOpen />);

      const clickOutsideSubmenu = () =>
        act(() => {
          wrapper
            .find(StyledMenuItem)
            .at(0)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

      expect(clickOutsideSubmenu).not.toThrow();
    });
  });

  describe("Menu Divider", () => {
    it("should not render a divider when menu contains a falsy values", () => {
      const wrapper = render(<MockMenuWithFalsyValues isOpen />);
      expect(wrapper.find(MenuDivider).exists()).toBe(false);
    });
  });

  describe("keys of children", () => {
    it("should maintain the state of any child items if items are added or removed", () => {
      jest.useFakeTimers();
      const wrapper = render(<MockFullScreenMenuWithUpdatingItems />);

      act(() => {
        jest.advanceTimersByTime(5000);
      });
      wrapper.update();

      expect(wrapper.find(MenuItem).at(6).getDOMNode().textContent).toContain(
        "count 2"
      );
      jest.useRealTimers();
    });
  });
});
