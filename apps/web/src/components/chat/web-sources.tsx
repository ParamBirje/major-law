import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertTitle } from "../ui/alert";
import { TrashIcon } from "@radix-ui/react-icons";
import { type Webpage } from "@/lib/types";
import { useState } from "react";

export default function WebSources() {
  const [webpages, setWebpages] = useState<Webpage[]>([]);

  function handleDeleteWebpage(delWebpage: Webpage) {
    setWebpages((prevWebpages) =>
      prevWebpages.filter((webpage) => webpage.url !== delWebpage.url)
    );
  }

  return (
    <Card className="md:w-1/3">
      <CardHeader>
        <CardTitle className="text-lg">Web Sources</CardTitle>
        <CardDescription>
          Add URLs of the webpages you want to reference.
        </CardDescription>

        <Button variant="outline">Add +</Button>
      </CardHeader>

      <CardContent className="gap-2 flex flex-col">
        {webpages.map((webpage, i) => {
          return (
            <Alert key={i}>
              <div className="flex items-center justify-between">
                <AlertTitle>{webpage.url}</AlertTitle>

                <button
                  onClick={() => {
                    handleDeleteWebpage(webpage);
                  }}
                >
                  <TrashIcon className="text-red-400 hover:text-red-600" />
                </button>
              </div>
            </Alert>
          );
        })}
      </CardContent>
    </Card>
  );
}
