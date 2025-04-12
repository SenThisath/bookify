"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

const SyncUserWithConvex = () => {
  const { user } = useUser();
  const syncUser = useMutation(api.users.syncUser);

  useEffect(() => {
    if (!user) return;
    const saveUser = async () => {
      try {
        await syncUser({
          name: user.fullName ?? "",
          email: user.emailAddresses[0].emailAddress,
          userId: user.id,
        });
      } catch (e) {
        console.log("Error Syncing With User", e);
      }
    };
    saveUser();
  }, [user, syncUser]);
  
  return null;
};

export default SyncUserWithConvex;
