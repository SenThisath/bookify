"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import QRCode from "react-qr-code";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Ticket = () => {
  const params = useParams();
  const { user } = useUser();
  const redirect = useRouter();
  const eventId = params.id as Id<"events">;
  const event = useQuery(api.events.getEventById, { eventId });
  const ticket = useQuery(api.tickets.getTicket, {
    eventId,
    userId: user?.id ?? "",
  });

  return (
    <div className="flex items-center justify-center h-full bg-gray-100 font-sans">
      <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex items-center p-3 border-b border-dashed border-gray-300 bg-gray-50">
          <Button
            className="flex items-center text-blue-600 font-semibold text-sm cursor-pointer"
            onClick={() => {
              redirect.push("/dashboard");
            }}
            variant={"ghost"}
          >
            Back to Dashboard
          </Button>
        </div>
        <div className="p-5 border-b border-dashed border-gray-300 text-center">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            🎟️ Event Ticket
          </h1>
          {event ? (
            <div className="text-left space-y-4">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {event.title}
              </h2>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 bg-blue-100 rounded-full">
                  <span className="text-blue-600 text-lg font-bold">📅</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Date
                  </p>
                  <p className="text-sm text-gray-800">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 bg-green-100 rounded-full">
                  <span className="text-green-600 text-lg font-bold">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Location
                  </p>
                  <p className="text-sm text-gray-800">{event.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 bg-yellow-100 rounded-full">
                  <span className="text-yellow-600 text-lg font-bold">📝</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">
                    Description
                  </p>
                  <p className="text-sm text-gray-800">{event.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 animate-pulse">
              Loading event details...
            </p>
          )}
        </div>
        <div className="p-5 text-center bg-gray-50">
          {ticket === undefined ? (
            <p className="text-sm text-gray-600 animate-pulse">
              Loading ticket information...
            </p>
          ) : ticket?.userId === user?.id ? (
            <div className="my-3 p-8 border-2 border-dashed border-blue-600 rounded-lg bg-blue-50">
              <div className="flex flex-col items-center">
                <p className="text-blue-600 text-sm font-medium mb-3">
                  Scan this QR Code to access your ticket
                </p>
                <div className="bg-white p-3 rounded-lg shadow-md">
                  {ticket && <QRCode value={ticket?._id} size={128} />}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-600 text-sm font-medium">
              🚨 Oops! This ticket is not associated with your account. Please
              double-check your details.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  {
    /*
     * get the user ticket
     * react-qr-code
     * get the ticket
     *
     */
  }
};

export default Ticket;
