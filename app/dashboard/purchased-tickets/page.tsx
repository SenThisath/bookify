"use client";

import Event from "@/components/Event";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";

const PurchasedTickets = () => {
  const { user } = useUser();
  const purchasedTickets = useQuery(api.tickets.getUserTickets, {
    userId: user?.id ?? "",
  });
  return (
    <div className="p-6 h-full">
      {purchasedTickets?.length === 0 ? (
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
          <h2 className="text-xl text-gray-600">No tickets purchased yet</h2>
          <p className="text-gray-400">
            Your purchased tickets will appear here
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-8">My Purchased Tickets</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {purchasedTickets?.map((ticket) => (
              <Event eventId={ticket.eventId} key={ticket._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PurchasedTickets;
