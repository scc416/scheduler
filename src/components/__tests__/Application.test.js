import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  const { getByText } = render(<Application />);

  it("changes the schedule when a new day is selected", async () => {
    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});
