const API_URL = "http://192.168.10.118:5000/api/vouchers";


export async function validateVoucher(code) {

  const response = await fetch(
    `${API_URL}/${code}`
  );


  return await response.json();

}



export async function useVoucher(id) {


  const response = await fetch(
    `${API_URL}/use`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        id
      })

    }
  );


  return await response.json();

}