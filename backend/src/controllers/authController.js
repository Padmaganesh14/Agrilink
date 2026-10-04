import { supabase } from "../config/supabase.js";

export const register = async (req, res, next) => {
  try {
    const { name, mobile, password, role } = req.body;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Create user
    const { data: user, error } = await supabase
      .from("users")
      .insert([{ name, mobile, password, role }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Supabase error:", err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { mobile, password, role } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("mobile", mobile)
      .maybeSingle();

    if (error || !user || user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `Account is registered as ${user.role}, not ${role}.`,
      });
    }

    res.status(200).json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Supabase error:", err);
    next(err);
  }
};
