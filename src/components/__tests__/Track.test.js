import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import Track from "../Track";

afterEach(() => {
  cleanup();
});

describe("Track Component renders everything it should", () => {
  test("Should render Track component", () => {
    render(<Track />);
    const trackElement = screen.queryByTestId("track-test");
    expect(trackElement).toBeInTheDocument();
  });
});
