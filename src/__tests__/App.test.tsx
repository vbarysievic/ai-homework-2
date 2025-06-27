import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "../App";
import type { User } from "../types/User";

// Mock the API service
vi.mock("../services/api", () => ({
  fetchUsers: vi.fn(),
}));

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

describe("App", () => {
  let mockFetchUsers: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const apiModule = await import("../services/api");
    mockFetchUsers = vi.mocked(apiModule.fetchUsers);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Initial Load", () => {
    it("should show loading state initially", async () => {
      mockFetchUsers.mockImplementation(() => new Promise(() => {})); // Never resolves

      render(<App />);

      expect(screen.getByText("Loading users...")).toBeInTheDocument();
    });

    it("should load and display users successfully", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      expect(mockFetchUsers).toHaveBeenCalledTimes(1);
    });

    it("should show error message when API call fails", async () => {
      mockFetchUsers.mockRejectedValue(new Error("API Error"));

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("Failed to load users. Please try again later.")).toBeInTheDocument();
      });
    });
  });

  describe("Header", () => {
    it("should display the correct header content", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("Homework 2")).toBeInTheDocument();
        expect(screen.getByText("Users table")).toBeInTheDocument();
      });
    });
  });

  describe("Error Handling", () => {
    it("should show retry button when there is an error", async () => {
      mockFetchUsers.mockRejectedValue(new Error("API Error"));

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("Try Again")).toBeInTheDocument();
      });
    });

    it("should retry loading users when retry button is clicked", async () => {
      mockFetchUsers.mockRejectedValueOnce(new Error("API Error")).mockResolvedValueOnce(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("Try Again")).toBeInTheDocument();
      });

      const retryButton = screen.getByText("Try Again");
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      expect(mockFetchUsers).toHaveBeenCalledTimes(2);
    });
  });

  describe("User Interactions", () => {
    it("should open modal when user row is clicked", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Modal should be open with user details
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const modal = screen.getByRole("dialog");
      expect(within(modal).getByText("John Doe")).toBeInTheDocument();
      expect(within(modal).getByText("john@example.com")).toBeInTheDocument();
    });

    it("should close modal when close button is clicked", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Open modal
      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Close modal
      const closeButton = screen.getByLabelText("Close");
      fireEvent.click(closeButton);

      // Modal should be closed
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should delete user when delete button is clicked", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      const deleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.click(deleteButtons[0]!); // Delete John Doe

      // John Doe should be removed from the table
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  describe("Modal Functionality", () => {
    it("should display correct user information in modal", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Open modal for John Doe
      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Check modal content
      const modal = screen.getByRole("dialog");
      expect(within(modal).getByText("John Doe")).toBeInTheDocument();
      expect(within(modal).getByText("john@example.com")).toBeInTheDocument();
      expect(within(modal).getByText("123 Main St, Apt 1")).toBeInTheDocument();
      expect(within(modal).getByText("New York, 10001")).toBeInTheDocument();
      expect(within(modal).getByText("555-1234")).toBeInTheDocument();
      expect(within(modal).getByText("johndoe.com")).toBeInTheDocument();
      expect(within(modal).getByText("Tech Corp")).toBeInTheDocument();
    });

    it("should close modal when backdrop is clicked", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Open modal
      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Close modal by clicking backdrop
      const backdrop = screen.getByLabelText("Close modal");
      fireEvent.click(backdrop);

      // Modal should be closed
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should close modal when Escape key is pressed", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });

      // Open modal
      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Close modal by pressing Escape
      const backdrop = screen.getByLabelText("Close modal");
      fireEvent.keyDown(backdrop, { key: "Escape" });

      // Modal should be closed
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("should maintain user list state after deletion", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      // Delete John Doe
      const deleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.click(deleteButtons[0]!);

      // Only Jane Smith should remain
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();

      // Delete Jane Smith
      const remainingDeleteButtons = screen.getAllByLabelText("Delete user");
      fireEvent.click(remainingDeleteButtons[0]!);

      // No users should remain
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    it("should handle multiple user selections correctly", async () => {
      mockFetchUsers.mockResolvedValue(mockUsers);

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      });

      // Open modal for John Doe
      const userRows = screen.getAllByRole("row").slice(1); // Skip header row
      fireEvent.click(userRows[0]!);

      // Modal should show John Doe
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const modal1 = screen.getByRole("dialog");
      expect(within(modal1).getByText("John Doe")).toBeInTheDocument();

      // Close modal
      const closeButton = screen.getByLabelText("Close");
      fireEvent.click(closeButton);

      // Open modal for Jane Smith
      fireEvent.click(userRows[1]!);

      // Modal should show Jane Smith
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      const modal2 = screen.getByRole("dialog");
      expect(within(modal2).getByText("Jane Smith")).toBeInTheDocument();
    });
  });
});
