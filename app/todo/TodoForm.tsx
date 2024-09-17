import React, { ChangeEvent, FormEvent } from "react";
import { Todo } from "./types";

interface TodoFormProps {
  newTodo: Omit<Todo, "_id" | "created_at" | "updated_at">;
  editTodo: Todo | null;
  isEditing: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDateOptionChange: (option: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  newTodo,
  editTodo,
  isEditing,
  handleChange,
  handleDateOptionChange,
  handleSubmit,
  handleCancel,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-lg border-gray-300 shadow-sm"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={isEditing ? editTodo?.name || "" : newTodo.name}
        onChange={handleChange}
        className="mb-4 p-2 border rounded-md border-gray-300 w-full"
      />
      <input
        type="text"
        name="desp"
        placeholder="Description"
        value={isEditing ? editTodo?.desp || "" : newTodo.desp}
        onChange={handleChange}
        className="mb-4 p-2 border rounded-md border-gray-300 w-full"
      />
      <div className="mb-4">
        <label className="block mb-2">Due Date:</label>
        <div className="flex space-x-2 mb-2">
          <button
            type="button"
            onClick={() => handleDateOptionChange("Today")}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => handleDateOptionChange("Tomorrow")}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Tomorrow
          </button>
          <button
            type="button"
            onClick={() => handleDateOptionChange("Next Week")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Next Week
          </button>
          <input
            type="date"
            name="due_date"
            placeholder="Pick a Date"
            value={
              isEditing ? editTodo?.due_date || "" : newTodo.due_date || ""
            }
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300"
          />
        </div>
      </div>
      {isEditing && (
        <select
          name="task_status"
          value={
            isEditing
              ? editTodo?.task_status || "Not Started"
              : newTodo.task_status
          }
          onChange={handleChange}
          className="mb-4 p-2 border rounded-md border-gray-300 w-full"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        {isEditing ? "Save Changes" : "Add Todo"}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={handleCancel}
          className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;
