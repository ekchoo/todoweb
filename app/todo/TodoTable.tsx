import React from "react";
import { Todo } from "./types";
import { formatDate, addDays } from "../utils/dateTimeUtils";

type TodoTableProps = {
  data: Todo[];
  handleEdit: (todo: Todo) => void;
  handleDelete: (id: string) => void;
};

const TodoTable: React.FC<TodoTableProps> = ({
  data,
  handleEdit,
  handleDelete,
}) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="border p-2">Name</th>
          <th className="border p-2">Desc</th>
          <th className="border p-2">Due Date</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td className="border p-2">{item.name}</td>
            <td className="border p-2">{item.desp}</td>
            <td className="border p-2">{formatDate(item.due_date)}</td>
            <td className="border p-2">{item.task_status}</td>
            <td className="border p-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoTable;
