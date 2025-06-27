import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchUsers } from "../api";
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

describe("API Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("fetchUsers", () => {
    it("should fetch users successfully", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as unknown as Response);

      const result = await fetchUsers();

      expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
      expect(result).toEqual(mockUsers);
    });

    it("should throw error when response is not ok", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as unknown as Response);

      await expect(fetchUsers()).rejects.toThrow("HTTP error! status: 404");
      expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
    });

    it("should throw error when network request fails", async () => {
      const mockFetch = vi.mocked(fetch);
      const networkError = new Error("Network error");
      mockFetch.mockRejectedValueOnce(networkError);

      await expect(fetchUsers()).rejects.toThrow("Network error");
      expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
    });

    it("should throw error when JSON parsing fails", async () => {
      const mockFetch = vi.mocked(fetch);
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      } as unknown as Response);

      await expect(fetchUsers()).rejects.toThrow("Invalid JSON");
      expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users");
    });
  });
});
