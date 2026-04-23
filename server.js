import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import midtransClient from 'midtrans-client';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Midtrans Snap client
const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY
});

app.post('/api/create-transaction', async (req, res) => {
    try {
        const { orderId, amount, customerDetails, propertyName } = req.body;

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: amount
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name: customerDetails.fullName,
                email: customerDetails.email,
                phone: customerDetails.phone,
                billing_address: {
                    address: customerDetails.address
                }
            },
            item_details: [{
                id: 'booking-fee',
                price: amount,
                quantity: 1,
                name: `Booking Fee: ${propertyName}`
            }]
        };

        const transaction = await snap.createTransaction(parameter);
        res.json({ 
            token: transaction.token,
            redirect_url: transaction.redirect_url 
        });

    } catch (error) {
        console.error('Midtrans Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
