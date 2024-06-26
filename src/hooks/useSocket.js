import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const socketIo = io(url);

    socketIo.on("connect", () => {
      setSocket(socketIo);
      setError(null);
      setConnected(true);
    });
    socketIo.on("connect_error", (err) => {
      setError(err);
      setSocket(null); // Reset socket on error
    });
    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  const emitEvent = (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  return {
    socket,
    error,
    connected,
    emitEvent,
  };
};
export default useSocket;
