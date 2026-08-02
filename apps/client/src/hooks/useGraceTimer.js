import { useEffect, useState } from "react";
import { socket } from "../services/socketService";

export default function useGraceTimer(pcNumber) {

  const [remaining, setRemaining] = useState(null);

  useEffect(() => {

    function handleGrace(session) {

      if (Number(session.pcNumber) === Number(pcNumber)) {

        setRemaining(session.remainingSeconds);

      }

    }

    socket.on("grace-update", handleGrace);

    return () => {

      socket.off("grace-update", handleGrace);

    };

  }, [pcNumber]);

  return remaining;

}