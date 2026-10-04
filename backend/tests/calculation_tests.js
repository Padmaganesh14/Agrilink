function calculateOrderTotal(qtyKg, ratePerKg) {
  return Math.round(Number(qtyKg) * Number(ratePerKg));
}

function calculateMarketAdvantage(
  marketPricePerKg,
  localPricePerKg,
  transportPerKg,
  quantityKg,
) {
  const grossDiffPerKg = marketPricePerKg - localPricePerKg;
  const netAdvantagePerKg = grossDiffPerKg - transportPerKg;
  const totalOpportunity = netAdvantagePerKg * quantityKg;
  return { grossDiffPerKg, netAdvantagePerKg, totalOpportunity };
}

function convertUnits(value, fromUnit, toUnit) {
  if (fromUnit === "quintal" && toUnit === "kg") return value * 100;
  if (fromUnit === "kg" && toUnit === "quintal") return value / 100;
  if (fromUnit === "tonne" && toUnit === "kg") return value * 1000;
  if (fromUnit === "kg" && toUnit === "tonne") return value / 1000;
  throw new Error("Unsupported conversion");
}

function calculateEstimatedTransportCost(baseRateKm, distanceKm) {
  return Math.round(Number(baseRateKm) * Number(distanceKm));
}

function testOrderCalculations() {
  console.log("Testing Order Calculations...");
  const t1 = calculateOrderTotal(2000, 35.5);
  if (t1 !== 71000) throw new Error("Order test 1 failed");

  const t2 = calculateOrderTotal(10.25, 12.33); // 126.3825
  if (t2 !== 126)
    throw new Error("Order test 2 failed, expected 126, got " + t2);

  console.log("Order Calculations OK");
}

function testMarketAdvantage() {
  console.log("Testing Market Advantage...");
  const res = calculateMarketAdvantage(40, 35, 2, 2000);
  if (res.grossDiffPerKg !== 5) throw new Error("Gross diff failed");
  if (res.netAdvantagePerKg !== 3) throw new Error("Net advantage failed");
  if (res.totalOpportunity !== 6000)
    throw new Error("Total opportunity failed");
  console.log("Market Advantage OK");
}

function testUnitConversions() {
  console.log("Testing Unit Conversions...");
  if (convertUnits(1, "quintal", "kg") !== 100)
    throw new Error("Quintal to Kg failed");
  if (convertUnits(500, "kg", "quintal") !== 5)
    throw new Error("Kg to Quintal failed");
  if (convertUnits(2, "tonne", "kg") !== 2000)
    throw new Error("Tonne to Kg failed");
  console.log("Unit Conversions OK");
}

function testTransportCost() {
  console.log("Testing Transport Cost...");
  const cost = calculateEstimatedTransportCost(18.5, 330);
  if (cost !== 6105) throw new Error("Transport cost failed");
  console.log("Transport Cost OK");
}

function runAll() {
  try {
    testOrderCalculations();
    testMarketAdvantage();
    testUnitConversions();
    testTransportCost();
    console.log("All calculation tests passed successfully.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

runAll();
