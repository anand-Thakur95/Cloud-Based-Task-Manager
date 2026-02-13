import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState, useEffect } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useGetNotificationsQuery, useMarkNotiAsReadMutation } from "../redux/slices/api/userApiSlice";
import ViewNotification from "./ViewNotification";

const ICONS = {
  alert: (
    <HiBellAlert className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-gray-600 group-hover:text-indigo-600' />
  ),
};

const Notifications = () => {
  const [selected, setSelected] = useState(null);

  // Enable polling and refetch on focus
  const { data, refetch, isLoading, isError } = useGetNotificationsQuery(undefined, {
    pollingInterval: 60000, // Poll every 60 seconds
    refetchOnFocus: true,   // Refetch when tab gains focus
    refetchOnReconnect: true // Refetch on reconnect
  });
  
  const [markAsRead, { isLoading: isMarking }] = useMarkNotiAsReadMutation();

  const notifications = data?.notice ?? [];
  const unreadCount = notifications.filter((n) => !n.isReadByMe).length;

  // Also refetch on window focus
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refetch();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [refetch]);

  const readHandler = async (type, id) => {
    try {
      await markAsRead({ type, id }).unwrap();
      await refetch();
    } catch (err) {
      console.error("Mark as read failed:", err);
    }
  };

  const viewHandler = async (item) => {
    setSelected(item);
    if (!item.isReadByMe) {
      await readHandler("one", item._id);
    }
  };

  return (
    <>
      <Popover className='relative'>
        <Popover.Button 
          className='inline-flex items-center outline-none'
          onClick={() => refetch()} // Manual refetch on click
        >
          <div className='w-8 h-8 flex items-center justify-center text-gray-800 relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {unreadCount > 0 && (
              <span className='absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {unreadCount}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
            {({ close }) => (
              <div className='w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5'>
                <div className='p-4'>
                  {isLoading ? (
                    <div className='py-6 text-center text-gray-500'>Loading...</div>
                  ) : isError ? (
                    <div className='py-6 text-center text-red-500'>Failed to load notifications</div>
                  ) : notifications.length === 0 ? (
                    <div className='py-6 text-center text-gray-500'>No notifications</div>
                  ) : (
                    notifications.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className={`group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50 ${!item.isReadByMe ? "bg-blue-50/50" : ""}`}
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS[item.notiType] ?? ICONS.alert}
                        </div>

                        <div
                          className='cursor-pointer flex-1 min-w-0'
                          onClick={() => {
                            viewHandler(item);
                            close();
                          }}
                        >
                          <div className='flex items-center gap-3 font-semibold text-gray-900 capitalize'>
                            <p>{item.notiType}</p>
                            <span className='text-xs font-normal lowercase'>
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className='line-clamp-1 mt-1 text-gray-600'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className='grid grid-cols-2 divide-x bg-gray-50'>
                  <button
                    type='button'
                    onClick={() => close()}
                    className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    onClick={async () => {
                      await readHandler("all", "");
                      close();
                    }}
                    disabled={isMarking}
                    className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100 disabled:opacity-50'
                  >
                    {isMarking ? 'Marking...' : 'Mark All Read'}
                  </button>
                </div>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      <ViewNotification
        open={selected !== null}
        setOpen={() => setSelected(null)}
        el={selected}
      />
    </>
  );
};

export default Notifications;