const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");

// Menambahkan transaksi baru
exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id } = req.body;

    if (!first_name || !amount || !product_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Pastikan server key tersedia
    if (!process.env.MIDTRANS_SERVERKEY) {
      return res
        .status(500)
        .json({ message: "Midtrans server key not configured" });
    }

    // Buat instance Snap Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVERKEY,
    });

    const order_id = "ORDER-" + new Date().getTime();

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: first_name,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionUrl = transaction.redirect_url;

    const newTransaction = new Transaction({
      ...req.body,
      transaction_id: order_id,
      midtrans_url: transactionUrl,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(400).json({ message: err.message });
  }
};
