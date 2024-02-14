import { LoaderSpinnerSizes } from "./loader-spinner.component";

export const LOADER_SPINNER_SIZES: LoaderSpinnerSizes[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
];

type LoaderSpinnerSizeParams = Record<
  LoaderSpinnerSizes,
  { dimensions: number; borderWidth: number; roundedCornerWidth?: number }
>;

export const LOADER_SPINNER_SIZE_PARAMS: LoaderSpinnerSizeParams = {
  XS: { dimensions: 20, borderWidth: 4, roundedCornerWidth: 3.5 },
  S: { dimensions: 32, borderWidth: 6, roundedCornerWidth: 5.5},
  M: { dimensions: 56, borderWidth: 10, roundedCornerWidth: 9.5 },
  L: { dimensions: 80, borderWidth: 14, roundedCornerWidth: 13.5 },
  XL: { dimensions: 104, borderWidth: 18, roundedCornerWidth: 17.5 },
};