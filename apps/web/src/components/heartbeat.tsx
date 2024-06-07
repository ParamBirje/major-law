import { useEffect } from "react";

function Heartbeat() {
  const intervalInMinutes = 0.2;

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:8000/heartbeat", {
        credentials: "include", // To include cookies with the request
      }).then(() => console.log("bhai mil ga respons"));
    }, intervalInMinutes * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}

export default Heartbeat;
