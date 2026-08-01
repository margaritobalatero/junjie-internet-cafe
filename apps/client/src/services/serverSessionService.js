const API_URL = "http://192.168.10.118:5000/api/sessions";

export async function createSession(voucher) {

  const response = await fetch(`${API_URL}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      voucher
    })
  });

  return await response.json();
}