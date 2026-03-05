"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AnimatedContainer } from "@/components/animations/AnimatedContainer";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import ClientOnly from "@/components/layout/ClientOnly";
import { Container } from "@/components/layout/Container";
import { Skeleton, getSocialIcon } from "@/components/ui";

import {
  getSectionTitle,
  getErrorMessage,
  contentConfig,
} from "../../../config/content-config";
import { personalInfo } from "../../../config/personal-info";


const ContactSchema = z.object({
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  senderEmail: z
    .string()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  senderName: z.string().optional().or(z.literal("")),
});

type FormData = z.infer<typeof ContactSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      subject: "",
      message: "",
      senderEmail: "",
      senderName: "",
    },
  });
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = React.useState("");

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: data.subject.trim(),
          message: data.message.trim(),
          senderEmail: data.senderEmail?.trim() || undefined,
          senderName: data.senderName?.trim() || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setSubmitMessage(result.message || "Message sent successfully!");
        reset();
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          result.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setSubmitMessage(getErrorMessage("contactForm", "tryAgain"));
    }
  };

  // Skeleton fallback while waiting for client mount
  const ContactFormSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-12" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-12" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-12" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-12 w-40" />
    </div>
  );

  return (
    <ClientOnly fallback={<ContactFormSkeleton />}>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        suppressHydrationWarning
      >
        {/* Name Field (Optional) */}
        <div className="space-y-2" suppressHydrationWarning>
          <label
            htmlFor="senderName"
            className="block text-sm font-medium text-foreground"
          >
            Your Name{" "}
            <span className="text-muted-foreground text-xs">(optional)</span>
          </label>
          <motion.input
            type="text"
            id="senderName"
            {...register("senderName")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
              errors.senderName &&
              "border-red-500 focus:ring-red-500/50 focus:border-red-500"
            }`}
            placeholder="Your name"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            suppressHydrationWarning
          />
          {errors.senderName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.senderName.message}
            </motion.p>
          )}
        </div>

        {/* Email Field (Optional) */}
        <div className="space-y-2" suppressHydrationWarning>
          <label
            htmlFor="senderEmail"
            className="block text-sm font-medium text-foreground"
          >
            Your Email{" "}
            <span className="text-muted-foreground text-xs">
              (optional, for replies)
            </span>
          </label>
          <motion.input
            type="email"
            id="senderEmail"
            {...register("senderEmail")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
              errors.senderEmail &&
              "border-red-500 focus:ring-red-500/50 focus:border-red-500"
            }`}
            placeholder="your-email@example.com"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            suppressHydrationWarning
          />
          {errors.senderEmail && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.senderEmail.message}
            </motion.p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2" suppressHydrationWarning>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-foreground"
          >
            Subject *
          </label>
          <motion.input
            type="text"
            id="subject"
            {...register("subject")}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
              errors.subject &&
              "border-red-500 focus:ring-red-500/50 focus:border-red-500"
            }`}
            placeholder="What would you like to discuss?"
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            suppressHydrationWarning
          />
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.subject.message}
            </motion.p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2" suppressHydrationWarning>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground"
          >
            Message *
          </label>
          <motion.textarea
            id="message"
            {...register("message")}
            rows={6}
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${
              errors.message &&
              "border-red-500 focus:ring-red-500/50 focus:border-red-500"
            }`}
            placeholder="Tell me about your project, opportunity, or just say hello..."
            whileFocus={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            suppressHydrationWarning
          />
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {errors.message.message}
            </motion.p>
          )}
        </div>

        {/* Submit Button with Enhanced Hover Effects */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 relative overflow-hidden group ${
            isSubmitting
              ? "bg-primary/50 cursor-not-allowed"
              : "bg-primary hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/25 transform-gpu"
          } text-primary-foreground min-w-[160px]`}
          whileHover={
            !isSubmitting
              ? {
                  scale: 1.05,
                  boxShadow:
                    "0 20px 40px rgba(var(--primary-rgb, 79, 70, 229), 0.3)",
                  transition: { duration: 0.2 },
                }
              : {}
          }
          whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        >
          {/* Shimmer Effect */}
          {!isSubmitting && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          )}

          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin relative z-10" />
              <span className="text-sm sm:text-base relative z-10">
                Sending...
              </span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base relative z-10">
                Send Message
              </span>
            </>
          )}
        </motion.button>

        {/* Status Messages */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm sm:text-base">{submitMessage}</span>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm sm:text-base">{submitMessage}</span>
          </motion.div>
        )}
      </motion.form>
    </ClientOnly>
  );
};

export default function ContactPage() {
  return (
    <div suppressHydrationWarning>
      <Container className="py-8 md:py-16">
        {/* Hero Section */}
        <AnimatedContainer delay={0.1} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Let&apos;s Connect
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Want to collaborate? Or just want to say
              hello? I&apos;d love to hear from you.
            </p>
          </motion.div>
        </AnimatedContainer>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form Section */}
          <AnimatedContainer delay={0.2}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Send a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and I&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </AnimatedContainer>

          {/* Contact Information Section */}
          <AnimatedContainer delay={0.3}>
            <div className="space-y-8">
              {/* Contact Details */}
              <div>
                <div className="mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {getSectionTitle("pages", "contact")}
                  </h2>
                </div>

                <StaggerContainer className="space-y-6">
                  {/* Email */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <a
                          href="#senderName"
                          className="text-primary hover:underline text-sm sm:text-base"
                        >
                          Use the form below
                        </a>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  {/* Location */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          Location
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          {personalInfo.location}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>

                  {/* Response Time */}
                  <StaggerItem>
                    <motion.div
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          Response Time
                        </h3>
                        <p className="text-muted-foreground text-sm sm:text-base">
                          Usually within 24 hours
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {personalInfo.availability}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              {/* Social Media Links */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Connect on Social Media
                  </h3>
                </div>
                <StaggerContainer className="grid grid-cols-2 gap-4">
                  {personalInfo.socialLinks
                    .filter(
                      (link) =>
                        link.platform.toLowerCase() !== "email" &&
                        link.platform.toLowerCase() !== "portfolio"
                    )
                    .map((link, index) => {
                      const IconComponent = getSocialIcon(link.platform);
                      return (
                        <StaggerItem key={index}>
                          <motion.a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">
                                {link.platform}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {link.username}
                              </p>
                            </div>
                          </motion.a>
                        </StaggerItem>
                      );
                    })}
                </StaggerContainer>
              </div>

              {/* Availability Status */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Current Availability
                </h3>
                <p className="text-primary font-medium mb-2">
                  {personalInfo.availability}
                </p>
                <p className="text-sm text-muted-foreground">
                  {contentConfig.messaging.recruiting.interestAreas
                    .slice(0, 3)
                    .join(", ")}{" "}
                  and collaborations. Let&apos;s discuss how we can work
                  together!
                </p>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </Container>
    </div>
  );
}
