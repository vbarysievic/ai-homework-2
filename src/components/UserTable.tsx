import type { User } from "../types/User";
import "./UserTable.css";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  isLoading: boolean;
}

export const UserTable = ({ users, onUserClick, onDeleteUser, isLoading }: UserTableProps) => {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <p>No users found</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name / Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="user-row">
              <td className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </td>
              <td className="user-address">
                <div>{user.address.street}</div>
                <div>{user.address.suite}</div>
                <div>
                  {user.address.city}, {user.address.zipcode}
                </div>
              </td>
              <td className="user-phone">
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </td>
              <td className="user-website">
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </a>
              </td>
              <td className="user-company">{user.company.name}</td>
              <td className="user-actions">
                <button className="action-button view-button" onClick={() => onUserClick(user)} title="View Details">
                  👁️
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => onDeleteUser(user.id)}
                  title="Delete User"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
