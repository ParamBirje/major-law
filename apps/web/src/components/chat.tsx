import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

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
    </section>
  );
}
