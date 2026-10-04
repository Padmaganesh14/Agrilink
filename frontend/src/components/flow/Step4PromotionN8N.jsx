import React, { useState } from 'react';
import { useAgri } from '../../context/AgriContext';
import { getCropDisplayName, getLocationDisplayName } from '../../data/mockData';
import { 
  ArrowRight, 
  ArrowLeft, 
  Zap, 
  Cpu, 
  FileText, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Copy, 
  Sparkles,
  Layers,
  Terminal,
  RefreshCw,
  Database,
  Truck,
  Code2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const Step4PromotionN8N = () => {
  const { 
    t, 
    lang, 
    setFlowStep, 
    selectedCrop, 
    customQty, 
    customLocation,
    cropQuality,
    harvestDate,
    selectedBuyer,
    n8nStatus,
    n8nActiveNode,
    n8nLogs,
    triggerN8nWorkflow,
    marketIntelligence
  } = useAgri();

  const [copied, setCopied] = useState(false);
  const [showJsonPayload, setShowJsonPayload] = useState(false);
  const crop = selectedCrop;

  const cropIcon = crop.icon || '🌱';
  const cropName = crop.name;
  const cropNameTa = getCropDisplayName(crop.name, 'ta');
  const displayLocation = getLocationDisplayName(customLocation, lang);
  const priceDisplay = selectedBuyer?.targetPrice || crop.bestMarket?.price || crop.localPrice || 35;

  const promoCopyEn = `${cropIcon} Fresh ${cropQuality} ${cropName}\n📦 Quantity: ${customQty.toLocaleString()} KG\n📍 Farm-origin: ${customLocation}, Tamil Nadu\n💰 Indicative Market Rate: ₹${priceDisplay} / KG\n🤝 Available for verified B2B purchase via AgriLink AI.\n#AgriLinkAI #${cropName.replace(/\s+/g, '')} #B2BAgriculture #TamilNadu`;

  const promoCopyTa = `${cropIcon} புதிய ${cropQuality === 'Grade A' ? 'கிரேடு A' : cropQuality} ${cropNameTa}\n📦 அளவு: ${customQty.toLocaleString()} கிலோ\n📍 தோட்டம்: ${displayLocation}, தமிழ்நாடு\n💰 உத்தேச மண்டி விலை: ₹${priceDisplay} / கிலோ\n🤝 AGRILINK AI தளம் மூலம் B2B கொள்முதல் செய்யலாம்.\n#AgriLinkAI #${cropNameTa.replace(/\s+/g, '')} #விவசாயம் #தமிழ்நாடு`;

  const promoCopy = lang === 'ta' ? promoCopyTa : promoCopyEn;

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nodes = [
    {
      id: 1,
      name: lang === 'ta' ? '01 வெப்ஹூக் & சரிபார்ப்பு' : '01 WEBHOOK & VALIDATE',
      title: lang === 'ta' ? 'விவசாயி உள்ளீடு' : 'FARMER INGESTION',
      desc: lang === 'ta' ? `${cropNameTa} (${customQty.toLocaleString()} கிலோ, ${displayLocation}) ஏற்கப்பட்டது` : `Payload parsed: ${cropName} (${customQty.toLocaleString()} KG @ ${customLocation})`,
      icon: <Zap className="w-5 h-5 text-amber-400" />
    },
    {
      id: 2,
      name: lang === 'ta' ? '02 அரசு மண்டி தரவு' : '02 MANDI DATASET',
      title: lang === 'ta' ? 'அக்மார்க்நெட் / DMI' : 'AGMARKNET FEED',
      desc: lang === 'ta' ? 'தமிழ்நாடு மண்டி விலைகள் குவிண்டாலிலிருந்து கிலோவாக மாற்றப்பட்டது' : 'data.gov.in / GitHub Mandi Data normalized (1 Quintal = 100 KG)',
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    {
      id: 3,
      name: lang === 'ta' ? '03 சந்தை வாய்ப்பு' : '03 MARKET OPPORTUNITY',
      title: lang === 'ta' ? 'மண்டி ஒப்பீடு' : 'MANDI SPREAD',
      desc: lang === 'ta' ? 'சென்னை vs திருச்சி (+₹7 மொத்த சாதகம் − ₹2 போக்குவரத்து = +₹5 நிகரம்)' : 'Chennai ₹35 vs Trichy ₹28 (+₹7 gross − ₹2 transport = +₹5 net)',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />
    },
    {
      id: 4,
      name: lang === 'ta' ? '04 வாங்குபவர் & சரக்கு' : '04 BUYER & LOGISTICS',
      title: lang === 'ta' ? 'B2B பொருத்தம்' : 'CORRIDOR MATCH',
      desc: lang === 'ta' ? 'கோயம்பேடு மொத்த சந்தை & NH45 வழித்தடம் (~330 கி.மீ Eicher 14FT)' : 'Koyambedu Wholesale Mart & NH45 corridor (~330 KM Eicher 14FT)',
      icon: <Truck className="w-5 h-5 text-emerald-400" />
    },
    {
      id: 5,
      name: lang === 'ta' ? '05 முழுமையான தொகுப்பு' : '05 UNIFIED RESPONSE',
      title: lang === 'ta' ? 'ஒற்றை அடுக்கு இயக்கம்' : 'MASTER EXECUTION',
      desc: lang === 'ta' ? 'விளம்பரம் + வாட்ஸ்அப் ஆர்டர் ஒருங்கிணைப்பு + நேரலை கண்காணிப்பு' : 'Bilingual Promo + WhatsApp Order Escrow + Live Telemetry Active',
      icon: <Layers className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 text-ai-700 px-5 py-3 rounded-md text-base font-black  mb-2 border border-indigo-200">
          <Sparkles className="w-3.5 h-3.5 text-ai-600" />
          <span>{t.step04Pill}</span>
          <span>•</span>
          <span>{lang === 'ta' ? 'படி 4 / 6' : 'Step 4 of 6'}</span>
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight ">
          {lang === 'ta' ? 'ஒற்றை அடுக்கு n8n முதன்மை பணிப்பாய்வு' : 'Single-Layer n8n Master Workflow'}
        </h1>
        <p className="text-base sm:text-lg font-medium text-slate-500 mt-1">
          {lang === 'ta' 
            ? 'ஒரே பணிப்பாய்வில்: விவசாயி உள்ளீடு ➔ மண்டி பகுப்பாய்வு ➔ வாங்குபவர் பொருத்தம் ➔ சரக்கு கட்டணம் ➔ வாட்ஸ்அப் ஆர்டர் ➔ நேரலை கண்காணிப்பு.'
            : 'One unified orchestration pipeline: Farmer Ingestion ➔ Mandi Analysis ➔ Buyer Matching ➔ Freight ➔ WhatsApp Order ➔ Logistics.'}
        </p>
      </div>

      {/* The WOW Visualizer: n8n Node Workflow Graph */}
      <div className="bg-[#0F172A] rounded-lg p-6 sm:p-8 text-white border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
        
        {/* Header inside canvas */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ai-500 animate-ping"></span>
            <h2 className="text-lg font-black  text-slate-200">
              {lang === 'ta' ? 'AGRILINK AI — தொடர்ச்சியான ஒற்றை அடுக்கு n8n இயக்கம்' : 'AgriLink AI — Master Continuous n8n Workflow'}
            </h2>
            <span className="text-[9px] bg-purple-950 text-purple-300 font-extrabold px-4 py-2 rounded-md border border-purple-500/40">
              {lang === 'ta' ? '15-முனைகள் கொண்ட ஒற்றை பணிப்பாய்வு' : '15-Node Single Continuous Pipeline'}
            </span>
          </div>

          <button
            onClick={triggerN8nWorkflow}
            disabled={n8nStatus === 'running'}
            className={`px-5 py-2.5 rounded-lg font-black text-base  shadow-lg flex items-center space-x-2 transition-all ${
              n8nStatus === 'running'
                ? 'bg-ai-600/50 text-white cursor-not-allowed animate-pulse'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>
              {n8nStatus === 'running'
                ? (lang === 'ta' ? '⚡ பணிப்பாய்வு இயங்குகிறது...' : '⚡ EXECUTING WORKFLOW...')
                : t.promoteMyCropBtn}
            </span>
          </button>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
          {nodes.map((node) => {
            const isCompleted = n8nActiveNode > node.id || n8nStatus === 'completed';
            const isCurrent = n8nActiveNode === node.id && n8nStatus === 'running';

            return (
              <div
                key={node.id}
                className={`rounded-lg p-4 border transition-all duration-300 flex flex-col justify-between relative ${
                  isCurrent
                    ? 'border-ai-500 bg-indigo-950/70 shadow-xl shadow-md scale-105'
                    : isCompleted
                    ? 'border-emerald-500/80 bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-900/60 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                    {node.icon}
                  </div>
                  {isCompleted ? (
                    <span className="flex items-center space-x-1 text-[9px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/40">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{lang === 'ta' ? 'முடிந்தது' : 'Complete'}</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-md border border-amber-500/40 animate-pulse">
                      {lang === 'ta' ? 'இயங்குகிறது' : 'Running'}
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-mono">
                      0{node.id}
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-lg font-bold text-ai-500 st">
                    {node.name}
                  </p>
                  <h3 className="text-base font-black text-white leading-tight  mt-0.5">
                    {node.title}
                  </h3>
                  <p className="text-lg text-slate-400 mt-1 line-clamp-2">
                    {node.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Execution Console Window */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-lg p-4 font-mono text-base">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 mb-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-base font-bold ">
                {lang === 'ta' ? 'செயலாக்க முனையம் (Execution Console)' : 'Execution Console'}
              </span>
            </div>
            <span className="text-lg text-slate-500 font-mono">
              {lang === 'ta' ? 'n8n வெப்ஹூக் செயலில் உள்ளது' : 'n8n webhook listener active'}
            </span>
          </div>

          <div className="space-y-1 text-slate-300 min-h-[60px] max-h-28 overflow-y-auto">
            {n8nLogs.length === 0 ? (
              <p className="text-slate-500 italic">
                {lang === 'ta' ? `தானியங்கி விளம்பரத்தை செயல்படுத்த "[ ${t.promoteMyCropBtn} ]" பொத்தானை அழுத்தவும்.` : `Click "[ ${t.promoteMyCropBtn} ]" to trigger the automated promotion sequence.`}
              </p>
            ) : (
              n8nLogs.map((log, idx) => (
                <p key={idx} className={log.includes('completed') || log.includes('Completed') ? 'text-emerald-400 font-bold' : ''}>
                  {log}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Toggle to view Single Master n8n Execution Response */}
        <div className="pt-1">
          <button
            onClick={() => setShowJsonPayload(!showJsonPayload)}
            className="flex items-center space-x-2 text-base font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 px-3.5 py-2 rounded-lg border border-slate-700 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5 text-ai-400" />
            <span>
              {showJsonPayload 
                ? (lang === 'ta' ? 'JSON மறைக்கவும்' : 'Hide Master n8n Response JSON') 
                : (lang === 'ta' ? 'ஒற்றை n8n JSON விடையைப் பார்க்க' : 'View Single Master n8n Response JSON')}
            </span>
            {showJsonPayload ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showJsonPayload && (
            <div className="mt-3 bg-slate-950 p-4 rounded-lg border border-slate-800 text-base font-mono text-emerald-300 overflow-x-auto max-h-72">
              <pre>{JSON.stringify({
                crop: cropName,
                quantityKg: customQty,
                farmerLocation: customLocation,
                recommendedMarket: {
                  market: "Chennai",
                  modalPricePerKg: marketIntelligence?.bestMarket?.marketPricePerKg || 35,
                  demand: "High",
                  grossDiffPerKg: marketIntelligence?.bestMarket?.grossDiffPerKg || 7,
                  netAdvantagePerKg: marketIntelligence?.bestMarket?.netAdvantagePerKg || 5,
                  totalOpportunityAmount: marketIntelligence?.bestMarket?.totalOpportunityAmount || (5 * customQty)
                },
                marketComparison: [
                  { market: "Trichy", pricePerKg: 28 },
                  { market: "Chennai", pricePerKg: 35 },
                  { market: "Coimbatore", pricePerKg: 32 },
                  { market: "Madurai", pricePerKg: 27 }
                ],
                buyer: {
                  name: selectedBuyer?.name || "Koyambedu Wholesale Mart",
                  requiredQuantityKg: customQty
                },
                transport: {
                  partner: "Tamil Nadu Agro Logistics",
                  estimatedCost: 3600
                },
                aiInsight: "Chennai shows a higher observed mandi price (+₹7/kg over farmer expectation) offsetting the ~₹2/kg NH45 transport cost and unlocking +₹10,000 net opportunity.",
                promotion: {
                  caption: promoCopyEn
                }
              }, null, 2)}</pre>
            </div>
          )}
        </div>

      </div>

      {/* Generated Content Card */}
      <div className="bg-white rounded-lg p-6 sm:p-7 border border-slate-200/90 shadow-xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📢</span>
            <h3 className="text-lg font-black text-slate-900 ">
              {lang === 'ta' ? 'மொத்த வியாபாரிகளுக்கான விளம்பர உரை' : 'Buyer-Facing Promotional Output'}
            </h3>
          </div>
          <span className="text-base font-bold text-slate-400">
            {lang === 'ta' ? 'AGRILINK AI மூலம் தானாக உருவாக்கப்பட்டது' : 'Auto-formatted via AgriLink AI'}
          </span>
        </div>

        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 relative font-medium text-base sm:text-lg text-slate-800 whitespace-pre-line leading-relaxed">
          {promoCopy}

          <div className="absolute top-3 right-3 flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-agri-500 transition-colors shadow-xs"
              title="Copy to clipboard"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-agri-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert('New promotional copy variations synthesized.')}
              className="px-6 py-4 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-base flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Regenerate</span>
            </button>

            <button
              onClick={() => {
                const url = `https://wa.me/?text=${encodeURIComponent(promoCopy)}`;
                window.open(url, '_blank');
              }}
              className="px-6 py-4 rounded-lg bg-emerald-50 text-agri-800 border border-emerald-300 hover:bg-emerald-100 font-bold text-base flex items-center space-x-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-agri-500" />
              <span>Share to WhatsApp</span>
            </button>
          </div>

          <button
            onClick={() => setFlowStep(5)}
            className="px-6 py-3.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white border-2 border-[#14532d] text-white font-black text-base  shadow-lg shadow-md flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <span>{t.proceedToOrderBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setFlowStep(3)}
          className="px-5 py-3 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-base flex items-center space-x-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.back}</span>
        </button>

        <button
          onClick={() => setFlowStep(5)}
          className="px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center space-x-2 transition-colors"
        >
          <span>Continue to Order Confirmed</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

    </div>
  );
};
