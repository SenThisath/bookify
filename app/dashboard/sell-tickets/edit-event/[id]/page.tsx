"use client";

import EventForm from "@/components/EventForm";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

const EditEvent = () => {
  const params = useParams();
  const eventId = params.id as Id<"events">;
  const event = useQuery(api.events.getEventById, { eventId });
  if (!event)
    return (
      <div className="p-4 bg-gray-100 w-[calc(50%-16px)] animate-pulse">
        <div className="flex gap-8">
          <div className="bg-gray-300 rounded-md w-[250px] h-[250px]"></div>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
            <div className="bg-gray-300 h-4 w-full rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-8 bg-gray-900 text-white shadow-lg rounded-xl max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Edit Event</h1>
        <p className="text-gray-400 mb-4 text-center">
          Update the details of your event below. Make sure all fields are
          filled correctly.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg shadow-inner">
          <EventForm
            mode="update"
            initialData={{
              title: event.title,
              description: event.description,
              location: event.location,
              date: event.date,
              price: event.price,
              totalTickets: event.totalTickets,
              eventId,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
