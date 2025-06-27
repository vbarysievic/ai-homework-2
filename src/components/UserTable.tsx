import type { User } from "../types/User";

interface UserTableProps {
  users: User[];
  onUserClick: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  isLoading: boolean;
}

export const UserTable = ({ users, onUserClick, onDeleteUser, isLoading }: UserTableProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"
          role="status"
          aria-label="Loading"
        ></div>
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name / Email</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Website</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => onUserClick(user)}
              tabIndex={0}
              aria-label={`View details for ${user.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onUserClick(user);
              }}
            >
              <td className="px-6 py-4 align-top">
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-blue-600 text-sm">{user.email}</div>
              </td>
              <td className="px-6 py-4 align-top text-gray-700">
                {user.address.city}, {user.address.street}
              </td>
              <td className="px-6 py-4 align-top text-gray-700">
                <a href={`tel:${user.phone}`} className="hover:underline">
                  {user.phone}
                </a>
              </td>
              <td className="px-6 py-4 align-top">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline focus:underline outline-none"
                  tabIndex={0}
                  aria-label={`Visit website ${user.website}`}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {user.website}
                </a>
              </td>
              <td className="px-6 py-4 align-top text-gray-700">{user.company.name}</td>
              <td className="px-6 py-4 align-top text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteUser(user.id);
                  }}
                  className="text-red-500 hover:bg-red-100 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                  aria-label="Delete user"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter" || e.key === " ") onDeleteUser(user.id);
                  }}
                >
                  &#10060;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
