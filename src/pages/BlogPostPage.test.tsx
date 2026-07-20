import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { expect, it } from "vitest";
import { BlogPostPage } from "./BlogPostPage";

it("renders a useful state for an invalid blog slug", () => {
  render(<MemoryRouter initialEntries={["/blog/missing"]}><Routes><Route path="/blog/:slug" element={<BlogPostPage />} /></Routes></MemoryRouter>);
  expect(screen.getByRole("heading", { name: "Article not found" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Return to the blog" })).toHaveAttribute("href", "/blog");
});
