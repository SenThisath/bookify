"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Event from "@/components/Event";
import { Frown } from "lucide-react";

const EventList = () => {
  const events = useQuery(api.events.getAllEvents);

  if (!events)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );

  if (events.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Frown size={80} />
        <p className="text-lg">No events to display</p>
        <p className="text-sm text-gray-400">Check back later for updates!</p>
      </div>
    );

  return (
    <div className="m-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-accent-foreground border-b-2 border-accent-foreground pb-2">
          🚀 Upcoming Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 bg-accent shadow-md rounded-lg p-4">
          {events.map(
            (event) =>
              event.date > Date.now() && (
                <Event key={event._id} eventId={event._id} />
              )
          )}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4 text-accent-foreground border-b-2 border-accent-foreground pb-2">
          🕒 Past Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 bg-accent shadow-md rounded-lg p-4">
          {events.map(
            (event) =>
              event.date < Date.now() && (
                <Event key={event._id} eventId={event._id} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
