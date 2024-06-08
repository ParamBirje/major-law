import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Alert, AlertTitle } from "../ui/alert";
import { TrashIcon } from "@radix-ui/react-icons";
import { type Webpage } from "@/lib/types";
import { FormEvent, useState } from "react";
import { Input } from "../ui/input";

export default function WebSources() {
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);

  function handleDeleteWebpage(delWebpage: Webpage) {
    setWebpages((prevWebpages) =>
      prevWebpages.filter((webpage) => webpage.url !== delWebpage.url)
    );
  }

  function handleAddWebpage(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setWebpages((prevWebpages) => [
      ...prevWebpages,
      { url: String(formData.get("webpage_url")) },
    ]);

    setSubmitSuccessful(true);
  }

  return (
    <Card className="md:w-1/3 h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Web Sources</CardTitle>
        <CardDescription>
          Add URLs of the webpages you want to reference.
        </CardDescription>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Add +</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <form onSubmit={handleAddWebpage}>
              <AlertDialogHeader>
                <AlertDialogTitle>Enter the URL</AlertDialogTitle>
                <AlertDialogDescription>
                  Please ensure the URL is the webpage that contains the data
                  you want to reference.
                </AlertDialogDescription>

                <Input
                  required
                  autoComplete="off"
                  type="url"
                  name="webpage_url"
                  placeholder="https://example.com/article22"
                />
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-5">
                {submitSuccessful ? (
                  <AlertDialogAction onClick={() => setSubmitSuccessful(false)}>
                    Close
                  </AlertDialogAction>
                ) : (
                  <>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button type="submit">Submit</Button>
                  </>
                )}
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>

      <CardContent className="gap-2 flex flex-col">
        {webpages.map((webpage, i) => {
          return (
            <Alert key={i}>
              <div className="flex items-center justify-between">
                <AlertTitle>{new URL(webpage.url).hostname}</AlertTitle>

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
