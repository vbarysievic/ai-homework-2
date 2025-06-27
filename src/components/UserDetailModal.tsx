import type { User } from "../types/User";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  if (!isOpen || !user) return null;

  const mapUrl = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={onClose}
      tabIndex={0}
      aria-label="Close modal"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        aria-modal="true"
        role="dialog"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={onClose}
          aria-label="Close"
          tabIndex={0}
        >
          &times;
        </button>
        <div className="mb-6">
          <div className="text-2xl font-bold text-gray-900 mb-1">{user.name}</div>
          <a
            href={`mailto:${user.email}`}
            className="text-blue-600 hover:underline text-base mb-4 block"
            tabIndex={0}
            aria-label={`Send email to ${user.email}`}
          >
            {user.email}
          </a>
        </div>
        <div className="mb-6">
          <div className="font-bold text-lg text-gray-900 mb-2">Address</div>
          <div className="text-gray-700 mb-1">
            {user.address.street}, {user.address.suite}
          </div>
          <div className="text-gray-700 mb-1">
            {user.address.city}, {user.address.zipcode}
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:underline text-sm mt-2"
            tabIndex={0}
            aria-label="View on map"
          >
            <span className="mr-1 text-red-500">📍</span> View on map
          </a>
        </div>
        <div className="mb-6">
          <div className="font-bold text-lg text-gray-900 mb-2">Contact</div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Phone:</span> {user.phone}
          </div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Website:</span>{" "}
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              tabIndex={0}
              aria-label={`Visit website ${user.website}`}
            >
              {user.website}
            </a>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg text-gray-900 mb-2">Company</div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Name:</span> {user.company.name}
          </div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Catchphrase:</span> {user.company.catchPhrase}
          </div>
          <div className="text-gray-700 mb-1">
            <span className="font-semibold">Business:</span> {user.company.bs}
          </div>
        </div>
      </div>
    </div>
  );
};
