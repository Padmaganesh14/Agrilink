import { supabase } from '../config/supabase.js';

export async function createOrder(req, res, next) {
  try {
    const { crop, quantityKg, ratePerKg, buyer, transport, pickupLocation, deliveryLocation } = req.body;
    
    if (!crop || !quantityKg || !ratePerKg || !buyer) {
      return res.status(400).json({ success: false, message: 'Missing required order fields' });
    }

    const qty = Number(quantityKg);
    const rate = Number(ratePerKg);
    const orderId = `AGRI-${Date.now().toString().slice(-6)}`;
    const totalValue = Math.round(qty * rate);
    const sellerId = req.body.sellerId || null;

    const orderData = {
      orderId: orderId,
      crop: crop,
      quantityKg: qty,
      ratePerKg: rate,
      totalValue: totalValue,
      status: 'Payment Coordination',
      buyerName: buyer.name,
      buyerLocation: buyer.location,
      sellerId: sellerId,
      pickupLocation: pickupLocation || 'Farm Gate',
      deliveryLocation: deliveryLocation || buyer.location,
      transportName: transport?.name || null,
      transportVehicle: transport?.vehicle || null,
      transportCost: transport?.estimatedCost || null,
      paymentCoordinated: true
    };

    const { data: orderResponse, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) {
      console.error("[Order Creation Error]", orderError);
      return res.status(500).json({ success: false, message: 'Database failure: could not create order', error: orderError.message });
    }

    // Attempt to reduce stock if cropId is provided
    if (req.body.cropId) {
      try {
        // RPC function would be better here for atomicity, but doing standard select + update since we lack RPC definition in setup.
        // Wait, Supabase allows atomic decrement: 
        // Unfortunately standard REST API doesn't support atomic decrement unless using RPC.
        // We'll fetch the crop, subtract, and update.
        const { data: cropData } = await supabase
          .from('crops')
          .select('quantityAvailable')
          .eq('id', req.body.cropId)
          .single();

        if (cropData) {
          const newQty = Math.max(0, cropData.quantityAvailable - qty);
          const newStatus = newQty === 0 ? 'sold' : 'available';

          await supabase
            .from('crops')
            .update({ quantityAvailable: newQty, status: newStatus })
            .eq('id', req.body.cropId);
        }
      } catch (err) {
        console.error("Failed to decrement crop stock:", err);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: orderResponse
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('orderId', id)
      .single();

    if (error) {
      console.error("[Get Order Error]", error);
      return res.status(404).json({ success: false, message: `Order ${id} not found` });
    }

    if (!data) {
       return res.status(404).json({ success: false, message: `Order ${id} not found` });
    }

    res.json({
      success: true,
      order: data
    });
  } catch (err) {
    next(err);
  }
}

export async function getOrdersBySeller(req, res, next) {
  try {
    const { sellerId } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('sellerId', sellerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("[Get Orders Error]", error);
      return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }

    res.json({
      success: true,
      data: data || []
    });
  } catch (err) {
    next(err);
  }
}
