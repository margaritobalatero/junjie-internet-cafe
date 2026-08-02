import { createSession } from "../../services/serverSessionService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  validateVoucher,
  useVoucher
} from "../../services/voucherApi";
import { startSession } from "../../services/sessionService";

export default function Welcome() {
  const navigate = useNavigate();

  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");

async function handleStart() {

  const result =
    await validateVoucher(voucherCode);

  if (!result.success) {

    setError(result.message);

    return;

  }

  const useResult =
    await useVoucher(result.voucher.id);

  if (!useResult.success) {

    setError("Unable to use voucher.");

    return;

  }

  const sessionResult =
    await createSession(
      result.voucher,
      2
    );

  if (!sessionResult.success) {

    setError("Unable to create session.");

    return;

  }

  startSession(

    sessionResult.sessionId,

    result.voucher,

    2

  );

  navigate("/session");

}

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleStart();
    }
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
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: 420,
          textAlign: "center",
        }}
      >
        <h1>JUNJIE INTERNET CAFE</h1>

        <p>Welcome to Junjie Internet Cafe</p>

        <p>Please enter your voucher code.</p>

        <input
          type="text"
          placeholder="Voucher Code"
          value={voucherCode}
          onChange={(e) => {
            setVoucherCode(e.target.value.toUpperCase());
            setError("");
          }}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "18px",
            marginTop: "20px",
            marginBottom: "10px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <button
          onClick={handleStart}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          START SESSION
        </button>
      </div>
    </div>
  );
}