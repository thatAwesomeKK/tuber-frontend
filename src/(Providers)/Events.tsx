"use client";
import React, { useEffect } from "react";

const Events = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    console.log("Events Provider");

    const sse = new EventSource(process.env.NEXT_PUBLIC_AUTH_URL as string);
    function getRealtimeData(data: any) {
      console.log(data);

      // process the data here,
      // then pass it to state to be rendered
    }
    sse.onmessage = (e) => {
      console.log(e);
    };
    sse.onerror = () => {
      // error log here

      sse.close();
    };
    return () => {
      sse.close();
    };
  }, []);

  return <>{children}</>;
};

export default Events;
