"use client";

import Event from "@/components/Event";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Heart } from "lucide-react";

const WishList = () => {
  const { user } = useUser();
  const wishList = useQuery(api.waitingList.getWishList, {
    userId: user?.id ?? "",
  });
  return (
    <div className="min-h-screen p-8">
      {wishList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
          <Heart />
          <h3 className="text-lg font-medium text-gray-900">
            Your wish list is empty
          </h3>
          <p className="text-gray-500">
            Start adding events you&apos;re interested in!
          </p>
        </div>
      ) : (
        <>
          <h1 className="mb-8 text-3xl font-bold">My Wish List</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {wishList?.map((event) => (
              <Event eventId={event.eventId} key={event._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
