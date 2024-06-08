import { useEffect } from "react";

function Heartbeat() {
  const intervalInMinutes = 3;

  function initializeOrCheckSession() {
    fetch(import.meta.env.VITE_BACKEND_URL + "/heartbeat", {
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
  }

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
    initializeOrCheckSession();

    const interval = setInterval(() => {
      initializeOrCheckSession();
    }, intervalInMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Heartbeat;
