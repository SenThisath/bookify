"use client";

import Event from "@/components/Event";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const EventPage = () => {
  const params = useParams();
  const redirect = useRouter();
  const eventId = params.id as Id<"events">;
  const event = useQuery(api.events.getEventById, { eventId });
  const { user } = useUser();
  if (!event) return;
  const isPastEvent = event.date < Date.now();
  return (
    <div className="h-full p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => redirect.push(`/dashboard`)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-left"
              >
                ← Back to Dashboard
              </button>
              <div className="h-48 relative">
                <div
                  className={`absolute inset-0 ${isPastEvent ? "bg-gradient-to-r from-red-600 to-red-800" : "bg-gray-200"} flex items-center justify-center p-4`}
                >
                  <h1 className="text-2xl md:text-4xl font-bold text-center">
                    {isPastEvent ? (
                      <span className="text-white">{event.title}</span>
                    ) : (
                      <span className="text-gray-700">{event.title}</span>
                    )}
                  </h1>
                </div>
              </div>

              <div className="p-4 md:p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className={`px-3 py-1 ${isPastEvent ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"} rounded-full text-sm font-medium`}
                  >
                    Event Details
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                    {new Date(event._creationTime).toLocaleDateString()}
                  </span>
                </div>

                <p
                  className={`${isPastEvent ? "text-red-600" : "text-gray-600"} leading-relaxed mb-6`}
                >
                  {event.description}
                </p>

                <div className="space-y-4">
                  <h2
                    className={`text-lg font-semibold ${isPastEvent ? "text-red-700" : "text-gray-700"}`}
                  >
                    Event Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div
                      className={`p-3 ${isPastEvent ? "bg-red-50" : "bg-gray-50"} rounded-xl`}
                    >
                      <h3
                        className={`font-medium ${isPastEvent ? "text-red-700" : "text-gray-700"}`}
                      >
                        Location
                      </h3>
                      <p
                        className={`${isPastEvent ? "text-red-600" : "text-gray-600"} mt-1`}
                      >
                        {event.location || "TBA"}
                      </p>
                    </div>
                    <div
                      className={`p-3 ${isPastEvent ? "bg-red-50" : "bg-gray-50"} rounded-xl`}
                    >
                      <h3
                        className={`font-medium ${isPastEvent ? "text-red-700" : "text-gray-700"}`}
                      >
                        Capacity
                      </h3>
                      <p
                        className={`${isPastEvent ? "text-red-600" : "text-gray-600"} mt-1`}
                      >
                        {event.totalTickets}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Event eventId={eventId} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h3
                    className={`text-lg font-semibold ${isPastEvent ? "text-red-700" : "text-gray-700"}`}
                  >
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {user?.emailAddresses?.[0]?.emailAddress ??
                      "No email provided"}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-3 p-4 ${isPastEvent ? "bg-red-50" : "bg-gray-50"} rounded-xl mb-6`}
              >
                <Calendar
                  className={`w-5 h-5 ${isPastEvent ? "text-red-700" : "text-gray-700"}`}
                />
                <div>
                  <p
                    className={`text-sm ${isPastEvent ? "text-red-700" : "text-gray-700"} font-medium pb-1`}
                  >
                    Date & Time
                  </p>
                  <p
                    className={`text-sm ${isPastEvent ? "text-red-600" : "text-gray-600"}`}
                  >
                    {new Date(event.date).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p
                  className={`text-sm ${isPastEvent ? "text-red-700" : "text-gray-600"}`}
                >
                  Status: {isPastEvent ? "Past Event" : "Upcoming Event"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
