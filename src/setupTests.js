import { vitest } from "vitest";
import "@testing-library/jest-dom/vitest";
//解決測試時出現 matchMedia not present, legacy browsers require a polyfill 的問題
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      addListener: function () {},
      matches: false,
      removeListener: function () {},
    };
  };
//解決測試時出現ResizeObserver is not defined 的問題
window.ResizeObserver = vitest.fn().mockImplementation(() => ({
  disconnect: vitest.fn(),
  observe: vitest.fn(),
  unobserve: vitest.fn(),
}));
