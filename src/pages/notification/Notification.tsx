import React, { useState } from "react";
// import { FaBell } from "react-icons/fa";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Payment Received",
      description: "Your recent deposit of ₦50,000 has been confirmed.",
      timestamp: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "KYC Approved",
      description: "Your KYC submission has been approved. You can now withdraw funds.",
      timestamp: "1 day ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Investment Update",
      description: "Your investment of ₦100,000 has matured. Payout will be processed soon.",
      timestamp: "3 days ago",
      isRead: true,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  return (
    <div className=" mx-auto p- space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="bg-pry text-sec px-4 py-2 rounded-md shadow-md hover:bg-pry/90 transition-all"
        >
          Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 divide-y divide-gray-200 space-y-2">
        {notifications.length > 0 ? (
          notifications.map(({ id, title, description, timestamp, isRead }) => (
            <div
              key={id}
              className={`py-4 px-3 rounded-md flex justify-between items-center ${
                isRead ? "bg-pry/40 border-pry" : "bg-pry/40 border border-pry"
              }`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg ">{title}</h3>
                <p className="text-sec text-sm">{description}</p>
                <span className="text text-xs">{timestamp}</span>
              </div>
              {!isRead && (
                <button
                  onClick={() => markAsRead(id)}
                  className="text-sec font-medium text-sm hover:underline p-3 bg-pry rounded"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
