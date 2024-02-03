"use client";
import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

function SocketProvider({ children }) {
  useEffect(() => {
    socket.on("newNotification", (data) => {
      // Handle the new notification
      console.log(data);
      // Update the UI to display the new notification
    });

    return () => socket.disconnect();
  }, []);
  return <div>{children}</div>;
}

export default SocketProvider;
