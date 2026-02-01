import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from '../redux/slices/api/userApiSlice';

export default function NotificationBar() {
 const [open, setOpen] = useState(false);
 const [selected, setSelected] = useState(null);

 const {data, refetch} = useGetNotificationsQuery();
 const [markAsRead] = useMarkNotiAsReadMutation();

 
const readHandler = async(type, id) => {

  await markAsRead({type, id}).unwrap();
  
  refetch();
  
};
const viewHandler = async(type, id) => {
setSelected(el)
readHandler("one",el._id)
setOpen(true)
};
  


  return (

          <div className="w-full px-0 flex justify-between items-center h-12">
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setOpen(!setOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
              >
                <Bell size={24} className="text-gray-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute min-[320px]:w-60 right-0 mt-2 w-80 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.id)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 ${
                          notif.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm ${notif.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                          {notif.unread && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
      

   
  );
}