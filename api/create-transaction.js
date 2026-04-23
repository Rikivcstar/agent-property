import midtransClient from 'midtrans-client';

// Initialize Snap client object
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.VITE_MIDTRANS_CLIENT_KEY
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

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
        
        return res.status(200).json({ 
            token: transaction.token,
            redirect_url: transaction.redirect_url 
        });

    } catch (error) {
        console.error('Midtrans Error:', error);
        return res.status(500).json({ message: error.message });
    }
}
