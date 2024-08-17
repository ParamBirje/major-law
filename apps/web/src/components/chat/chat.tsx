import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AvatarIcon, PaperPlaneIcon, RocketIcon } from "@radix-ui/react-icons";
import WebSources from "./web-sources";
import { useState } from "react";
import { type Message } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      message_id: "1",
      role: "CHATBOT",
      message:
        "Hello! How can I help you today? I already have a knowledge base on public sources such as GDPR, CCPA, and more. You can ask me anything!",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message = String(formData.get("message"));

    try {
      setLoading(true);

      const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          session_id: String(sessionStorage.getItem("session_id") || ""),
        },
        body: JSON.stringify({
          prompt: String(message),
        }),
      });

      const data = await response.json();
      const userMessage: Message = data.user_message;
      const chatbotMessage: Message = data.chatbot_message;

      setMessages([...messages, userMessage, chatbotMessage]);
      setNewMessage("");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "An error occurred while sending the message",
      });
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <section id="chat" className="flex flex-col gap-8">
      <form onSubmit={handleSendMessage} className="flex gap-5">
        <Input
          className="w-full"
          title="Start your legal search here"
          name="message"
          required
          disabled={loading}
          placeholder="What does the article 15 of GDPR say?"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button
          type="submit"
          disabled={loading}
          className="h-auto w-[15%] flex gap-2 items-center"
        >
          <p>{loading ? "Sending" : "Send"}</p>
          <PaperPlaneIcon />
        </Button>
      </form>

      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="md:w-2/3">
          <h3 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Messages
          </h3>
          <div className="flex flex-col-reverse gap-5">
            {messages.length !== 0 &&
              messages.map((message, i) => {
                return (
                  <Alert key={i}>
                    {message.role == "USER" ? (
                      <AvatarIcon className="h-4 w-4" />
                    ) : (
                      <RocketIcon className="h-4 w-4" />
                    )}
                    <AlertTitle
                      className={`${
                        message.role == "CHATBOT" && "text-green-500"
                      } capitalize text-xs font-bold`}
                    >
                      {message.role}
                    </AlertTitle>
                    <AlertDescription>{message.message}</AlertDescription>
                  </Alert>
                );
              })}

            {loading && <Skeleton className="h-12 w-full" />}
          </div>
        </div>

        <WebSources />
      </div>
    </section>
  );
}
