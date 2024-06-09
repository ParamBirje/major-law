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
import { useToast } from "@/components/ui/use-toast";

export default function WebSources() {
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [submitSuccessful, setSubmitSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  function handleDeleteWebpage(delWebpage: Webpage) {
    try {
      fetch(
        `${import.meta.env.VITE_BACKEND_URL}/websource/${
          delWebpage.message_id
        }?created=${delWebpage.created}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            session_id: sessionStorage.getItem("session_id") || "",
          },
        }
      );

      setWebpages((prevWebpages) =>
        prevWebpages.filter((webpage) => webpage.url !== delWebpage.url)
      );

      toast({
        variant: "destructive",
        duration: 3500,
        description: "Webpage removed from references.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 3500,
        description: "Failed to remove webpage from references.",
      });
      console.error(error);
    }
  }

  async function handleAddWebpage(e: FormEvent) {
    e.preventDefault();
    if (webpages.length == 2) {
      toast({
        duration: 3500,
        description: "You can only add up to 2 webpages.",
      });
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const url = String(formData.get("webpage_url"));

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/websource`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            session_id: sessionStorage.getItem("session_id") || "",
          },
          body: JSON.stringify({ url: url }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setWebpages((prevWebpages) => [
          ...prevWebpages,
          {
            message_id: data.message_id,
            url: url,
            created: data.created,
          },
        ]);

        setSubmitSuccessful(true);

        toast({
          duration: 3500,
          description: "✅ Webpage added to references successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          duration: 3500,
          description: "Could not add this webpage.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 3500,
        description: "Failed to add this webpage.",
      });
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <Card className="md:w-1/3 h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Web Sources</CardTitle>
        <CardDescription>
          Add URLs of custom webpages you want to reference.
        </CardDescription>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="flex items-center justify-between"
              disabled={webpages.length == 2}
              variant="outline"
            >
              {webpages.length == 2 ? (
                <p className="text-muted-foreground">Slots full</p>
              ) : (
                <p className="text-blue-600">Add +</p>
              )}
              <p className="font-normal text-muted-foreground">
                {webpages.length}/2
              </p>
            </Button>
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
                  disabled={loading || submitSuccessful}
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
                    <AlertDialogCancel disabled={loading}>
                      Cancel
                    </AlertDialogCancel>
                    <Button disabled={loading} type="submit">
                      {loading ? "Referencing..." : "Submit"}
                    </Button>
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
