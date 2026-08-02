import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useGraceTimer from "../../hooks/useGraceTimer";
import {
  getSession,
  extendSession as extendClientSession
} from "../../services/sessionService";

import {
  extendSession as extendServerSession
} from "../../services/serverSessionService";
import {
  validateVoucher,
  useVoucher
} from "../../services/voucherApi";
import { extendSession } from "../../services/sessionService";
import { formatTime } from "../../utils/time";

export default function Expired() {

  const navigate = useNavigate();

  const session = getSession();

  const remaining = useGraceTimer(session?.pcNumber);

  const [voucherCode, setVoucherCode] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {

    if (!session) {

      navigate("/", { replace: true });

    }

  }, [session, navigate]);

  useEffect(() => {

    if (remaining === null) return;

    if (remaining <= 0) {

      navigate("/", { replace: true });

    }

  }, [remaining, navigate]);

async function handleContinue() {

   console.log("1. Button clicked");

  const result = await validateVoucher(voucherCode);

  console.log("2. validateVoucher:", result);

  if (!result.success) {

    setMessage(result.message);

    return;

  }

    const useResult = await useVoucher(result.voucher.id);

  console.log("3. useVoucher:", useResult);

  if (!useResult.success) {

    setMessage(useResult.message);

    return;

  }

  const response = await extendServerSession(

      session.sessionId,

      result.voucher

    );

  if (!response.success) {

    setMessage("Unable to continue session.");

    return;

  }

  await useVoucher(result.voucher.id);

  extendClientSession(result.voucher);

  navigate("/session", {
    replace: true
  });

}

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
          textAlign: "center",
          width: 500
        }}
      >

        <h1>
          SESSION EXPIRED
        </h1>

        <h2>

          You have

        </h2>

        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: "#FFD54F"
          }}
        >

          {remaining === null
            ? "--:--"
            : formatTime(remaining)}

        </div>

        <h2>

          to continue your session

        </h2>

        <input

          value={voucherCode}

          onChange={(e) => {

            setVoucherCode(
              e.target.value.toUpperCase()
            );

            setMessage("");

          }}

          placeholder="Voucher Code"

          style={{
            width: "100%",
            padding: "14px",
            fontSize: "20px",
            marginTop: "30px"
          }}

        />

        <br />

        <br />

        <button

          onClick={handleContinue}

          style={{
            width: "100%",
            padding: "15px",
            fontSize: "20px",
            cursor: "pointer"
          }}

        >

          CONTINUE SESSION

        </button>

        {

          message &&

          <p
            style={{
              color: "red",
              marginTop: "20px"
            }}
          >

            {message}

          </p>

        }

      </div>

    </div>

  );

}