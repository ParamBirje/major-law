import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AvatarIcon, PaperPlaneIcon, RocketIcon } from "@radix-ui/react-icons";
import WebSources from "./web-sources";
import { useState } from "react";
import { type Message } from "@/lib/types";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const message: Message = {
      message_id: Math.random().toString(36).substring(7),
      message: String(formData.get("message")),
      role: "user",
    };
    setMessages([...messages, message]);
    setNewMessage("");
  }

  return (
    <section id="chat" className="flex flex-col gap-8">
      <form onSubmit={handleSendMessage} className="flex gap-5">
        <Input
          className="w-full"
          title="Start your legal search here"
          name="message"
          placeholder="What does the article 15 of GDPR say?"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <Button
          type="submit"
          className="h-auto w-[15%] flex gap-2 items-center"
        >
          <p>Send</p>
          <PaperPlaneIcon />
        </Button>
      </form>

      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="md:w-2/3">
          <h3 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Messages
          </h3>
          <div className="flex flex-col-reverse gap-5">
            {messages.map((message, i) => {
              return (
                <Alert key={i}>
                  {message.role == "user" ? (
                    <AvatarIcon className="h-4 w-4" />
                  ) : (
                    <RocketIcon className="h-4 w-4" />
                  )}
                  <AlertTitle
                    className={`${
                      message.role == "ai" && "text-green-500"
                    } capitalize`}
                  >
                    {message.role}
                  </AlertTitle>
                  <AlertDescription>{message.message}</AlertDescription>
                </Alert>
              );
            })}
          </div>
        </div>

        <WebSources />
      </div>
    </section>
  );
}
