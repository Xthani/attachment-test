import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ResultScreen from "../result-screen";

describe("ResultScreen (component)", () => {
  it("renders empty state when there is no result in sessionStorage", () => {
    window.sessionStorage.clear();

    render(
      <ResultScreen
        locale="en"
        t={{
          title: "Result",
          subtitle: "Subtitle",
          emptyState: {
            title: "No result yet",
            subtitle: "Empty",
            cta: "Start the test",
          },
          actions: {
            retake: "Retake",
            toTest: "Back to test",
            toHome: "Home",
          },
          sections: {
            overviewTitle: "Summary",
            scalesTitle: "Scales",
            disclaimerTitle: "Important",
            privacyTitle: "Privacy",
          },
          privacy: {
            note: "Privacy note",
          },
          disclaimers: {
            text: "Disclaimer",
          },
        }}
      />,
    );

    expect(screen.getByText("No result yet")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start the test/i })).toBeInTheDocument();
  });
});

