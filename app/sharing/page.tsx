"use client";

import { useWebSocket } from "../hooks/useWebSocket";
import { useState, useEffect } from "react";
import { Todo } from "../todo/types";
import { formatDate, addDays } from "../utils/dateTimeUtils";

export default function sharing() {
  const { messages, sendMessage } = useWebSocket("ws://localhost:3030");
  //const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(messages);
  }, [messages]);

  return (
    <div>
      <h1>Shared To do listing</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">Name</th>
            <th className="border p-2">Desc</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.desp}</td>
              <td className="border p-2">{formatDate(item.due_date)}</td>
              <td className="border p-2">{item.task_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
