const axios = require("axios");

async function test() {

  try {

    const response = await axios.post(
      "http://127.0.0.1:5000/api/sessions/start",
      {
        voucher: {
          id: 1,
          code: "ABC123",
          minutes: 30
        }
      }
    );

    console.log(response.data);

  } catch (err) {

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

  }

}

test();