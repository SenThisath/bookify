"use client";

import Event from "@/components/Event";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

const MyTickets = () => {
  const { user } = useUser();
  const events = useQuery(api.events.getEventsOfUser, {
    userId: user?.id ?? "",
  });

  return (
    <div className="p-6 min-h-screen">
      {events?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-gray-500">
            You haven&apos;t created any events yet. Start by creating your first
            event!
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">My Events</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {events?.map((event) => (
              <Event eventId={event._id} key={event._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyTickets;
