import { enableFetchMocks } from "jest-fetch-mock";
import { setupMatchMediaMock } from "./mock-match-media";
import setupResizeObserverMock from "./mock-resize-observer";
import setupScrollToMock from "./mock-element-scrollto";

enableFetchMocks();
setupResizeObserverMock();
setupMatchMediaMock();
setupScrollToMock();
