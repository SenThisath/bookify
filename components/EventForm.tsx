"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const formSchema = z.object({
    title: z.string().min(1, "Event title is required."),
    description: z.string().min(1, "Event Description is required."),
    date: z
        .date()
        .min(
            new Date(new Date().setHours(0, 0, 0, 0)),
            "Event date must be in the future"
        ),
    location: z.string().min(1, "Event location is required"),
    price: z.number().min(1, "Event price must be 0 or greater"),
    totalTickets: z.number().min(1, "Event must have at least 1 ticket"),
});

const EventForm = ({
    mode,
    initialData,
}: {
    mode: "new" | "update";
    initialData?: {
        eventId: Id<"events">;
        title: string;
        description: string;
        date: number;
        location: string;
        price: number;
        imageUrl?: string;
        totalTickets: number;
        isCancelled?: false;
    };
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title ?? "",
            description: initialData?.description ?? "",
            date: initialData ? new Date(initialData.date) : new Date(),
            location: initialData?.location ?? "",
            price: initialData?.price ?? 0,
            totalTickets: initialData?.totalTickets ?? 1,
        },
    });

    const { user } = useUser();
    const createEvent = useMutation(api.events.createEvent);
    const updateEvent = useMutation(api.events.updateEvent);
    const router = useRouter();

    const onSubmit = async ({
        title,
        description,
        date,
        location,
        price,
        totalTickets,
    }: z.infer<typeof formSchema>) => {
        if (!user?.id) return;
        // Removed unnecessary check for initialData
        if (mode === "new") {
            const eventId = await createEvent({
                creatorId: user.id,
                title,
                description,
                date: date.getTime(),
                location,
                price,
                totalTickets,
            });
            router.push(`/dashboard/event/${eventId}`);
        } else {
            await updateEvent({
                title,
                description,
                location,
                date: date.getTime(),
                price,
                totalTickets,
                eventId: initialData?.eventId as Id<"events">,
            });
            router.push(`/dashboard/event/${initialData?.eventId}`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter event title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter event location"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Provide a brief description of the event"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.value ?
                                                    new Date(e.target.value)
                                                :   null
                                            );
                                        }}
                                        value={
                                            field.value ?
                                                new Date(field.value)
                                                    .toISOString()
                                                    .split("T")[0]
                                            :   ""
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="0.00"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalTickets"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Tickets</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter total tickets"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="submit" className="w-full sm:w-auto">
                        {mode === "new" ? "Create Event" : "Update Event"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EventForm;
