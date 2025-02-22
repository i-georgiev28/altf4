"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence } from "framer-motion";
import { Notification } from "@/components/ui/Notification";

const Contact = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowNotification(true);
  };

  // Auto-dismiss notification after 5 seconds (optional)
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                Contact Us
              </h1>
              <p className="text-muted-foreground">
                We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
              </p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  (123) 34567890
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href="" className="underline">
                    your-email@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-screen-md flex-col gap-6 rounded-lg border p-10">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input type="text" id="firstname" placeholder="First Name" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input type="text" id="lastname" placeholder="Last Name" />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input type="text" id="subject" placeholder="Subject" />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea placeholder="Type your message here." id="message" />
              </div>
              <Button type="submit" className="w-full mt-4">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <Notification
            message="Your message has been sent!"
            onClose={() => setShowNotification(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export { Contact };
