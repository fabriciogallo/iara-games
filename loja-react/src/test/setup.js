import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// o jsdom não implementa rolagem
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

afterEach(() => {
  cleanup();
  localStorage.clear();
  document.body.className = "";
  document.body.style.overflow = "";
});
