import { useEffect, useState } from "react";
import { eventBusService } from "../services/event-bus-service";

export function UserMsg() {
  const [msg, setMsg] = useState(null);
  // { txt: "User Messege", type: "success" }

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-user-msg", (msg) => {
      setMsg(msg);
      const timer = setTimeout(() => {
        setMsg(null);
      }, 3000);
    });
    return () => {
      unsubscribe;
      clearTimeout(timer);
    };
  }, []);

  function onCloseMsg() {
    setMsg(null);
  }

  if (!msg) return <></>;
  return (
    <div className={"user-msg"}>
      <button onClick={onCloseMsg}>X</button>
      <p>{msg.txt}</p>
    </div>
  );
}
