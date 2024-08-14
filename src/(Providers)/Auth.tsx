"use client";
import { fetchUser } from "@/lib/apiCalls/profile";
import { useUserStore } from "@/lib/store";
import React, { useEffect } from "react";

const Auth = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    const fetchUserFunc = async () => {
      try {
        const payload = await fetchUser();
        if (payload.success) {
          setUser(payload.user);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    fetchUserFunc();
  }, []);

  return <></>;
};

export default Auth;
