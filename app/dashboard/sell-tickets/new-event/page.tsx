import EventForm from "@/components/EventForm";
import React from "react";

const NewEventPage = () => {
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl shadow-lg rounded-lg p-8 bg-secondary">
        {/* bg-primary*/}
        <h1 className="text-2xl font-bold mb-6">Create a New Event</h1>
        <p className="mb-8">
          Fill out the form below to create a new event. Make sure to provide
          all the necessary details.
        </p>
        <EventForm mode="new" />
      </div>
    </div>
  );
};

export default NewEventPage;
