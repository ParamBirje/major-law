import { useEffect } from "react";

function Heartbeat() {
  const intervalInMinutes = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:5656/heartbeat", {
        credentials: "include", // To include cookies with the request
      });
    }, intervalInMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Heartbeat;
