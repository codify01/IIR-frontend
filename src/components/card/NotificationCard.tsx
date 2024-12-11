import { FaBell, FaSignInAlt, FaCheckCircle } from 'react-icons/fa';

// Define the type for the notification prop
interface Notification {
  type: 'login' | 'deposit' | string; // Example types: 'login', 'deposit', or any string
  title: string;
  message: string;
  created_at: string; // assuming it's a string, adjust if it's a Date object
  is_read: string; // Assuming '0' for unread, '1' for read
}

interface NotificationCardProps {
  notification: Notification;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
  const { type, title, message, created_at, is_read } = notification;

  // Set the icon based on the notification type
  const icon =
    type === 'login' ? (
      <FaSignInAlt />
    ) : type === 'deposit' ? (
      <FaCheckCircle />
    ) : (
      <FaBell />
    );

  return (
    <div
      className={`flex items-center py-4 px-6 border-b-2 border-gray-100 rounded-lg ${
        is_read === '0' ? 'bg-pry text-sec' : 'bg-pry/40'
      }`}
    >
      <div className="mr-4 text-xl">{icon}</div>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className=" text-sm">{message}</p>
        <p className="text-black text-xs">
          {new Date(created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
