import { render } from "@testing-library/react";
import type { User } from "../types/User";

// Mock data for tests
export const mockUsers: User[] = [
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

// Custom render function with providers if needed
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui);
}

// Helper to create a mock user
export function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: 1,
    name: "Test User",
    username: "testuser",
    email: "test@example.com",
    address: {
      street: "123 Test St",
      suite: "Apt 1",
      city: "Test City",
      zipcode: "12345",
      geo: { lat: "0", lng: "0" },
    },
    phone: "555-0000",
    website: "test.com",
    company: {
      name: "Test Company",
      catchPhrase: "Test phrase",
      bs: "test business",
    },
    ...overrides,
  };
}

// Helper to wait for loading to complete
export async function waitForLoadingToComplete() {
  // This would be used in tests to wait for loading states to resolve
  // Implementation depends on your loading indicators
}

// Helper to get table rows (skipping header)
export function getTableRows() {
  return document.querySelectorAll("tbody tr");
}

// Helper to get table cells from a row
export function getRowCells(row: Element) {
  return row.querySelectorAll("td");
}
