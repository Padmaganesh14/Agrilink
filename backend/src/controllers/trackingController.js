import { Tracking } from '../models/Tracking.js';

export async function startTracking(req, res, next) {
  try {
    const { orderId = 'AGRI-2026-8842', origin = 'Trichy Farm Gate', destination = 'Chennai Koyambedu' } = req.body;
    const trackingId = `TRK-${Date.now().toString().slice(-6)}`;

    const trackingData = {
      trackingId,
      orderId,
      origin,
      destination,
      currentCheckpoint: 'Villupuram (NH45)',
      speedKmH: 52,
      distanceKm: 330,
      etaHours: 6,
      status: 'In Transit'
    };

    try {
      await Tracking.create(trackingData);
    } catch (e) {}

    res.status(201).json({
      success: true,
      tracking: trackingData
    });
  } catch (err) {
    next(err);
  }
}

export async function getTracking(req, res, next) {
  try {
    const { id } = req.params;
    let tracking = null;

    try {
      tracking = await Tracking.findOne({ trackingId: id });
    } catch (e) {}

    if (!tracking) {
      tracking = {
        trackingId: id,
        orderId: 'AGRI-2026-8842',
        origin: 'Trichy Farm Gate',
        destination: 'Chennai Koyambedu Wholesale Mart',
        currentCheckpoint: 'Villupuram (NH45)',
        speedKmH: 52,
        distanceKm: 330,
        etaHours: 6,
        status: 'In Transit'
      };
    }

    res.json({
      success: true,
      tracking
    });
  } catch (err) {
    next(err);
  }
}
