import type { User } from "../types/User";
import "./UserDetailModal.css";

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal = ({ user, isOpen, onClose }: UserDetailModalProps) => {
  if (!isOpen || !user) return null;

  const mapUrl = `https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Details</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="user-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="info-item">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <span>{user.phone}</span>
              </div>
              <div className="info-item">
                <label>Website:</label>
                <span>
                  <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
                    {user.website}
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="user-section">
            <h3>Address</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Street:</label>
                <span>{user.address.street}</span>
              </div>
              <div className="info-item">
                <label>Suite:</label>
                <span>{user.address.suite}</span>
              </div>
              <div className="info-item">
                <label>City:</label>
                <span>{user.address.city}</span>
              </div>
              <div className="info-item">
                <label>Zipcode:</label>
                <span>{user.address.zipcode}</span>
              </div>
              <div className="info-item">
                <label>Location:</label>
                <span>
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    View on Map
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="user-section">
            <h3>Company</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Name:</label>
                <span>{user.company.name}</span>
              </div>
              <div className="info-item">
                <label>Catch Phrase:</label>
                <span>{user.company.catchPhrase}</span>
              </div>
              <div className="info-item">
                <label>Business:</label>
                <span>{user.company.bs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
