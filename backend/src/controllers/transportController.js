export async function matchTransport(req, res, next) {
  try {
    const { origin = 'Trichy', destination = 'Chennai', quantityKg = 2000 } = req.body;

    const transportPartners = [
      {
        id: 'tp-tn-agro',
        name: 'Tamil Nadu Agro Logistics',
        vehicle: 'Eicher Pro 2049 (14 FT)',
        capacityKg: 3000,
        estimatedCost: 3600,
        estimatedRatePerKg: 1.8,
        distanceKm: 330,
        corridor: 'NH38 / NH45 Direct Highway',
        transitHours: '~6 Hours',
        rating: 4.9,
        available: true,
        recommended: true
      },
      {
        id: 'tp-greenroute',
        name: 'GreenRoute Agro Freight',
        vehicle: 'Tata 407 LPT (14 FT)',
        capacityKg: 2500,
        estimatedCost: 3800,
        estimatedRatePerKg: 1.9,
        distanceKm: 330,
        corridor: 'NH45 Express',
        transitHours: '~6.5 Hours',
        rating: 4.7,
        available: true,
        recommended: false
      }
    ];

    res.json({
      success: true,
      origin,
      destination,
      quantityKg,
      partners: transportPartners
    });
  } catch (err) {
    next(err);
  }
}
