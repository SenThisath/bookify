"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    CalendarDays,
    Hourglass,
    LucideProps,
    Mail,
    MapPin,
    Phone,
    Smartphone,
    Ticket,
    Zap,
} from "lucide-react";
import { createElement, ForwardRefExoticComponent, RefAttributes } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Home() {
    const whyChooseUs: {
        title: string;
        desc: string;
        icon: ForwardRefExoticComponent<
            Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
        >;
    }[] = [
        {
            title: "Wide Selection of Events",
            desc: "Find concerts, sports, theater shows, and more in one place.",
            icon: Ticket,
        },
        {
            title: "Seamless Booking Experience",
            desc: "Fast, secure, and hassle-free ticket purchasing.",
            icon: Zap,
        },
        {
            title: "Smart Waiting System",
            desc: "Never miss out! Our queue system ensures fair ticket access during high demand.",
            icon: Hourglass,
        },
        {
            title: "Instant E-Tickets",
            desc: "Receive your tickets instantly on your phone or email.",
            icon: Smartphone,
        },
    ];

    const technologies: { image: string; desc: string }[] = [
        {
            image: "",
            desc: "Next.js",
        },
        { image: "", desc: "Clerk" },
        { image: "", desc: "Convex" },
        { image: "", desc: "Stripe" },
    ];

    const links: { link: string; title: string }[] = [
        { link: "https://youtube.com", title: "YouTube" },
        { link: "https://facebook.com", title: "FaceBook" },
        { link: "https://instagram.com", title: "Instagram" },
        { link: "https://twitter.com", title: "X" },
    ];

    const formSchema = z.object({
        firstname: z.string().max(50).nonempty("First name cannot be empty"),
        lastname: z.string().max(50).nonempty("Last name cannot be empty"),
        email: z.string().email(),
        subject: z.string().max(50).nonempty("Subject cannot be empty"),
        message: z.string().nonempty("Message cannot be empty"),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <main className="min-h-screen">
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <CalendarDays />
                    <span className="text-2xl font-bold">BOOKIFY</span>
                </div>
                <ThemeToggle />
            </nav>

            <section className="px-8 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-5xl font-bold mb-6">
                        <div>Book Your Next Movie Night with Ease</div>
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Browse upcoming blockbusters and reserve your seats in
                        seconds. Bookify brings you a smooth, hassle-free movie
                        ticket booking experience.
                    </p>
                    <Button asChild>
                        <Link href={"/dashboard"}>
                            Book Now <ArrowRight size={20} />
                        </Link>
                    </Button>
                </div>
                <div className="relative">
                    <Image
                        src="/hero2.jpg"
                        alt="hero2"
                        width={600}
                        height={600}
                        className="rounded-3xl relative z-10"
                    />
                </div>
            </section>

            {/* Introduction Section */}
            <section className="px-8 py-20 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <Image
                            src="/hero.jpg"
                            alt="hero1"
                            width={500}
                            height={500}
                            className="rounded-3xl"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-5xl font-bold mb-6">
                            <div>Reserve Your Favorite Seats Instantly</div>
                        </h2>
                        <p className="text-gray-400">
                            Bookify allows you to view real-time seat
                            availability and reserve your favorite spots for any
                            showtime. No queues, no stress — just seamless movie
                            magic at your fingertips.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="px-8 py-20 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold mb-12 text-center">
                    WHY CHOOSE BOOKIFY?
                </h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {whyChooseUs.map(({ title, desc, icon }, index) => (
                        <div
                            key={index}
                            className="bg-primary text-primary-foreground p-8 rounded-2xl text-center group"
                        >
                            <div className="w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center">
                                {createElement(icon, { size: 40 })}
                            </div>
                            <h3 className="font-semibold mb-4">{title}</h3>
                            <p className="text-sm">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="px-8 py-20 max-w-3xl mx-auto">
                <div className=" p-12 rounded-3xl">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        JOIN HYDRA
                    </h2>
                    <p className="text-center text-gray-400 mb-12">
                        Let&apos;s Build Your VR Experience
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us your message..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </section>

            {/* Footer */}
            <footer className=" px-8 py-12">
                <div className="max-w-7xl flex items-center justify-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <CalendarDays />
                            <span className="text-2xl font-bold">BOOKIFY</span>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                    2024 © BOOKIFY - BY SENUKA THISATHT - ALL RIGHTS RESERVED
                </div>
            </footer>
        </main>
    );
}
