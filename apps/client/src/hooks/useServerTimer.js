import { useEffect, useState } from "react";
import { socket } from "../services/socketService";

export default function useServerTimer(pcNumber) {

  const [remaining, setRemaining] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {

    function handleUpdate(session) {

      if (Number(session.pcNumber) === Number(pcNumber)) {

        setRemaining(session.remainingSeconds);

      }

    }

    function handleEnded(data) {

      console.log("SESSION ENDED:", data);

      setExpired(true);

    }

    socket.on("session-update", handleUpdate);

    socket.on("session-ended", handleEnded);

    return () => {

      socket.off("session-update", handleUpdate);

      socket.off("session-ended", handleEnded);

    };

  }, [pcNumber]);

  return {
    remaining,
    expired
  };

}