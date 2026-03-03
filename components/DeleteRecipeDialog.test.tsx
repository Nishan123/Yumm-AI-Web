import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteRecipeDialog } from "./DeleteRecipeDialog";

describe("DeleteRecipeDialog", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders owner specific text when isOwner is true", () => {
    render(
      <DeleteRecipeDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isOwner={true}
        isDeleting={false}
      />,
    );
    expect(screen.getByText("Delete Recipe")).toBeInTheDocument();
    expect(
      screen.getByText(/permanently delete the recipe/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders non-owner specific text when isOwner is false", () => {
    render(
      <DeleteRecipeDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isOwner={false}
        isDeleting={false}
      />,
    );
    expect(screen.getByText("Remove from Cookbook")).toBeInTheDocument();
    expect(
      screen.getByText(/remove the recipe from your cookbook only/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Remove")).toBeInTheDocument();
  });

  it("calls onConfirm when the confirmation button is clicked", () => {
    render(
      <DeleteRecipeDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isOwner={true}
        isDeleting={false}
      />,
    );
    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("passes isDeleting directly to the ConfirmationModal isLoading", () => {
    render(
      <DeleteRecipeDialog
        isOpen={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        isOwner={true}
        isDeleting={true}
      />,
    );
    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });
});
