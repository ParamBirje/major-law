import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AvatarIcon, PaperPlaneIcon, RocketIcon } from "@radix-ui/react-icons";
import WebSources from "./web-sources";

export default function Chat() {
  return (
    <section id="chat" className="flex flex-col gap-8">
      <div className="flex gap-5">
        <Input
          className="w-full"
          title="Start your legal search here"
          placeholder="What does the article 15 of GDPR say?"
        />

        <Button className="h-auto w-[15%] flex gap-2 items-center">
          <p>Send</p>
          <PaperPlaneIcon />
        </Button>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="md:w-2/3">
          <h3 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">
            Messages
          </h3>
          <div className="flex flex-col gap-5">
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle className="text-green-500">Assistant</AlertTitle>
              <AlertDescription>
                Yes certainly, what article do you need help with?
              </AlertDescription>
            </Alert>
            <Alert>
              <AvatarIcon className="h-4 w-4" />
              <AlertTitle>User</AlertTitle>
              <AlertDescription>
                Hey I need help with a certain article in GDPR?
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <WebSources />
      </div>
    </section>
  );
}
