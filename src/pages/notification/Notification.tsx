import { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationCard from '../../components/card/NotificationCard';
import Loader from '../../components/Loader';

const apiURL = import.meta.env.VITE_API_URL;

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem('ident');

  useEffect(() => {
    axios
      .post(`${apiURL}/eachNotification.php`, { user_id: id })
      .then((response) => {
        console.log(response);
        if (response.data.notifications) {
          setNotifications(response.data.notifications);
        } else {
          setError(response.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full max-w-full mx-auto space-y-3 pb-20">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        notifications.map((notification) => (
          <NotificationCard key={notification} notification={notification} />
        ))
      )}
    </div>
  );
};

export default NotificationsList;
