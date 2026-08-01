import { useEffect, useState } from "react";

export default function useSessionTimer(session) {

  function calculateRemaining() {
    if (!session) return 0;

    const elapsed =
      Math.floor((Date.now() - session.startedAt) / 1000);

    const remaining =
      session.durationSeconds - elapsed;

    return remaining > 0 ? remaining : 0;
  }


  const [remaining, setRemaining] = useState(
    calculateRemaining()
  );


  useEffect(() => {

    const timer = setInterval(() => {

      setRemaining(calculateRemaining());

    }, 1000);


    return () => clearInterval(timer);

  }, [session]);


  return remaining;
}