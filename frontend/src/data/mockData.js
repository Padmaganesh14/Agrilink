export const defaultCrops = [
  {
    id: 'crop-tomato',
    name: 'Tomato',
    icon: '',
    defaultQty: 2000,
    defaultLocation: 'Trichy',
    grade: 'Grade A',
    localPrice: 28,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 34,
      grossDiff: 6,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 4.2,
      grossAdvantage: 12000,
      netAdvantageTotal: 8400,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'High retail & wholesale turnover in Chennai Koyambedu' },
        { label: 'Buyer demand', value: '2,000 KG', desc: 'Direct matching requirement for bulk lots' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor via NH38 / NH45' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'Covered by wholesale price difference' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 34, demand: 'HIGH', diff: '+₹6/kg', advantage: true },
      { name: 'Trichy Gandhi Market (Local)', price: 28, demand: 'MEDIUM', diff: 'Base', advantage: false },
      { name: 'Coimbatore Market', price: 30, demand: 'HIGH', diff: '+₹2/kg', advantage: false },
      { name: 'Madurai Mattuthavani', price: 26, demand: 'LOW', diff: '-₹2/kg', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-koyambedu',
        name: 'Koyambedu Wholesale Mart',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 2000,
        targetPrice: 34,
        paymentTerms: 'WhatsApp-coordinated payment terms before vehicle dispatch',
        matchHighlights: [
          'Volume Match (2,000 KG)',
          'Route Match (Trichy → Chennai)',
          'Buyer Information Available'
        ],
        isBestMatch: true
      },
      {
        id: 'buyer-freshdirect',
        name: 'FreshDirect Chennai',
        badge: 'B2B Retail Aggregator',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 1500,
        targetPrice: 33.5,
        paymentTerms: 'WhatsApp-coordinated payment upon load inspection',
        matchHighlights: [
          'Partial Volume Match (1,500 KG)',
          'Route Match (Trichy → Chennai)',
          'Buyer Information Available'
        ],
        isBestMatch: false
      }
    ]
  },
  {
    id: 'crop-rice',
    name: 'Ponni Rice',
    icon: '',
    defaultQty: 1500,
    defaultLocation: 'Trichy',
    grade: 'Premium Aged',
    localPrice: 48,
    bestMarket: {
      location: 'Chennai Wholesale Hub',
      tamilLocation: 'சென்னை மொத்த மையம்',
      price: 56,
      grossDiff: 8,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 2.1,
      netAdvantage: 5.9,
      grossAdvantage: 12000,
      netAdvantageTotal: 8850,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Premium aged non-broken lots in high demand' },
        { label: 'Buyer demand', value: '1,500 KG', desc: 'Matches standard distributor pallet lot' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor via NH38 / NH45' },
        { label: 'Estimated transport', value: '~₹2.1/kg', desc: 'Economical bulk cargo shipment' }
      ]
    },
    markets: [
      { name: 'Chennai Wholesale Hub', price: 56, demand: 'HIGH', diff: '+₹8/kg', advantage: true },
      { name: 'Trichy Mill Gate (Local)', price: 48, demand: 'MEDIUM', diff: 'Base', advantage: false },
      { name: 'Madurai Mandi', price: 49, demand: 'MEDIUM', diff: '+₹1/kg', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-chennai-rice',
        name: 'Ponni Super Aggregators',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 1500,
        targetPrice: 56,
        paymentTerms: 'WhatsApp-coordinated payment on dispatch confirmation',
        matchHighlights: [
          'Volume Match (1,500 KG)',
          'Route Match (Trichy → Chennai)',
          'Buyer Information Available'
        ],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-onion',
    name: 'Small Red Onion',
    icon: '',
    defaultQty: 1000,
    defaultLocation: 'Trichy',
    grade: 'Export Grade',
    localPrice: 52,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 64,
      grossDiff: 12,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 10.2,
      grossAdvantage: 12000,
      netAdvantageTotal: 10200,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Shallot shortage in northern coastal belt' },
        { label: 'Buyer demand', value: '1,000 KG', desc: 'Exact restaurant chain procurement' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor via NH38 / NH45' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'High commodity value absorbs freight' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 64, demand: 'HIGH', diff: '+₹12/kg', advantage: true },
      { name: 'Trichy Local Mandi', price: 52, demand: 'MEDIUM', diff: 'Base', advantage: false },
      { name: 'Salem Agri Yard', price: 55, demand: 'MEDIUM', diff: '+₹3/kg', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-shallot-mart',
        name: 'Tamil Nadu Vegetable Traders',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 1000,
        targetPrice: 64,
        paymentTerms: 'WhatsApp-coordinated payment upon load inspection',
        matchHighlights: [
          'Volume Match (1,000 KG)',
          'Route Match (Trichy → Chennai)',
          'Buyer Information Available'
        ],
        isBestMatch: true
      }
    ]
  }
];

// Popular Agricultural Crops Catalog (Tamil Nadu & National APMC reference data)
export const popularCropsCatalog = [
  {
    id: 'crop-banana',
    name: 'Banana',
    icon: '',
    defaultQty: 2500,
    defaultLocation: 'Theni',
    grade: 'Grade A Grand Naine',
    localPrice: 22,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 28,
      grossDiff: 6,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 4.2,
      grossAdvantage: 15000,
      netAdvantageTotal: 10500,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Heavy urban demand for Grand Naine & Poovan varieties' },
        { label: 'Buyer demand', value: '2,500 KG', desc: 'Ripening chamber bulk intake' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor via NH38 / NH45' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'Refrigerated or ventilated cargo covered' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 28, demand: 'HIGH', diff: '+₹6/kg', advantage: true },
      { name: 'Theni Local Mandi', price: 22, demand: 'MEDIUM', diff: 'Base', advantage: false },
      { name: 'Madurai Mattuthavani', price: 24, demand: 'MEDIUM', diff: '+₹2/kg', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-chennai-fruit-mart',
        name: 'Koyambedu Fresh Fruit Terminal',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 2500,
        targetPrice: 28,
        paymentTerms: 'WhatsApp-coordinated payment upon chamber unloading',
        matchHighlights: ['Volume Match (2,500 KG)', 'Route Match (Theni/Trichy → Chennai)', 'Buyer Information Available'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-sugarcane',
    name: 'Sugarcane',
    icon: '',
    defaultQty: 5000,
    defaultLocation: 'Cuddalore',
    grade: 'High Brix (Co-86032)',
    localPrice: 3.2,
    bestMarket: {
      location: 'Chennai Agro Processing Hub',
      tamilLocation: 'சென்னை அக்ரோ ஆலை மையம்',
      price: 4.6,
      grossDiff: 1.4,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 0.6,
      netAdvantage: 0.8,
      grossAdvantage: 7000,
      netAdvantageTotal: 4000,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Commercial juice & sugar extraction procurement' },
        { label: 'Buyer demand', value: '5,000 KG', desc: 'Industrial crushing lot' },
        { label: 'Distance', value: '~330 KM', desc: 'Bulk tractor/truck transit' },
        { label: 'Estimated transport', value: '~₹0.6/kg', desc: 'High bulk density reduces freight per kg' }
      ]
    },
    markets: [
      { name: 'Chennai Agro Processing Hub', price: 4.6, demand: 'HIGH', diff: '+₹1.4/kg', advantage: true },
      { name: 'Cuddalore Mill Gate', price: 3.2, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-cane-distillers',
        name: 'South India Sugar & Agro Mill',
        badge: 'B2B Industrial Buyer',
        location: 'Chennai Suburbs',
        tamilLocation: 'சென்னை',
        distance: '~310 KM',
        requirementQty: 5000,
        targetPrice: 4.6,
        paymentTerms: 'WhatsApp-coordinated payment upon weighbridge slip',
        matchHighlights: ['Volume Match (5,000 KG)', 'Corridor Match', 'Verified Factory Gateway'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-groundnut',
    name: 'Groundnut',
    icon: '',
    defaultQty: 1200,
    defaultLocation: 'Tiruvannamalai',
    grade: 'Bold Grade 60/70',
    localPrice: 68,
    bestMarket: {
      location: 'Chennai Wholesale Hub',
      tamilLocation: 'சென்னை மொத்த மையம்',
      price: 79,
      grossDiff: 11,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 9.2,
      grossAdvantage: 13200,
      netAdvantageTotal: 11040,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'High oil expeller & confectionery demand' },
        { label: 'Buyer demand', value: '1,200 KG', desc: 'Matches standard 30-bag lot' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'High commodity value easily covers freight' }
      ]
    },
    markets: [
      { name: 'Chennai Wholesale Hub', price: 79, demand: 'HIGH', diff: '+₹11/kg', advantage: true },
      { name: 'Tiruvannamalai Mandi', price: 68, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-tn-oilseeds',
        name: 'Chennai Edible Oils & Seeds Ltd',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 1200,
        targetPrice: 79,
        paymentTerms: 'WhatsApp-coordinated payment on dispatch',
        matchHighlights: ['Volume Match (1,200 KG)', 'Quality Grade Match', 'Buyer Information Available'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-carrot',
    name: 'Carrot',
    icon: '',
    defaultQty: 1500,
    defaultLocation: 'Ooty',
    grade: 'Grade A Ooty Red',
    localPrice: 35,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 48,
      grossDiff: 13,
      demand: 'HIGH',
      distance: '~350 KM',
      estimatedTransport: 2.2,
      netAdvantage: 10.8,
      grossAdvantage: 19500,
      netAdvantageTotal: 16200,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Ooty hill carrot commands premium retail markup' },
        { label: 'Buyer demand', value: '1,500 KG', desc: 'Supermarket chain daily intake' },
        { label: 'Distance', value: '~350 KM', desc: 'Cold cargo transit' },
        { label: 'Estimated transport', value: '~₹2.2/kg', desc: 'Refrigerated transit premium' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 48, demand: 'HIGH', diff: '+₹13/kg', advantage: true },
      { name: 'Ooty Local Yard', price: 35, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-freshchain-chennai',
        name: 'FreshChain Hypermarket Logistics',
        badge: 'B2B Retail Aggregator',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~350 KM',
        requirementQty: 1500,
        targetPrice: 48,
        paymentTerms: 'WhatsApp-coordinated payment terms before vehicle dispatch',
        matchHighlights: ['Volume Match (1,500 KG)', 'Premium Grade Match', 'Verified Buyer Profile'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-chilli',
    name: 'Chilli',
    icon: '🌶️',
    defaultQty: 800,
    defaultLocation: 'Ramanathapuram',
    grade: 'Export Grade Samba',
    localPrice: 45,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 58,
      grossDiff: 13,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 11.2,
      grossAdvantage: 10400,
      netAdvantageTotal: 8960,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Pungent Samba variety in shortage in northern mandis' },
        { label: 'Buyer demand', value: '800 KG', desc: 'Exact crate packing lot' },
        { label: 'Distance', value: '~330 KM', desc: 'Overnight express transit' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'High margin protects perishable risk' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 58, demand: 'HIGH', diff: '+₹13/kg', advantage: true },
      { name: 'Ramanathapuram Mandi', price: 45, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-spiceworld',
        name: 'Madras Spice & Vegetable Mart',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 800,
        targetPrice: 58,
        paymentTerms: 'WhatsApp-coordinated payment upon load inspection',
        matchHighlights: ['Volume Match (800 KG)', 'Route Match', 'Verified Wholesale Trader'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-brinjal',
    name: 'Brinjal',
    icon: '',
    defaultQty: 1000,
    defaultLocation: 'Dindigul',
    grade: 'Purple Round Grade A',
    localPrice: 20,
    bestMarket: {
      location: 'Chennai Koyambedu',
      tamilLocation: 'சென்னை கோயம்பேடு',
      price: 27,
      grossDiff: 7,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 5.2,
      grossAdvantage: 7000,
      netAdvantageTotal: 5200,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Steady hotel and canteen consumption' },
        { label: 'Buyer demand', value: '1,000 KG', desc: 'Commercial mess procurement' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'Covered by wholesale price difference' }
      ]
    },
    markets: [
      { name: 'Chennai Koyambedu', price: 27, demand: 'HIGH', diff: '+₹7/kg', advantage: true },
      { name: 'Dindigul Mandi', price: 20, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-koyambedu-veggies',
        name: 'Koyambedu Wholesale Mart',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 1000,
        targetPrice: 27,
        paymentTerms: 'WhatsApp-coordinated payment terms before vehicle dispatch',
        matchHighlights: ['Volume Match (1,000 KG)', 'Route Match', 'Buyer Information Available'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-coconut',
    name: 'Coconut',
    icon: '',
    defaultQty: 2000,
    defaultLocation: 'Pollachi',
    grade: 'Large Dry (500g+)',
    localPrice: 18,
    bestMarket: {
      location: 'Chennai Wholesale Terminal',
      tamilLocation: 'சென்னை மொத்த முனையம்',
      price: 26,
      grossDiff: 8,
      demand: 'HIGH',
      distance: '~330 KM',
      estimatedTransport: 1.8,
      netAdvantage: 6.2,
      grossAdvantage: 16000,
      netAdvantageTotal: 12400,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Festival and restaurant demand spike' },
        { label: 'Buyer demand', value: '2,000 Pcs', desc: 'Standard bagging quantity' },
        { label: 'Distance', value: '~330 KM', desc: 'Direct transit corridor' },
        { label: 'Estimated transport', value: '~₹1.8/kg', desc: 'Long shelf-life minimizes damage risk' }
      ]
    },
    markets: [
      { name: 'Chennai Wholesale Terminal', price: 26, demand: 'HIGH', diff: '+₹8/kg', advantage: true },
      { name: 'Pollachi Market', price: 18, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-madras-coconut',
        name: 'Madras Coconut Trading Co.',
        badge: 'B2B Wholesale Buyer',
        location: 'Chennai',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: 2000,
        targetPrice: 26,
        paymentTerms: 'WhatsApp-coordinated payment on dispatch confirmation',
        matchHighlights: ['Volume Match (2,000 Pcs)', 'Grade Match', 'Verified Trader'],
        isBestMatch: true
      }
    ]
  },
  {
    id: 'crop-cotton',
    name: 'Cotton',
    icon: '',
    defaultQty: 1200,
    defaultLocation: 'Perambalur',
    grade: 'DCH-32 Long Staple',
    localPrice: 72,
    bestMarket: {
      location: 'Coimbatore Textile Mills',
      tamilLocation: 'கோவை ஜவுளி ஆலைகள்',
      price: 84,
      grossDiff: 12,
      demand: 'HIGH',
      distance: '~220 KM',
      estimatedTransport: 2.0,
      netAdvantage: 10.0,
      grossAdvantage: 14400,
      netAdvantageTotal: 12000,
      whyReasons: [
        { label: 'Demand', value: 'HIGH', desc: 'Spinning mill procurement for premium yarn' },
        { label: 'Buyer demand', value: '1,200 KG', desc: 'Mill lot minimum' },
        { label: 'Distance', value: '~220 KM', desc: 'Direct Coimbatore industrial corridor' },
        { label: 'Estimated transport', value: '~₹2.0/kg', desc: 'Bale transportation coverage' }
      ]
    },
    markets: [
      { name: 'Coimbatore Textile Mills', price: 84, demand: 'HIGH', diff: '+₹12/kg', advantage: true },
      { name: 'Perambalur Yard', price: 72, demand: 'MEDIUM', diff: 'Base', advantage: false }
    ],
    matchedBuyers: [
      {
        id: 'buyer-kongu-spinners',
        name: 'Kongu Textile & Spinning Consortium',
        badge: 'B2B Industrial Buyer',
        location: 'Coimbatore',
        tamilLocation: 'கோவை',
        distance: '~220 KM',
        requirementQty: 1200,
        targetPrice: 84,
        paymentTerms: 'WhatsApp-coordinated payment upon laboratory staple test',
        matchHighlights: ['Volume Match (1,200 KG)', 'Industrial Mill Buyer', 'Direct Dispatch'],
        isBestMatch: true
      }
    ]
  }
];

// Quick suggestion chips for Step 1
export const popularCropChips = [
  { name: 'Tomato', icon: '', },
  { name: 'Rice', icon: '', },
  { name: 'Onion', icon: '', },
  { name: 'Banana', icon: '', },
  { name: 'Sugarcane', icon: '', },
  { name: 'Groundnut', icon: '', },
  { name: 'Carrot', icon: '', },
  { name: 'Chilli', icon: '🌶️', },
  { name: 'Brinjal', icon: '', },
  { name: 'Coconut', icon: '', }
];

// Crop-agnostic resolver: handles ANY agricultural crop entered by user
export const findOrBuildCrop = ({ 
  cropName = 'Tomato', 
  quantityKg = 2000, 
  location = 'Trichy', 
  quality = 'Grade A', 
  harvestDate = '2026-10-05', 
  expectedPrice = null 
}) => {
  const cleanName = (cropName || 'Tomato').trim();
  const lower = cleanName.toLowerCase();

  // Search across default crops and expanded catalog
  const catalog = [...defaultCrops, ...popularCropsCatalog];
  const matched = catalog.find(c => 
    c.name.toLowerCase() === lower ||
    c.name.toLowerCase().includes(lower) 
  );

  if (matched) {
    const qty = Number(quantityKg) || matched.defaultQty;
    const grossDiff = matched.bestMarket.grossDiff;
    const estimatedTransport = matched.bestMarket.estimatedTransport || 1.8;
    const netAdvantage = matched.bestMarket.netAdvantage;

    return {
      ...matched,
      name: cleanName,
      defaultQty: qty,
      defaultLocation: location || matched.defaultLocation,
      grade: quality || matched.grade,
      harvestDate: harvestDate || '2026-10-05',
      expectedPrice: expectedPrice ? Number(expectedPrice) : matched.localPrice,
      isCustom: false,
      hasMarketData: true,
      bestMarket: {
        ...matched.bestMarket,
        grossAdvantage: Math.round(grossDiff * qty),
        netAdvantageTotal: Math.round(netAdvantage * qty)
      }
    };
  }

  // Graceful fallback for arbitrary custom crop (e.g. "Dragon Fruit", "Mushroom", "Tapioca")
  // MVP Transparency: Do not fabricate false market prices.
  const qty = Number(quantityKg) || 2000;
  return {
    id: `crop-custom-${Date.now()}`,
    name: cleanName,
    icon: '',
    defaultQty: qty,
    defaultLocation: location || 'Trichy',
    grade: quality || 'Grade A',
    harvestDate: harvestDate || '2026-10-05',
    expectedPrice: expectedPrice ? Number(expectedPrice) : null,
    isCustom: true,
    hasMarketData: false, // Triggers honest MVP explanation
    localPrice: expectedPrice ? Number(expectedPrice) : null,
    bestMarket: null, // Signals no fabricated market price
    matchedBuyers: [
      {
        id: 'buyer-generic-aggregator',
        name: 'Tamil Nadu Wholesale Agro Aggregators',
        badge: 'B2B Wholesale Buyer Network',
        location: 'Chennai Central Wholesale Corridor',
        tamilLocation: 'சென்னை',
        distance: '~330 KM',
        requirementQty: qty,
        targetPrice: expectedPrice ? Number(expectedPrice) * 1.15 : 35,
        paymentTerms: 'WhatsApp-coordinated payment terms upon inspection',
        matchHighlights: [
          `Broadcasting RFQ for ${cleanName}`,
          `Volume Match (${qty.toLocaleString()} KG)`,
          'Verified B2B Buyer Hub'
        ],
        isBestMatch: true
      },
      {
        id: 'buyer-direct-supermarket',
        name: 'South India Retail Consortium',
        badge: 'B2B Institutional Buyer',
        location: 'Coimbatore & Chennai Hubs',
        tamilLocation: 'சென்னை / கோவை',
        distance: '~330 KM',
        requirementQty: qty,
        targetPrice: expectedPrice ? Number(expectedPrice) * 1.12 : 33,
        paymentTerms: 'WhatsApp-coordinated advance payment',
        matchHighlights: [
          `Custom procurement lot for ${cleanName}`,
          'Cold chain logistics support',
          'Verified Buyer Network'
        ],
        isBestMatch: false
      }
    ]
  };
};

// Tamil Translation Mappings for Display Value Layer (Keeping underlying data canonical)
export const cropTamilMap = {
  Tomato: "தக்காளி",
  "Ponni Rice": "பொன்னி அரிசி",
  Rice: "பொன்னி அரிசி",
  Onion: "சின்ன வெங்காயம்",
  "Small Red Onion": "சின்ன வெங்காயம்",
  Coconut: "தேங்காய்",
  Banana: "வாழைப்பழம்",
  Cotton: "பருத்தி",
  Sugarcane: "கரும்பு",
  Groundnut: "நிலக்கடலை",
  Carrot: "கேரட்",
  Chilli: "பச்சை மிளகாய்",
  Brinjal: "கத்தரிக்காய்",
  Potato: "உருளைக்கிழங்கு",
  Mango: "மாம்பழம்"
};

export const locationTamilMap = {
  Trichy: "திருச்சி",
  Chennai: "சென்னை",
  Theni: "தேனி",
  Cuddalore: "கடலூர்",
  Tiruvannamalai: "திருவண்ணாமலை",
  Ooty: "ஊட்டி",
  Ramanathapuram: "ராமநாதபுரம்",
  Dindigul: "திண்டுக்கல்",
  Pollachi: "பொள்ளாச்சி",
  Perambalur: "பெரம்பலூர்",
  Salem: "சேலம்",
  Coimbatore: "கோவை",
  Madurai: "மதுரை"
};

export const gradeTamilMap = {
  'Grade A': 'கிரேடு A (நிலையானது)',
  'Grade A (Standard)': 'கிரேடு A (நிலையானது)',
  'Grade B': 'கிரேடு B',
  'Premium / Export': 'உயர்தரம் / ஏற்றுமதி தரம்',
  'Premium / Export Quality': 'உயர்தரம் / ஏற்றுமதி தரம்',
  'Organic Certified': 'இயற்கை வேளாண்மை சான்றிதழ்'
};

export const getCropDisplayName = (cropName, lang = 'en') => {
  if (!cropName) return '';
  if (lang === 'ta') {
    return cropTamilMap[cropName] || cropName;
  }
  return cropName;
};

export const getLocationDisplayName = (locationName, lang = 'en') => {
  if (!locationName) return '';
  if (lang === 'ta') {
    return locationTamilMap[locationName] || locationName;
  }
  return locationName;
};

export const getGradeDisplayName = (gradeName, lang = 'en') => {
  if (!gradeName) return '';
  if (lang === 'ta') {
    return gradeTamilMap[gradeName] || gradeName;
  }
  return gradeName;
};

// Demo Transport Partners (explicitly labeled VERIFIED LOGISTICS PARTNER / DEMO DATA)
export const transportPartners = [
  {
    id: 'transport-tn-agro',
    name: 'Tamil Nadu Agro Logistics',
    badge: 'VERIFIED LOGISTICS PARTNER',
    vehicle: '14 FT Tata 407',
    capacityKg: 2500,
    capacityText: '14 FT • 2.5 TON CAPACITY',
    route: 'Trichy → Chennai',
    tamilRoute: 'திருச்சி → சென்னை',
    estimatedCost: 3600,
    eta: '~6 Hours',
    status: 'Available',
    tamilStatus: 'கிடைக்கும்',
    driver: 'Murugan ',
    phone: '+91 94431 22810'
  },
  {
    id: 'transport-greenroute',
    name: 'GreenRoute Transport',
    badge: 'VERIFIED LOGISTICS PARTNER',
    vehicle: '17 FT Cargo Eicher',
    capacityKg: 4000,
    capacityText: '17 FT • 4.0 TON CAPACITY',
    route: 'Trichy → Chennai',
    tamilRoute: 'திருச்சி → சென்னை',
    estimatedCost: 4800,
    eta: '~6 Hours',
    status: 'Available',
    tamilStatus: 'கிடைக்கும்',
    driver: 'Kannan ',
    phone: '+91 98421 55301'
  },
  {
    id: 'transport-trichy-fresh',
    name: 'Trichy Fresh Cargo',
    badge: 'VERIFIED LOGISTICS PARTNER',
    vehicle: '14 FT Multi-axle',
    capacityKg: 3000,
    capacityText: '14 FT • 3.0 TON CAPACITY',
    route: 'Trichy → Chennai',
    tamilRoute: 'திருச்சி → சென்னை',
    estimatedCost: 3900,
    eta: '~6 Hours',
    status: 'Available',
    tamilStatus: 'கிடைக்கும்',
    driver: 'Senthil ',
    phone: '+91 94435 88120'
  }
];

export const defaultOrder = {
  orderId: 'AG1024',
  crop: 'Tomato',
  tamilCrop: 'தக்காளி',
  icon: '',
  quantityKg: 2000,
  ratePerKg: 34,
  totalValue: 68000,
  pickup: {
    name: 'Trichy Farm Gate',
    lat: 10.7905,
    lng: 78.7047
  },
  delivery: {
    name: 'Chennai Koyambedu',
    lat: 13.0694,
    lng: 80.1948
  },
  distanceKm: 330,
  estimatedTime: '~6 Hours via NH38 / NH45',
  transport: transportPartners[0],
  stages: [
    { id: 1, key: 'stage1', done: true, current: false, time: '08:30 AM', note: 'Lot submitted & matched with buyer' },
    { id: 2, key: 'stage2', done: true, current: false, time: '09:15 AM', note: 'Koyambedu Mart accepted ₹34/kg rate' },
    { id: 3, key: 'stage3', done: true, current: false, time: '10:00 AM', note: 'Payment coordination through WhatsApp' },
    { id: 4, key: 'stage4', done: true, current: false, time: '10:45 AM', note: 'Tamil Nadu Agro Logistics assigned' },
    { id: 5, key: 'stage5', done: false, current: true, time: '01:30 PM', note: 'In Transit near Villupuram (NH45)' },
    { id: 6, key: 'stage6', done: false, current: false, time: '05:00 PM (Est.)', note: 'Arrival at Koyambedu Terminal' },
    { id: 7, key: 'stage7', done: false, current: false, time: '06:00 PM (Est.)', note: 'Weighbridge confirmation & final settlement' },
  ]
};

// Route polyline coordinates connecting Trichy to Chennai Koyambedu along NH38/NH45
export const routeCoordinates = [
  [10.7905, 78.7047], // Trichy
  [10.9856, 78.7981], // Samayapuram
  [11.2342, 78.8809], // Perambalur
  [11.5976, 79.1624], // Ulundurpet
  [11.9398, 79.4897], // Villupuram (Current Truck position)
  [12.2472, 79.7212], // Tindivanam
  [12.6922, 79.9774], // Chengalpattu
  [12.9249, 80.1000], // Tambaram
  [13.0694, 80.1948]  // Chennai Koyambedu
];
