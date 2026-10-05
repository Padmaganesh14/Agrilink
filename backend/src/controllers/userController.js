import { supabase } from '../config/supabase.js';

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { farmName, name, mobile } = req.body;
    const { data, error } = await supabase
      .from('users')
      .update({ farmName, name, mobile })
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    res.status(200).json({ success: true, user: data });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
