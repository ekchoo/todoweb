import { useEffect, useState } from "react";

export const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      try {
        //console.log(event);
        const data = JSON.parse(event.data);
        console.log("in useWebSocket=" + data);

        setMessages(data);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};
