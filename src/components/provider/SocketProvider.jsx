"use client";
import React from "react";
import Pusher from "pusher-js/with-encryption";
import { toast } from "react-toastify";
function SocketProvider({ children }) {
  let pusher = new Pusher("cff34d30244d68cc8e32", {
    cluster: "ap2",
  });

  // Subscribe to the appropriate channel
  let channel = pusher.subscribe("RTN-web");

  console.log("Socket running");

  // Bind a callback function to an event within the subscribed channel
  channel.bind("new-notification", function (data) {
    console.log(data, "Push notificatioin data");
    if (data?.message) {
      toast.success(data?.message);
    } // Do what you wish with the data from the event
  });
  return <div>{children}</div>;
}

export default SocketProvider;
