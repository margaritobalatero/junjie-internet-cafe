import { useNavigate } from "react-router-dom";

import { getSession } from "../../services/sessionService";
import useSessionTimer from "../../hooks/useSessionTimer";
import { formatTime } from "../../utils/time";


export default function Session() {

  const navigate = useNavigate();

  const session = getSession();

  const remaining = useSessionTimer(session);


  if (!session) {
    navigate("/");
    return null;
  }


  if (remaining === 0) {
    navigate("/expired");
    return null;
  }


  return (
    <div
      style={{
        height:"100vh",
        background:"#202124",
        color:"white",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"Arial"
      }}
    >

      <div style={{textAlign:"center"}}>

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
            fontSize:"50px",
            fontWeight:"bold"
          }}
        >
          {formatTime(remaining)}
        </div>


      </div>

    </div>
  );
}