"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axiosInstance from "../lib/axios";
import { formatDate, addDays } from "../utils/dateTimeUtils";
import { Todo } from "./types";
import FilterSection from "./FilterSection";
import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";

function TodoPage() {
  const [data, setData] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<
    Omit<Todo, "_id" | "created_at" | "updated_at">
  >({
    name: "",
    desp: "",
    due_date: "",
    task_status: "",
  });
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState("due_date_asc");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDateFrom, setFilterDateFrom] = useState(addDays(-30));
  const [filterDateTo, setFilterDateTo] = useState(addDays(60));
  const [showFilters, setShowFilters] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // This effect will run once when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Reset filter applied state
  useEffect(() => {
    if (isFilterApplied) {
      fetchData();
      setIsFilterApplied(false);
    }
  }, [filterStatus, filterDateFrom, filterDateTo, sortOption, isFilterApplied]);

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        ...(filterStatus && { status: filterStatus }),
        ...(filterDateFrom && { dateFrom: filterDateFrom }),
        ...(filterDateTo && { dateTo: filterDateTo }),
        ...(sortOption && { sort: sortOption }),
        timestamp: new Date().getTime(),
      }).toString();

      const response = await axiosInstance.get(`/tasks?${queryParams}`);
      setData(response.data);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
    if (isEditing && editTodo) {
      setEditTodo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateOptionChange = (option: string) => {
    let dueDate = "";
    switch (option) {
      case "Today":
        dueDate = addDays(0);
        break;
      case "Tomorrow":
        dueDate = addDays(1);
        break;
      case "Next Week":
        dueDate = addDays(7);
        break;
      default:
        dueDate = "";
    }
    if (isEditing && editTodo)
      setEditTodo((prev) => ({ ...prev, due_date: dueDate }));
    else setNewTodo((prev) => ({ ...prev, due_date: dueDate }));
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const response = await axiosInstance.post("/tasks", newTodo);
      //setData((prev) => [...prev, response.data]);
      fetchData();
      setNewTodo({
        name: "",
        desp: "",
        due_date: "",
        task_status: "",
      });
    } catch (error) {
      let errorMessage = "Error adding todo. Please try again.";
      if (error.response) {
        errorMessage = error.response?.data || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }
      setError(errorMessage);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo({
      ...todo,
      due_date: formatDate(todo.due_date),
    });
    setIsEditing(true);
  };

  const handleSaveEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (editTodo) {
      try {
        setError("");

        const updateTodo = {
          name: editTodo.name,
          desp: editTodo.desp,
          due_date: editTodo.due_date,
          task_status: editTodo.task_status,
        };
        await axiosInstance.put(`/tasks/${editTodo._id}`, updateTodo);
        // setData((prev) =>
        //   prev.map((item) => (item._id === editTodo._id ? editTodo : item))
        // );

        fetchData();

        setIsEditing(false);
        setEditTodo(null);
      } catch (error) {
        let errorMessage = "Error adding todo. Please try again.";
        if (error.response) {
          errorMessage = error.response?.data || errorMessage;
        } else {
          errorMessage = error.message || errorMessage;
        }
        setError(errorMessage);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        setError("");

        await axiosInstance.delete(`/tasks/${id}`);
        setData((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        setError("Error deleting todo");
      }
    }
  };

  const handleFilterApply = () => {
    setIsFilterApplied(true);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">ToDo Listing</h1>

      <FilterSection
        filterStatus={filterStatus}
        filterDateFrom={filterDateFrom}
        filterDateTo={filterDateTo}
        sortOption={sortOption}
        setFilterStatus={setFilterStatus}
        setFilterDateFrom={setFilterDateFrom}
        setFilterDateTo={setFilterDateTo}
        setSortOption={setSortOption}
        handleFilterApply={handleFilterApply}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <TodoForm
        newTodo={newTodo}
        editTodo={editTodo}
        isEditing={isEditing}
        handleChange={handleChange}
        handleDateOptionChange={handleDateOptionChange}
        handleSubmit={isEditing ? handleSaveEdit : handleAdd}
        handleCancel={() => setIsEditing(false)}
      />

      {error && <div className="text-red-600">Error: {error}</div>}

      <TodoTable
        data={data}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default TodoPage;
