import React from "react";
import { useAgri } from "./context/AgriContext";
import { Navbar } from "./components/common/Navbar";
import { LandingPage } from "./components/landing/LandingPage";
import { FarmerLoginView } from "./components/auth/FarmerLoginView";
import { BuyerLoginView } from "./components/auth/BuyerLoginView";
import { CommandCenterDashboard } from "./components/dashboard/CommandCenterDashboard";
import { SellMyCropStepper } from "./components/flow/SellMyCropStepper";
import { Step1AddCrop } from "./components/flow/Step1AddCrop";
import { Step2MarketOpportunity } from "./components/flow/Step2MarketOpportunity";
import { Step3BuyerMatch } from "./components/flow/Step3BuyerMatch";
import { Step4PromotionN8N } from "./components/flow/Step4PromotionN8N";
import { Step5OrderPayment } from "./components/flow/Step5OrderPayment";
import { Step5_5TransportSelection } from "./components/flow/Step5_5TransportSelection";
import { Step6LogisticsTracking } from "./components/flow/Step6LogisticsTracking";
import { BuyerMarketplaceView } from "./components/marketplace/BuyerMarketplaceView";

export function AppContent() {
  const { currentView, flowStep, user, userRole } = useAgri();

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900 text-slate-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentView === "landing" ? (
          <LandingPage />
        ) : currentView === "farmer-login" ? (
          <FarmerLoginView />
        ) : currentView === "buyer-login" ? (
          <BuyerLoginView />
        ) : currentView === "command-center" ? (
          user && userRole === "farmer" ? (
            <CommandCenterDashboard />
          ) : (
            <LandingPage />
          )
        ) : currentView === "buyer-marketplace" ? (
          user && userRole === "buyer" ? (
            <BuyerMarketplaceView />
          ) : (
            <LandingPage />
          )
        ) : currentView === "tracking" ? (
          user ? (
            <div className="pt-4 px-2 md:px-0">
              <Step6LogisticsTracking />
            </div>
          ) : (
            <LandingPage />
          )
        ) : currentView === "flow" ? (
          user && userRole === "farmer" ? (
            <div>
              <SellMyCropStepper />
              <div className="pt-4 px-2 md:px-0">
                {flowStep === 1 ? (
                  <Step1AddCrop />
                ) : flowStep === 2 ? (
                  <Step2MarketOpportunity />
                ) : flowStep === 3 ? (
                  <Step3BuyerMatch />
                ) : flowStep === 4 ? (
                  <Step4PromotionN8N />
                ) : flowStep === 5 ? (
                  <Step5OrderPayment />
                ) : flowStep === "transport" ? (
                  <Step5_5TransportSelection />
                ) : flowStep === 6 ? (
                  <Step6LogisticsTracking />
                ) : (
                  <Step1AddCrop />
                )}
              </div>
            </div>
          ) : (
            <LandingPage />
          )
        ) : (
          <LandingPage />
        )}
      </main>

      {/* Floating Google Translate Widget */}
      <div className="fixed bottom-4 right-4 z-[9999] bg-white p-2 rounded-lg shadow-lg border border-slate-200">
        <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase text-center tracking-wider">Language</div>
        <div id="google_translate_element" className="scale-90 origin-center"></div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
