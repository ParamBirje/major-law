import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

export default function Chat() {
  return (
    <section id="chat" className="flex flex-col gap-5">
      <div className="flex gap-5">
        <Input
          className="w-full"
          title="Start your legal search here"
          placeholder="What does the article 15 of GDPR say?"
        />

        <Button className="h-auto w-[15%]">Search</Button>
      </div>

      <div className="flex gap-5">
        <div className="w-2/3">
          <h3 className="mb-5 scroll-m-20 text-2xl font-semibold tracking-tight">Messages</h3>
          <div className="flex flex-col gap-5">
            <Alert>
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Copilot</AlertTitle>
              <AlertDescription>Hi! What can I help you with?</AlertDescription>
            </Alert>
          </div>
        </div>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="text-lg">Web Sources</CardTitle>
            <CardDescription>Add URLs of the webpages you want to reference.</CardDescription>

            <Button variant="outline">Add +</Button>
          </CardHeader>

          <CardContent>
            <div>sources</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
