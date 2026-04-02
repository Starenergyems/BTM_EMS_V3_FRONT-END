import "@testing-library/jest-dom/vitest";
import { vitest } from "vitest";
//解決測試時出現 matchMedia not present, legacy browsers require a polyfill 的問題
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
//解決測試時出現ResizeObserver is not defined 的問題
window.ResizeObserver = vitest.fn().mockImplementation(() => ({
  observe: vitest.fn(),
  unobserve: vitest.fn(),
  disconnect: vitest.fn(),
}));
