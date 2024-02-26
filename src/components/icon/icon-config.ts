import { TooltipPositions } from "../tooltip/tooltip.config";
import { IconType } from "./icon-type";
import { BackgroundShape, BgSize, FontSize } from "./icon.style";

const dlsConfig = {
  backgroundSize: {
    "extra-small": "16px",
    small: "24px",
    medium: "32px",
    large: "40px",
    "extra-large": "56px",
  },
  backgroundShape: {
    square: "0%",
    "rounded-rect": "20%",
    circle: "50%",
  },
  iconSize: {
    small: "var(--sizing250)",
    medium: "var(--sizing300)",
    large: "var(--sizing400)",
    "extra-large": "var(--sizing600)",
  },
};

export const ICON_TOOLTIP_POSITIONS: TooltipPositions[] = [
  "bottom",
  "left",
  "right",
  "top",
];
export const ICON_SHAPES: BackgroundShape[] = [
  "circle",
  "rounded-rect",
  "square",
];
export const ICON_SIZES: BgSize[] = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
];
export const ICON_FONT_SIZES: FontSize[] = [
  "small",
  "medium",
  "large",
  "extra-large",
];
export const ICONS: IconType[] = [
  "accessibility_web",
  "add",
  "admin",
  "alert",
  "alert_on",
  "analysis",
  "app_facebook",
  "app_instagram",
  "app_tiktok",
  "app_twitter",
  "app_youtube",
  "apps",
  "arrow",
  "arrow_bottom_right_circle",
  "arrow_down",
  "arrow_left",
  "arrow_left_boxed",
  "arrow_left_right_small",
  "arrow_left_small",
  "arrow_right",
  "arrow_right_small",
  "arrow_top_left_circle",
  "arrow_up",
  "arrows_left_right",
  "attach",
  "bank",
  "bank_with_card",
  "basket",
  "basket_with_squares",
  "bed",
  "bill_paid",
  "bill_unpaid",
  "bin",
  "blocked",
  "blocked_square",
  "block_arrow_right",
  "bold",
  "box_arrow_left",
  "box_arrow_right",
  "boxed_shapes",
  "bulk_destroy",
  "bullet_list",
  "bullet_list_dotted",
  "bullet_list_numbers",
  "business",
  "calendar",
  "calendar_today",
  "call",
  "calendar_pay_date",
  "camera",
  "car_lock",
  "car_money",
  "car_repair",
  "card_view",
  "card_wallet",
  "caret_down",
  "caret_left",
  "caret_right",
  "caret_up",
  "caret_large_down",
  "caret_large_left",
  "caret_large_right",
  "caret_large_up",
  "cart",
  "cash",
  "chat",
  "chart_bar",
  "chart_line",
  "chart_pie",
  "chat_notes",
  "check_all",
  "check_none",
  "chevron_down",
  "chevron_left",
  "chevron_right",
  "chevron_up",
  "chevron_down_thick",
  "chevron_left_thick",
  "chevron_right_thick",
  "chevron_up_thick",
  "circle_with_dots",
  "circles_connection",
  "clock",
  "close",
  "cloud_co2",
  "coins",
  "collaborate",
  "computer_clock",
  "connect",
  "connect_off",
  "construction",
  "contacts",
  "contact_card",
  "copy",
  "create",
  "credit_card",
  "credit_card_slash",
  "cross",
  "cross_circle",
  "csv",
  "dashboard",
  "delete",
  "delivery",
  "disconnect",
  "disputed",
  "document_right_align",
  "document_tick",
  "document_vertical_lines",
  "download",
  "drag",
  "drag_vertical",
  "draft",
  "drill",
  "dropdown",
  "duplicate",
  "edit",
  "edited",
  "email",
  "email_switch",
  "entry",
  "ellipsis_horizontal",
  "ellipsis_vertical",
  "envelope_dollar",
  "envelope_euro",
  "error",
  "error_square",
  "euro",
  "expand",
  "factory",
  "favourite",
  "favourite_lined",
  "fax",
  "feedback",
  "file_excel",
  "file_generic",
  "file_image",
  "file_pdf",
  "file_word",
  "files_leaning",
  "filter",
  "filter_new",
  "fit_height",
  "fit_width",
  "flag",
  "folder",
  "form_refresh",
  "gift",
  "go",
  "graduation_hat",
  "graph",
  "grid",
  "heart_pulse",
  "help",
  "hide",
  "hand_cash_coins",
  "hand_cash_note",
  "home",
  "image",
  "in_progress",
  "in_transit",
  "individual",
  "info",
  "intranet",
  "italic",
  "job_seeked",
  "key",
  "laptop",
  "leaf",
  "ledger",
  "ledger_arrow_left",
  "ledger_arrow_right",
  "lightbulb_off",
  "lightbulb_on",
  "like",
  "like_no",
  "link",
  "link_cloud",
  "link_on",
  "list_view",
  "locked",
  "location",
  "logout",
  "lookup",
  "marker",
  "message",
  "microphone",
  "minimise",
  "minus",
  "minus_large",
  "mobile",
  "money_bag",
  "none",
  "old_warning",
  "palm_tree",
  "pause",
  "pause_circle",
  "petrol_pump",
  "pdf",
  "pin",
  "people",
  "people_switch",
  "percentage_boxed",
  "person",
  "person_info",
  "person_tick",
  "phone",
  "piggy_bank",
  "plane",
  "play",
  "play_circle",
  "plus",
  "plus_large",
  "pound",
  "print",
  "progress",
  "progressed",
  "protect",
  "question",
  "question_hollow",
  "question_mark",
  "recruiting",
  "refresh",
  "refresh_clock",
  "remove",
  "sage_coin",
  "save",
  "scan",
  "search",
  "send",
  "services",
  "settings",
  "settings_old",
  "share",
  "shop",
  "sort_down",
  "sort_up",
  "spanner",
  "split",
  "split_container",
  "square_dot",
  "squares_nine",
  "stacked_boxes",
  "stacked_squares",
  "submitted",
  "support_online",
  "sync",
  "tag",
  "talk",
  "target",
  "target_man",
  "theatre_masks",
  "three_boxes",
  "tick",
  "tick_circle",
  "tick_thick",
  "true_tick",
  "u_turn_left",
  "u_turn_right",
  "undo",
  "unlocked",
  "upload",
  "uploaded",
  "video",
  "view",
  "volunteering",
  "warning",
  "website",
  "welfare",
];

export default dlsConfig;
