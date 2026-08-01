import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSession, extendSession } from "../../services/sessionService";
import { validateVoucher, useVoucher } from "../../services/voucherService";

import useSessionTimer from "../../hooks/useSessionTimer";
import { formatTime } from "../../utils/time";


export default function Session() {


  const navigate = useNavigate();


  const session = getSession();


  const remaining = useSessionTimer(session);


  const [voucherCode, setVoucherCode] = useState("");

  const [message, setMessage] = useState("");



  if (!session) {

    navigate("/");

    return null;

  }



  if (remaining === 0) {

    navigate("/expired");

    return null;

  }



  function handleExtend() {


    const result =
      validateVoucher(voucherCode);



    if (!result.success) {

      setMessage(result.message);

      return;

    }



    useVoucher(result.voucher.id);


    extendSession(result.voucher);



    setVoucherCode("");

    setMessage(
      `Added ${result.voucher.minutes} minutes`
    );

  }



  const showWarning = remaining <= 60;



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



        {
          showWarning && (

            <div
              style={{
                marginTop:"30px"
              }}
            >

              <h2>
                ⚠ Session expires in 1 minute
              </h2>


              <p>
                Enter another voucher to continue
              </p>


              <input

                value={voucherCode}

                onChange={(e)=>
                  setVoucherCode(
                    e.target.value.toUpperCase()
                  )
                }


                placeholder="Voucher Code"

                style={{
                  padding:"12px",
                  fontSize:"18px"
                }}

              />


              <br/><br/>


              <button
                onClick={handleExtend}

                style={{
                  padding:"12px 30px",
                  fontSize:"18px"
                }}
              >
                Continue Session
              </button>



              {
                message &&
                <p>
                  {message}
                </p>
              }


            </div>

          )
        }


      </div>


    </div>

  );

}