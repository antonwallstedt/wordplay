import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Track from "../Track";

afterEach(() => {
  cleanup();
});

test("Should render Track component", () => {
  render(<Track />);
  const trackElement = screen.getByTestId("track-test");
  expect(trackElement).toBeInTheDocument();
});
