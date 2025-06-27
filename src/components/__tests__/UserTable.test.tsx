import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserTable } from "../UserTable";
import type { User } from "../../types/User";

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      suite: "Apt 1",
      city: "New York",
      zipcode: "10001",
      geo: { lat: "40.7128", lng: "-74.0060" },
    },
    phone: "555-1234",
    website: "johndoe.com",
    company: {
      name: "Tech Corp",
      catchPhrase: "Innovation at its best",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    address: {
      street: "456 Oak Ave",
      suite: "Suite 2",
      city: "Los Angeles",
      zipcode: "90210",
      geo: { lat: "34.0522", lng: "-118.2437" },
    },
    phone: "555-5678",
    website: "janesmith.com",
    company: {
      name: "Design Studio",
      catchPhrase: "Creative solutions",
      bs: "harness real-time e-markets",
    },
  },
];

describe("UserTable", () => {
  const mockOnUserClick = vi.fn();
  const mockOnDeleteUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Loading State", () => {
    it("should show loading spinner when isLoading is true", () => {
      render(<UserTable users={[]} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={true} />);

      expect(screen.getByText("Loading users...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument(); // The spinner
    });

    it("should not show loading spinner when isLoading is false", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      expect(screen.queryByText("Loading users...")).not.toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show empty state when no users are provided", () => {
      render(<UserTable users={[]} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />);

      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

  describe("User Data Display", () => {
    it("should render user data correctly", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      // Check if user names are displayed
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();

      // Check if emails are displayed
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();

      // Check if addresses are displayed
      expect(screen.getByText("New York, 123 Main St")).toBeInTheDocument();
      expect(screen.getByText("Los Angeles, 456 Oak Ave")).toBeInTheDocument();

      // Check if phones are displayed
      expect(screen.getByText("555-1234")).toBeInTheDocument();
      expect(screen.getByText("555-5678")).toBeInTheDocument();

      // Check if websites are displayed
      expect(screen.getByText("johndoe.com")).toBeInTheDocument();
      expect(screen.getByText("janesmith.com")).toBeInTheDocument();

      // Check if company names are displayed
      expect(screen.getByText("Tech Corp")).toBeInTheDocument();
      expect(screen.getByText("Design Studio")).toBeInTheDocument();
    });

    it("should render table headers correctly", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      expect(screen.getByText("Name / Email")).toBeInTheDocument();
      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Phone")).toBeInTheDocument();
      expect(screen.getByText("Website")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
      expect(screen.getByText("Action")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onUserClick when a user row is clicked", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
    });

    it("should call onUserClick when Enter key is pressed on a user row", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.keyDown(userRows[0]!, { key: "Enter" });

      expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
    });

    it("should call onUserClick when Space key is pressed on a user row", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.keyDown(userRows[0]!, { key: " " });

      expect(mockOnUserClick).toHaveBeenCalledWith(mockUsers[0]);
    });

    it("should call onDeleteUser when delete button is clicked", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const deleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.click(deleteButtons[0]!);

      expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUsers[0]!.id);
    });

    it("should call onDeleteUser when Enter key is pressed on delete button", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const deleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.keyDown(deleteButtons[0]!, { key: "Enter" });

      expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUsers[0]!.id);
    });

    it("should not trigger onUserClick when delete button is clicked", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const deleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.click(deleteButtons[0]!);

      expect(mockOnDeleteUser).toHaveBeenCalledWith(mockUsers[0]!.id);
      expect(mockOnUserClick).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA labels for user rows", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      expect(screen.getByLabelText("View details for John Doe")).toBeInTheDocument();
      expect(screen.getByLabelText("View details for Jane Smith")).toBeInTheDocument();
    });

    it("should have proper ARIA labels for delete buttons", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const deleteButtons = screen.getAllByLabelText("Delete user");
      expect(deleteButtons).toHaveLength(2);
    });

    it("should have proper ARIA labels for website links", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      expect(screen.getByLabelText("Visit website johndoe.com")).toBeInTheDocument();
      expect(screen.getByLabelText("Visit website janesmith.com")).toBeInTheDocument();
    });

    it("should have proper tabindex for keyboard navigation", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      userRows.forEach((row) => {
        expect(row).toHaveAttribute("tabIndex", "0");
      });

      const deleteButtons = screen.getAllByLabelText("Delete user");
      deleteButtons.forEach((button) => {
        expect(button).toHaveAttribute("tabIndex", "0");
      });
    });
  });

  describe("Links and External URLs", () => {
    it("should render phone numbers as tel links", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const phoneLinks = screen.getAllByRole("link");
      const telLinks = phoneLinks.filter((link) => link.getAttribute("href")?.startsWith("tel:"));

      expect(telLinks).toHaveLength(2);
      expect(telLinks[0]).toHaveAttribute("href", "tel:555-1234");
      expect(telLinks[1]).toHaveAttribute("href", "tel:555-5678");
    });

    it("should render website links with proper attributes", () => {
      render(
        <UserTable users={mockUsers} onUserClick={mockOnUserClick} onDeleteUser={mockOnDeleteUser} isLoading={false} />
      );

      const websiteLinks = screen
        .getAllByRole("link")
        .filter((link) => link.getAttribute("href")?.startsWith("https://"));

      expect(websiteLinks).toHaveLength(2);
      websiteLinks.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });
});
