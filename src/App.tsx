import { useState, useEffect } from "react";
import type { User } from "./types/User";
import { fetchUsers } from "./services/api";
import { UserTable } from "./components/UserTable";
import { UserDetailModal } from "./components/UserDetailModal";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await fetchUsers();
      setUsers(userData);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error("Error loading users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="app">
      <header className="app-header mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">Homework 2</h1>
        <p className="text-lg text-gray-600 text-center">Users table</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={loadUsers} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        <UserTable users={users} onUserClick={handleUserClick} onDeleteUser={handleDeleteUser} isLoading={isLoading} />
      </main>

      <UserDetailModal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
