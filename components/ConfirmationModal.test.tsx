import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationModal } from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders modal with correct title and description", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        description="Test Description"
      />,
    );
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        description="Test Description"
      />,
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        description="Test Description"
      />,
    );
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("displays processing state and disables buttons when isLoading is true", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        title="Test Title"
        description="Test Description"
        isLoading={true}
      />,
    );

    expect(screen.getByText("Processing...")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeDisabled();

    const actionBtn = screen.getByText("Processing...").closest("button");
    expect(actionBtn).toBeDisabled();
  });
});
