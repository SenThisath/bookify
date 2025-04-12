"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { purchaseTicket } from "@/app/actions/purchaseTicket";

const Event = ({ eventId }: { eventId: Id<"events"> }) => {
    const redirect = useRouter();
    const { user } = useUser();

    const event = useQuery(api.events.getEventById, { eventId });

    const availability = useQuery(api.waitingList.getWaitingStatus, {
        eventId,
        userId: user?.id ?? "",
    });

    const isCurrentUserEventOwner = useQuery(
        api.events.isCurrentUserEventOwner,
        {
            eventId,
            userId: user?.id ?? "",
        }
    );

    const isEventSoldOut = useQuery(api.events.isEventSoldOut, { eventId });

    const setWaitingStatus = useMutation(api.waitingList.setwaitingStatus);
    const setticketStatus = useMutation(api.tickets.updateTicketStatus);
    const removeWaiting = useMutation(api.waitingList.removeWaiting);

    const getQueue = useQuery(api.waitingList.getQueue, {
        eventId,
        userId: user?.id ?? "",
    });

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

    console.log(availability);

    const isPastEvent = event.date < Date.now();

    const buttonStatus = () => {
        if (isCurrentUserEventOwner) {
            return (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        redirect.push(
                            `/dashboard/sell-tickets/edit-event/${eventId}`
                        );
                    }}
                >
                    Edit Event
                </Button>
            );
        } else if (availability && availability.status === "offered") {
            return (
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        purchaseTicket(eventId);
                    }}
                >
                    Purchase Ticket
                </Button>
            );
        }
        if (availability && availability?.status === "purchased") {
            return (
                <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                        className="flex-shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            redirect.push(`/dashboard/ticket/${eventId}`);
                        }}
                    >
                        View Your Ticket
                    </Button>
                    <Button
                        className="flex-shrink-0"
                        variant="destructive"
                        onClick={(e) => {
                            e.stopPropagation();
                            setWaitingStatus({
                                eventId,
                                userId: user?.id ?? "",
                                status: "released",
                            });
                            setticketStatus({
                                eventId,
                                userId: user?.id ?? "",
                                status: "cancelled",
                            });
                            console.log("Release Ticket");
                        }}
                    >
                        Release Ticket
                    </Button>
                </div>
            );
        }
        if (availability && availability?.status === "waiting") {
            return (
                <>
                    {(
                        getQueue?.userPosition === 1 &&
                        !isEventSoldOut?.isSoldOut
                    ) ?
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setWaitingStatus({
                                    eventId,
                                    userId: user?.id ?? "",
                                    status: "offered",
                                });
                            }}
                        >
                            Book Now
                        </Button>
                    :   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                            <p className="text-blue-600 mt-2">
                                Your current position is{" "}
                                <span className="font-bold">
                                    {getQueue?.userPosition}
                                </span>{" "}
                                out of{" "}
                                <span className="font-bold">
                                    {getQueue?.queueLength}
                                </span>
                                .
                                <br />
                                Please check back later to see if a ticket has
                                been offered to you.
                            </p>
                        </div>
                    }
                </>
            );
        } else {
            return (
                <Button
                    onClick={async (e) => {
                        e.stopPropagation();
                        if (isEventSoldOut?.isSoldOut) {
                            await setWaitingStatus({
                                eventId,
                                userId: user?.id ?? "",
                                status: "waiting",
                            });
                        } else {
                            await setWaitingStatus({
                                eventId,
                                userId: user?.id ?? "",
                                status: "offered",
                            });
                        }
                    }}
                >
                    {isEventSoldOut?.isSoldOut ?
                        "Join waiting List"
                    :   "Book Now"}
                </Button>
            );
        }
    };

    return (
        <div
            className="p-8 bg-background border rounded-xl shadow-sm hover:shadow-md w-full cursor-pointer transition-all duration-200 relative"
            onClick={() => redirect.push(`/dashboard/event/${eventId}`)}
        >
            <button
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={async (e) => {
                    e.stopPropagation();
                    if (availability?.status !== "purchased") {
                        if (availability?.status === "wished") {
                            removeWaiting({ userId: user?.id ?? "", eventId });
                        } else {
                            await setWaitingStatus({
                                userId: user?.id ?? "",
                                eventId,
                                status: "wished",
                            });
                        }
                    }
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500 transition-colors"
                    fill={availability?.status === "wished" ? "red" : "white"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                    {isCurrentUserEventOwner && (
                        <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            Your Event
                        </span>
                    )}
                    {availability && availability.status === "purchased" && (
                        <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            Purchased
                        </span>
                    )}
                    {isPastEvent && (
                        <span className="bg-red-50 text-red-700 text-xs font-medium px-2.5 py-1 rounded-full">
                            Expired
                        </span>
                    )}
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">{event.title}</h2>
                    <p className="text-sm line-clamp-2">{event.description}</p>
                    {!isPastEvent && <div>{buttonStatus()}</div>}
                </div>

                {!isPastEvent &&
                    getQueue &&
                    availability?.status !== "purchased" &&
                    !isCurrentUserEventOwner && (
                        <div>
                            {availability?.status === "waiting" ?
                                null
                            : isEventSoldOut?.isSoldOut ?
                                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                    <p className="text-red-700 text-sm">
                                        This event is sold out. Join the waiting
                                        list or check back later.
                                    </p>
                                </div>
                            : getQueue?.offeredCount > 0 ?
                                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                    <p className="text-yellow-700 text-sm">
                                        {getQueue.offeredCount}{" "}
                                        {getQueue.offeredCount === 1 ?
                                            "person is"
                                        :   "people are"}{" "}
                                        currently trying to buy this ticket.
                                    </p>
                                </div>
                            :   <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                    <p className="text-green-700 text-sm">
                                        No one is currently trying to buy this
                                        ticket. You have a great chance!
                                    </p>
                                </div>
                            }
                        </div>
                    )}

                <div className="pt-4 border-t">
                    <p className="text-2xl font-bold text-primary">
                        ${event.price}
                    </p>
                    <p className="text-sm mt-1">
                        {isEventSoldOut?.ticketsSold} /{" "}
                        {isEventSoldOut?.totalTickets} tickets sold
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="font-medium">Date: </span>
                        {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div>
                        <span className="font-medium">Time: </span>
                        {new Date(event.date).toLocaleTimeString()}
                    </div>
                    <div className="col-span-2">
                        <span className="font-medium">Location: </span>
                        {event.location}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;
