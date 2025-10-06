// Sample backend routes
app.post('/create-order', async (req, res) => {
    // Create Razorpay order
    const order = await razorpay.orders.create({
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: `receipt_${Date.now()}`
    });
    
    // Save order to database
    await saveOrderToDB({
        order_id: order.id,
        product: req.body.product,
        customer_email: req.body.customer_email,
        amount: req.body.amount,
        status: 'created'
    });
    
    res.json(order);
});

app.post('/payment-success', async (req, res) => {
    // Verify payment signature
    const isValid = validateSignature(req.body);
    
    if (isValid) {
        // Update order status in database
        await updateOrderStatus(req.body.razorpay_order_id, 'success');
        
        // Send download links to customer email
        await sendDownloadLinks(req.body.razorpay_order_id);
        
        res.json({ status: 'success' });
    } else {
        res.status(400).json({ error: 'Invalid signature' });
    }
});