import { render } from "@testing-library/react";
import { Message } from "../components/Message";

describe("Message Component", () => {
  it("renders the message correctly", () => {
    const message = "Hello, World!";
    const { getByText } = render(<Message message={message} />);
    const messageElement = getByText(message);

    expect(messageElement).toBeTruthy();
  });
});
