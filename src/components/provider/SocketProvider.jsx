"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";

const socket = io("https://real-state-project-coral.vercel.app", {
  crossDomain: true,
});

function SocketProvider({ children }) {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Listen for the 'notification' event from the server
    socket.on("notification", (data) => {
      setNotification(data.message);
      toast.success(data.messag);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   socket.on("newNotification", (data) => {
  //     // Handle the new notification
  //     console.log(data);
  //     // Update the UI to display the new notification
  //   });

  //   return () => socket.disconnect();
  // }, []);
  return <div>{children}</div>;
}

export default SocketProvider;
