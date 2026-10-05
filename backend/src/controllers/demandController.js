import { supabase } from '../config/supabase.js';

export const createDemand = async (req, res, next) => {
  try {
    const { buyerId, cropName, grade, quantityRequired, targetPrice, deliveryLocation } = req.body;
    
    if (!buyerId || !cropName || !quantityRequired || !deliveryLocation) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('demands')
      .insert([{ 
        buyerId, 
        cropName, 
        grade: grade || 'Standard', 
        quantityRequired: Number(quantityRequired), 
        targetPrice: targetPrice ? Number(targetPrice) : null, 
        deliveryLocation 
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, demand: data });
  } catch (error) {
    next(error);
  }
};

export const getAllDemands = async (req, res, next) => {
  try {
    const { status } = req.query;
    
    let query = supabase.from('demands').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data: demandsData, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;

    // Manually fetch buyers to bypass relation cache issues
    const demandsWithBuyers = await Promise.all(
      demandsData.map(async (demand) => {
        let buyerData = { name: "Partner Buyer", farmName: "Partner Farm" };
        if (demand.buyerId) {
          const { data: user } = await supabase
            .from('users')
            .select('name, farmName, mobile')
            .eq('id', demand.buyerId)
            .single();
          if (user) buyerData = user;
        }
        return { ...demand, buyer: buyerData };
      })
    );

    res.status(200).json({ success: true, demands: demandsWithBuyers });
  } catch (error) {
    next(error);
  }
};

export const fulfillDemand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { fulfilledQty } = req.body; // How much the farmer is fulfilling

    // 1. Fetch current demand
    const { data: demand, error: fetchError } = await supabase
      .from('demands')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;
    if (!demand) return res.status(404).json({ success: false, message: 'Demand not found' });
    if (demand.status !== 'open') return res.status(400).json({ success: false, message: 'Demand is already closed' });

    const newQty = Number(demand.quantityRequired) - Number(fulfilledQty);
    
    let updatedDemand;
    if (newQty <= 0) {
      // Fully fulfilled
      const { data, error } = await supabase
        .from('demands')
        .update({ quantityRequired: 0, status: 'fulfilled' })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      updatedDemand = data;
    } else {
      // Partially fulfilled
      const { data, error } = await supabase
        .from('demands')
        .update({ quantityRequired: newQty })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      updatedDemand = data;
    }

    res.status(200).json({ success: true, demand: updatedDemand });
  } catch (error) {
    next(error);
  }
};
