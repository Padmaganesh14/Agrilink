export async function createPromotion(req, res, next) {
  try {
    const { crop, quantityKg, location, quality, targetPrice } = req.body;
    const cropName = crop || 'Tomato';
    const qty = (Number(quantityKg) || 2000).toLocaleString();
    const loc = location || 'Trichy';
    const price = targetPrice || 35;

    const promotion = {
      success: true,
      caption: ` Fresh ${quality || 'Grade A'} ${cropName}\n Quantity: ${qty} KG\n Farm Origin: ${loc}, Tamil Nadu\n Indicative Market Rate: ₹${price} / KG\n Available for verified B2B purchase via AgriLink AI.\n#AgriLinkAI #${cropName.replace(/\s+/g, '')} #TamilNadu`,
      captionTa: ` புதிய ${quality || 'Grade A'} ${cropName} (${qty} கிலோ)\n பண்ணை: ${loc}, தமிழ்நாடு\n உத்தேச சந்தை விலை: ₹${price} / கிலோ\n AgriLink AI தளம் மூலம் நேரடி B2B கொள்முதல்.`,
      channels: ['WhatsApp Business Broadcast', 'AgriLink Buyer Portal', 'Koyambedu Wholesale Terminal']
    };

    res.json(promotion);
  } catch (err) {
    next(err);
  }
}
