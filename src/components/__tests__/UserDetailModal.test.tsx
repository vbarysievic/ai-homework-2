import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserDetailModal } from "../UserDetailModal";
import type { User } from "../../types/User";

// Mock data
const mockUser: User = {
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
};

describe("UserDetailModal", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Visibility", () => {
    it("should not render when isOpen is false", () => {
      render(<UserDetailModal user={mockUser} isOpen={false} onClose={mockOnClose} />);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should not render when user is null", () => {
      render(<UserDetailModal user={null} isOpen={true} onClose={mockOnClose} />);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true and user is provided", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Content Display", () => {
    it("should display user information correctly", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      // Check user name and email
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();

      // Check address information
      expect(screen.getByText("123 Main St, Apt 1")).toBeInTheDocument();
      expect(screen.getByText("New York, 10001")).toBeInTheDocument();

      // Check contact information
      expect(screen.getByText("555-1234")).toBeInTheDocument();
      expect(screen.getByText("johndoe.com")).toBeInTheDocument();

      // Check company information
      expect(screen.getByText("Tech Corp")).toBeInTheDocument();
      expect(screen.getByText("Innovation at its best")).toBeInTheDocument();
      expect(screen.getByText("synergize scalable supply-chains")).toBeInTheDocument();
    });

    it("should display section headers correctly", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText("Address")).toBeInTheDocument();
      expect(screen.getByText("Contact")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should call onClose when close button is clicked", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const closeButton = screen.getByLabelText("Close");
      fireEvent.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when backdrop is clicked", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen.getByLabelText("Close modal");
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose when Escape key is pressed", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen.getByLabelText("Close modal");
      fireEvent.keyDown(backdrop, { key: "Escape" });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should not call onClose when modal content is clicked", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const modalContent = screen.getByRole("dialog");
      fireEvent.click(modalContent);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const modal = screen.getByRole("dialog");
      expect(modal).toHaveAttribute("aria-modal", "true");
    });

    it("should have proper ARIA labels", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByLabelText("Close")).toBeInTheDocument();
      expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
      expect(screen.getByLabelText("Send email to john@example.com")).toBeInTheDocument();
      expect(screen.getByLabelText("Visit website johndoe.com")).toBeInTheDocument();
      expect(screen.getByLabelText("View on map")).toBeInTheDocument();
    });

    it("should have proper tabindex for keyboard navigation", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen.getByLabelText("Close modal");
      const modalContent = screen.getByRole("dialog");
      const closeButton = screen.getByLabelText("Close");

      expect(backdrop).toHaveAttribute("tabIndex", "0");
      expect(modalContent).toHaveAttribute("tabIndex", "0");
      expect(closeButton).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Links and External URLs", () => {
    it("should render email as mailto link", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const emailLink = screen.getByLabelText("Send email to john@example.com");
      expect(emailLink).toHaveAttribute("href", "mailto:john@example.com");
    });

    it("should render website link with proper attributes", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const websiteLink = screen.getByLabelText("Visit website johndoe.com");
      expect(websiteLink).toHaveAttribute("href", "https://johndoe.com");
      expect(websiteLink).toHaveAttribute("target", "_blank");
      expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render map link with correct coordinates", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const mapLink = screen.getByLabelText("View on map");
      expect(mapLink).toHaveAttribute("href", "https://www.google.com/maps?q=40.7128,-74.0060");
      expect(mapLink).toHaveAttribute("target", "_blank");
      expect(mapLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Styling and Layout", () => {
    it("should have proper CSS classes for styling", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      const backdrop = screen.getByLabelText("Close modal");
      const modalContent = screen.getByRole("dialog");

      expect(backdrop).toHaveClass("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center");
      expect(modalContent).toHaveClass("relative", "bg-white", "rounded-2xl", "shadow-2xl");
    });

    it("should display map icon", () => {
      render(<UserDetailModal user={mockUser} isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText("📍")).toBeInTheDocument();
    });
  });
});
