import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getSession, clearSession } from "../../services/sessionService";
import useServerTimer from "../../hooks/useServerTimer";
import { formatTime } from "../../utils/time";

export default function Session() {

  const navigate = useNavigate();

  const session = getSession();

  const beepPlayed = useRef(false);

  useEffect(() => {

    if (!session) {
      navigate("/", { replace: true });
    }

  }, [session, navigate]);

  if (!session) {
    return null;
  }

  const {
    remaining,
    expired
  } = useServerTimer(session.pcNumber);

  // Reset beep flag whenever a new session page starts
  useEffect(() => {

    beepPlayed.current = false;

  }, []);

  // Play one warning beep at exactly 1 minute remaining
  useEffect(() => {

    if (remaining === 60 && !beepPlayed.current) {

      beepPlayed.current = true;

      const audio = new Audio("/sounds/beep.mp3");

      audio.play().catch((err) => {
        console.log("Unable to play beep:", err);
      });

    }

  }, [remaining]);

  useEffect(() => {

    if (!expired) return;

    clearSession();

    navigate("/", {
      replace: true
    });

  }, [expired, navigate]);

  return (

    <div
      style={{
        height: "100vh",
        background: "#202124",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >

      <div
        style={{
          textAlign: "center"
        }}
      >

        <h1>
          JUNJIE INTERNET CAFE
        </h1>

        <h2>
          Voucher: {session.voucherCode}
        </h2>

        <h3>
          Time Remaining
        </h3>

        <div
          style={{
            fontSize: "60px",
            fontWeight: "bold"
          }}
        >
          {remaining === null
            ? "--:--"
            : formatTime(remaining)}
        </div>

      </div>

    </div>

  );

}