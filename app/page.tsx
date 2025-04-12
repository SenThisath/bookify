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
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <CalendarDays />
          <span className="text-2xl font-bold">BOOKIFY</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about">ABOUT</a>
          <a href="#services">SERVICES</a>
          <a href="#technologies">TECHNOLOGIES</a>
          <a href="#contact">HOW TO</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button asChild>
            <Link href={""}>CONTACT US</Link>
          </Button>
          <Button asChild>
            <Link href={""}>JOIN HYDRA</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-6">
            <div>Book Your Next</div>
            <div className="mt-6">
              <span className="bg-primary text-primary-foreground px-4 py-2 rounded">
                Adventure with Ease
              </span>
            </div>
          </h1>
          <p className="text-gray-400 mb-8">
            Discover the best events, concerts, and travel destinations. Secure
            your tickets in just a few clicks and make unforgettable memories.
          </p>
          <Button asChild>
            <Link href={"/dashboard"}>
              BUILD YOUR WORLD <ArrowRight size={20} />
            </Link>
          </Button>
        </div>
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800"
            alt="VR Experience"
            width={600}
            height={600}
            className="rounded-3xl relative z-10"
          />
        </div>
      </section>

      {/* Contact Cards */}
      <section className="px-8 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-primary text-primary-foreground p-6 rounded-2xl flex items-center gap-4">
            <MapPin size={24} />
            <div>
              <h3 className="font-semibold">Pay Us a Visit</h3>
              <p className="text-sm text-gray-400">
                Union St, Seattle, WA 98101
              </p>
            </div>
          </div>
          <div className="bg-primary text-primary-foreground p-6 rounded-2xl flex items-center gap-4">
            <Phone size={24} />
            <div>
              <h3 className="font-semibold">Give Us a Call</h3>
              <p className="text-sm text-gray-400">(110) 1111-1010</p>
            </div>
          </div>
          <div className="bg-primary text-primary-foreground p-6 rounded-2xl flex items-center gap-4">
            <Mail size={24} />
            <div>
              <h3 className="font-semibold">Send Us a Message</h3>
              <p className="text-sm text-gray-400">Contact@HydraVR.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-6">
              <div>Book Your Next</div>
              <div className="mt-6">
                <span className="bg-primary text-primary-foreground px-4 py-2 rounded">
                  Adventure with Ease
                </span>
              </div>
            </h2>
            <p className="text-gray-400">
              Hydra VR is at the forefront of virtual reality technology,
              creating immersive experiences that transform how we interact with
              digital worlds. Our cutting-edge solutions combine advanced
              hardware with innovative software to deliver unparalleled virtual
              reality experiences.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?q=80&w=800"
              alt="VR Technology"
              width={500}
              height={500}
              className="rounded-3xl"
            />
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

      {/* Technologies Section */}
      <section id="technologies" className="px-8 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">TECHNOLOGIES</h2>
        <div className="mt-6 text-center">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded">
            Used by Bookify
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-6">
          {technologies.map(({ desc }, index) => (
            <div className="flex flex-col items-center" key={index}>
              <div className="w-32 h-32  rounded-full flex items-center justify-center mb-4">
                <Image src="/logo.svg" alt="Unreal" width={64} height={64} />
              </div>
              <span className="text-purple-400">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="px-8 py-20 max-w-3xl mx-auto">
        <div className=" p-12 rounded-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center">JOIN HYDRA</h2>
          <p className="text-center text-gray-400 mb-12">
            Let&apos;s Build Your VR Experience
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                        <Input placeholder="shadcn" {...field} />
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
                        <Input placeholder="shadcn" {...field} />
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
                        <Input placeholder="shadcn" {...field} />
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
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays />
              <span className="text-2xl font-bold">BOOKIFY</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">ABOUT</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About</li>
              <li>Services</li>
              <li>Technologies</li>
              <li>How to</li>
            </ul>
          </div>
          <div className="flex gap-4 items-start">
            {links.map(({ link, title }, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button asChild>
                      <Link href={link}>
                        <Image src={""} alt=""></Image>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          2024 © HYDRA LANDING PAGE - BY JANE A. PAQUOT - ALL RIGHTS RESERVED
        </div>
      </footer>
    </main>
  );
}
