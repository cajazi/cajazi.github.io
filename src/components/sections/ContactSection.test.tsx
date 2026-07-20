import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ContactSection } from "./ContactSection";

it("announces clipboard success", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<ContactSection />);
  await userEvent.click(screen.getByRole("button", { name: "Copy email" }));
  expect(writeText).toHaveBeenCalledWith("support@cosmas.dev");
  expect(screen.getByRole("status")).toHaveTextContent("copied to clipboard");
});
