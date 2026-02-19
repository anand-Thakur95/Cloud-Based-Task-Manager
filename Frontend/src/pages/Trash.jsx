import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";

import Title from "../components/Title";
import { Button } from "../components/ui/button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmatioDialog from "../components/Dialogs";
import {
  useDeleteRestoreTaskMutation,
  useGetAllTasksQuery,
} from "../redux/slices/api/taskApiSlice";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TableHeader = () => (
  <thead className="border-b border-gray-300">
    <tr className="text-black text-left">
      <th className="py-2">Task Title</th>
      <th className="py-2">Priority</th>
      <th className="py-2">Stage</th>
      <th className="py-2 line-clamp-1">Modified On</th>
      <th className="py-2 text-right">Actions</th>
    </tr>
  </thead>
);

const TableRow = ({ item, onRestore, onDelete }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
    <td className="py-2">
      <div className="flex items-center gap-2">
        <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item.stage])} />
        <p className="w-full line-clamp-2 text-base text-black">{item?.title}</p>
      </div>
    </td>
    <td className="py-2 capitalize">
      <div className="flex gap-1 items-center">
        <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
          {ICONS[item?.priority]}
        </span>
        <span>{item?.priority}</span>
      </div>
    </td>
    <td className="py-2 capitalize text-center md:text-start">{item?.stage}</td>
    <td className="py-2 text-sm">{new Date(item?.date).toDateString()}</td>
    <td className="py-2">
      <div className="flex gap-1 justify-end">
        <Button
       className="bg-transfarent text-gray-600 hover:bg-transparent hover:text-gray-500"
          icon={<MdOutlineRestore className="text-xl text-gray-500" />}
          onClick={() => onRestore(item._id)}
        >Restore</Button>
        <Button
        className="bg-transfarent text-red-600 hover:bg-transparent hover:text-red-500 "
          icon={<MdDelete className="text-xl text-red-600 " />}
          onClick={() => onDelete(item._id)}
        > Delete</Button>
      </div>
    </td>
  </tr>
);

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const deleteRestoreHandler = async () => {
    try {
      await deleteRestoreTask({ id: selected, actionType: type }).unwrap();
    } catch (error) {
      console.error("Failed to perform action:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMsg("Do you want to permanently delete this item?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full px-2 sm:px-4 md:px-1 mb-6">
        <div className="flex items-center justify-between py-14">
          <Title title="Trashed Tasks" />
          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5 bg-transparent"
              onClick={restoreAllClick}
            >Restore All</Button>
            <Button
              label="Delete All"
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={deleteAllClick}
            >Delete All</Button>
          </div>
        </div>

        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {data?.tasks?.map((tk) => (
                  <TableRow
                    key={tk._id}
                    item={tk}
                    onRestore={restoreClick}
                    onDelete={deleteClick}
                  />
                ))}
              </tbody>
            </table>
            {!data?.tasks?.length && (
              <p className="text-center text-gray-500 py-4">No trashed tasks found.</p>
            )}
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </>
  );
};

export default Trash;