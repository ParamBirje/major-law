import { useEffect } from "react";

function Heartbeat() {
  const intervalInMinutes = 3;

  useEffect(() => {
    window.onbeforeunload = function () {
      sessionStorage.removeItem("session_id");
    };
    // Cleanup function
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/heartbeat", {
        headers: {
          "Content-Type": "application/json",
          session_id: sessionStorage.getItem("session_id") || "",
        },
      }).then(async (res) => {
        // set the session_id from response body
        const jsonData = await res.json();

        if (jsonData.session_id) {
          sessionStorage.setItem("session_id", jsonData.session_id);
        }
      });
    }, intervalInMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Heartbeat;
