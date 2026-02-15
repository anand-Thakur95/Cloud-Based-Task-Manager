import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState, useEffect, useMemo } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
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

const Notifications= () => {
  const [selected, setSelected] = useState(null);

  
  const { data, refetch, isLoading } = useGetNotificationsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const [markAsRead] = useMarkNotiAsReadMutation();

  
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
      refetch(); 
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const viewHandler = (item) => {
    setSelected(item);
    readHandler("one", item._id);
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  // Handle different API response shapes safely
  const notifications = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.notice)) return data.notice;
    if (Array.isArray(data?.notifications)) return data.notifications;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }, [data]);

  const unreadCount = useMemo(() => {
    const backendCount =
      data?.unreadCount ??
      data?.unReadCount ??
      data?.unread ??
      data?.count ??
      data?.totalUnread ??
      data?.total;

    if (typeof backendCount === "number") return backendCount;

    const byIsReadByMe = notifications.filter((item) => !item?.isReadByMe).length;
    if (byIsReadByMe > 0) return byIsReadByMe;
    const byIsRead = notifications.filter((item) => !item?.isRead).length;
    return byIsRead || notifications.length;
  }, [data, notifications]);

  return (
    <>
      <Popover className='relative'>
        <Popover.Button 
          className='inline-flex items-center outline-none'
          onClick={() => refetch()} 
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
                    <div className='py-6 text-center text-gray-500'>
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2">Loading...</p>
                    </div>
                  ) : notifications?.length === 0 ? (
                    <div className='py-6 text-center text-gray-500'>
                      <IoIosNotificationsOutline className="text-4xl mx-auto mb-2 opacity-50" />
                      <p>No new notifications</p>
                    </div>
                  ) : (
                    notifications?.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50'
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white'>
                          {ICONS[item.notiType] || ICONS.alert}
                        </div>

                        <div
                          className='cursor-pointer'
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
                            {item?.task?.title || item.text}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {notifications?.length > 0 && (
                  <div className='grid grid-cols-2 divide-x bg-gray-50'>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        to="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (item?.onClick) {
                            item.onClick();
                          }
                          close();
                        }}
                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>

      {selected && (
        <ViewNotification
          open={selected !== null}
          setOpen={() => setSelected(null)}
          el={selected}
        />
      )}
    </>
  );
};

export default Notifications;
