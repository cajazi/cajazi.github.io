import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useLocation } from "react-router-dom";
import { expect, it } from "vitest";
import { Header } from "./Header";

function LocationProbe() { const location = useLocation(); return <output>{location.pathname}{location.hash}</output>; }

it("navigates from a project route to a homepage section in one click", async () => {
  render(<MemoryRouter initialEntries={["/projects/example"]}><Header /><LocationProbe /></MemoryRouter>);
  await userEvent.click(screen.getAllByRole("link", { name: "About" })[0]);
  expect(screen.getByText("/#about")).toBeInTheDocument();
});
