const db = require("../database/database");


exports.validateVoucher = (req, res) => {

  const code =
    req.params.code.toUpperCase();


  db.get(

    "SELECT * FROM vouchers WHERE code = ?",

    [code],

    (err, voucher) => {


      if (err) {

        return res.status(500).json({
          success:false,
          message:"Database error"
        });

      }


      if (!voucher) {

        return res.json({
          success:false,
          message:"Invalid voucher"
        });

      }


      if (voucher.used === 1) {

        return res.json({
          success:false,
          message:"Voucher already used"
        });

      }


      res.json({

        success:true,

        voucher

      });


    }

  );


};



exports.useVoucher = (req,res)=>{


  const {id} = req.body;


  db.run(

    `
    UPDATE vouchers
    SET used = 1,
        used_at = CURRENT_TIMESTAMP
    WHERE id = ?
    `,

    [id],

    function(err){


      if(err){

        return res.status(500).json({
          success:false
        });

      }


      res.json({
        success:true
      });


    }

  );


};