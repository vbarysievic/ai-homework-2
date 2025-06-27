# Testing Documentation

This project uses Vitest for testing with React Testing Library for component testing.

## Test Structure

```
src/
├── test/
│   ├── setup.ts          # Test environment setup
│   ├── utils.tsx         # Test utilities and helpers
│   └── README.md         # This file
├── __tests__/
│   └── App.test.tsx      # Main App component tests
├── components/
│   └── __tests__/
│       ├── UserTable.test.tsx      # UserTable component tests
│       └── UserDetailModal.test.tsx # UserDetailModal component tests
└── services/
    └── __tests__/
        └── api.test.ts   # API service tests
```

## Running Tests

### Development Mode

```bash
npm run test
```

Runs tests in watch mode with UI interface.

### Run Once

```bash
npm run test:run
```

Runs all tests once and exits.

### With Coverage

```bash
npm run test:coverage
```

Runs tests with coverage report.

### UI Mode

```bash
npm run test:ui
```

Opens Vitest UI for interactive testing.

## Test Categories

### 1. API Service Tests (`src/services/__tests__/api.test.ts`)

- Tests the `fetchUsers` function
- Covers success and error scenarios
- Mocks fetch API calls

### 2. Component Tests

#### UserTable (`src/components/__tests__/UserTable.test.tsx`)

- Loading states
- Empty states
- User data display
- User interactions (click, keyboard)
- Accessibility features
- External links and URLs

#### UserDetailModal (`src/components/__tests__/UserDetailModal.test.tsx`)

- Modal visibility
- Content display
- User interactions (close, backdrop, escape key)
- Accessibility features
- External links

### 3. App Integration Tests (`src/__tests__/App.test.tsx`)

- Initial load behavior
- Error handling
- User interactions
- State management
- Modal functionality

## Test Utilities

### Mock Data

- `mockUsers`: Predefined user data for tests
- `createMockUser()`: Helper to create custom user objects

### Helper Functions

- `renderWithProviders()`: Custom render function
- `getTableRows()`: Get table rows (excluding header)
- `getRowCells()`: Get cells from a table row

## Testing Best Practices

1. **Arrange-Act-Assert**: Structure tests with clear sections
2. **Descriptive Names**: Use clear, descriptive test names
3. **Mock External Dependencies**: Mock API calls and external services
4. **Test User Behavior**: Focus on user interactions rather than implementation details
5. **Accessibility Testing**: Include ARIA attributes and keyboard navigation tests
6. **Error Scenarios**: Test error states and edge cases

## Common Patterns

### Testing Async Operations

```typescript
await waitFor(() => {
  expect(screen.getByText("Expected Text")).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
fireEvent.click(screen.getByText("Button Text"));
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
```

### Testing Loading States

```typescript
expect(screen.getByText("Loading...")).toBeInTheDocument();
```

### Testing Error States

```typescript
expect(screen.getByText("Error message")).toBeInTheDocument();
```

## Coverage Goals

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

## Debugging Tests

1. Use `console.log()` in tests for debugging
2. Use Vitest UI for interactive debugging
3. Use `screen.debug()` to see the current DOM state
4. Use `screen.logTestingPlaygroundURL()` for Testing Playground integration
