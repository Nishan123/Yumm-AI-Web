import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "next-themes";

jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: any) => <div>{children}</div>,
  DropdownMenuItem: ({ children, onClick }: any) => (
    <div
      data-testid={`menu-item-${children?.toString().toLowerCase()}`}
      onClick={onClick}
    >
      {children}
    </div>
  ),
}));

describe("ThemeToggle", () => {
  const setThemeMock = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      setTheme: setThemeMock,
    });
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /toggle theme/i }),
    ).toBeInTheDocument();
  });

  it("calls setTheme with light when Light is clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    fireEvent.click(screen.getByText("Light"));
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });

  it("calls setTheme with dark when Dark is clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    fireEvent.click(screen.getByText("Dark"));
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with system when System is clicked", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    fireEvent.click(screen.getByText("System"));
    expect(setThemeMock).toHaveBeenCalledWith("system");
  });
});
