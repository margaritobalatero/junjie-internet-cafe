function App() {
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
      <div style={{ textAlign: "center", width: 420 }}>
        <h1>JUNJIE INTERNET CAFE</h1>

        <p>Welcome to Junjie Internet Cafe</p>

        <p>Please enter your voucher code.</p>

        <input
          type="text"
          placeholder="Voucher Code"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "18px",
            marginTop: "20px",
            marginBottom: "20px",
            boxSizing: "border-box"
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          START SESSION
        </button>
      </div>
    </div>
  );
}

export default App;