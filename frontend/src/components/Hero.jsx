import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowBigDownDash, ArrowLeft, ArrowRight, ArrowRightIcon } from "lucide-react";
import { otherData } from "../assets";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = 5;
  const navigate = useNavigate();

  const goToSlide = useCallback((index) => {
    setCurrent((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(current + 1);
  }, [current, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(current - 1);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative w-full overflow-hidden h-screen md:h-[100vh] min-h-[600px] md:min-h-[500px]">
      {/* Slide 0 - Your Hero Content */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease flex items-center justify-center ${current === 0 ? "opacity-100 pointer-events-auto slide-active" : "opacity-0 pointer-events-none"}`} style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), #0A0D0F" }}>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between px-5 md:px-16 lg:px-24 xl:px-28 py-12 md:py-0 gap-8 md:gap-[4%]">
          <div className="w-[3px] h-[40px] md:h-[60px] rounded-sm flex-shrink-0 hidden md:block" style={{ background: "linear-gradient(135deg,#FFFFFF,#AAAAAA)" }}></div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] md:text-[12px] font-medium tracking-[0.18em] uppercase mb-3 md:mb-[10px] eyebrow" style={{ color: "#AAAAAA" }}>{otherData?.brandName}</div>
            <div className="font-semibold text-3xl sm:text-4xl md:text-[clamp(20px,3.2vw,36px)] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-3 headline">The No. 1 Anti-Garment <br className="hidden sm:block" /> Waste Web</div>
            <div className="text-sm sm:text-base md:text-[clamp(11px,1.3vw,16px)] text-white/50 leading-relaxed max-w-full md:max-w-[480px] body-text px-4 md:px-0">
              Every year, 100 billion garments are crafted worldwide. Yet, 30% never find an owner—never draped, never worn. At {otherData?.brandName}, we give these pieces a second chance to become part of your story.
            </div>
            <Link to="/auctions" className="inline-block mt-5 md:mt-4 px-6 md:px-5 py-2.5 md:py-2.5 rounded-full text-sm md:text-sm font-medium tracking-[0.05em] transition-all hover:brightness-110 cta-btn" style={{ background: "#FFFFFF", color: "#0A0D0F" }}>
              Explore Auctions →
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 md:gap-2.5">
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full flex flex-col items-center justify-center border-2 big-badge" style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}>
                <ArrowBigDownDash size={32} />
              </div>
              <div className="flex gap-2 mini-badges">
                <span className="px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.15)", color: "#FFFFFF" }}>Second Life</span>
                <span className="px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium bg-white/10 text-white/70">Circular</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 1 - Inspection Service */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease flex items-center justify-center ${current === 1 ? "opacity-100 pointer-events-auto slide-active" : "opacity-0 pointer-events-none"}`} style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(29,158,117,0.12) 0%, transparent 60%), #0A0D0F" }}>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between px-5 md:px-16 lg:px-24 xl:px-28 py-12 md:py-0 gap-8 md:gap-[4%]">
          <div className="w-[3px] h-[40px] md:h-[60px] rounded-sm flex-shrink-0 hidden md:block" style={{ background: "linear-gradient(135deg,#1D9E75,#5DCAA5)" }}></div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] md:text-[12px] font-medium tracking-[0.18em] uppercase mb-3 md:mb-[10px] eyebrow" style={{ color: "#5DCAA5" }}>Inspection Service</div>
            <div className="font-semibold text-3xl sm:text-4xl md:text-[clamp(20px,3.2vw,36px)] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-3 headline">Verified before<br />every deal,<br />by experts</div>
            <div className="text-sm sm:text-base md:text-[clamp(11px,1.3vw,16px)] text-white/50 leading-relaxed max-w-full md:max-w-[480px] body-text px-4 md:px-0">
              {otherData?.brandName} is a fashion close-out trading platform providing trusted inspection for buyers and sellers. Our expert team verifies product condition, quantity, and labeling.
            </div>
            <button onClick={() => navigate('/contact')} className="mt-5 md:mt-4 px-6 md:px-5 py-2.5 md:py-2.5 rounded-full text-sm md:text-sm font-medium tracking-[0.05em] transition-all hover:brightness-110 cta-btn" style={{ background: "#1D9E75", color: "#fff" }}>
              Learn more →
            </button>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center">
            <div className="flex flex-row md:flex-col gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(29,158,117,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <rect x="2" y="2" width="12" height="12" rx="2" stroke="#5DCAA5" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Quantity & SKU verification</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(29,158,117,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <circle cx="8" cy="8" r="5" stroke="#5DCAA5" strokeWidth="1.5" />
                    <path d="M8 5v3l2 1" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Label & origin check</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(29,158,117,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Condition grading</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(29,158,117,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <path d="M3 3h10v8H3z" stroke="#5DCAA5" strokeWidth="1.5" />
                    <path d="M6 13h4" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Inspection report issued</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 2 - Verified by Experts */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease flex items-center justify-center ${current === 2 ? "opacity-100 pointer-events-auto slide-active" : "opacity-0 pointer-events-none"}`} style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(186,117,23,0.12) 0%, transparent 60%), #0A0D0F" }}>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between px-5 md:px-16 lg:px-24 xl:px-28 py-12 md:py-0 gap-8 md:gap-[4%]">
          <div className="w-[3px] h-[40px] md:h-[60px] rounded-sm flex-shrink-0 hidden md:block" style={{ background: "linear-gradient(135deg,#BA7517,#EF9F27)" }}></div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] md:text-[12px] font-medium tracking-[0.18em] uppercase mb-3 md:mb-[10px] eyebrow" style={{ color: "#EF9F27" }}>Verified by Experts</div>
            <div className="font-semibold text-3xl sm:text-4xl md:text-[clamp(20px,3.2vw,36px)] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-3 headline">Trade with confidence,<br />backed by fashion<br />industry veterans</div>
            <div className="text-sm sm:text-base md:text-[clamp(11px,1.3vw,16px)] text-white/50 leading-relaxed max-w-full md:max-w-[480px] body-text px-4 md:px-0">
              Inspectors with 10+ years of fashion sourcing experience verify every lot. Authenticity, condition grade, and packaging all checked for dispute-free transactions.
            </div>
            <button onClick={() => navigate('/contact')} className="mt-5 md:mt-4 px-6 md:px-5 py-2.5 md:py-2.5 rounded-full text-sm md:text-sm font-medium tracking-[0.05em] transition-all hover:brightness-110 cta-btn" style={{ background: "#BA7517", color: "#fff" }}>
              Request inspection →
            </button>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 md:gap-2.5">
              <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full flex flex-col items-center justify-center border-2 big-badge" style={{ color: "#EF9F27", borderColor: "rgba(239,159,39,0.5)" }}>
                <span className="font-semibold text-2xl md:text-[28px] leading-none" style={{ color: "#EF9F27" }}>A+</span>
                <span className="text-[8px] md:text-[9px] tracking-[0.1em] uppercase opacity-70 mt-0.5" style={{ color: "#EF9F27" }}>Verified</span>
              </div>
              <div className="flex gap-2 mini-badges">
                <span className="px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium" style={{ background: "rgba(239,159,39,0.15)", color: "#EF9F27" }}>Authentic</span>
                <span className="px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium bg-white/10 text-white/50">Grade A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 3 - Inspection Report */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease flex items-center justify-center ${current === 3 ? "opacity-100 pointer-events-auto slide-active" : "opacity-0 pointer-events-none"}`} style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(24,95,165,0.12) 0%, transparent 60%), #0A0D0F" }}>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between px-5 md:px-16 lg:px-24 xl:px-28 py-12 md:py-0 gap-8 md:gap-[4%]">
          <div className="w-[3px] h-[40px] md:h-[60px] rounded-sm flex-shrink-0 hidden md:block" style={{ background: "linear-gradient(135deg,#185FA5,#378ADD)" }}></div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] md:text-[12px] font-medium tracking-[0.18em] uppercase mb-3 md:mb-[10px] eyebrow" style={{ color: "#378ADD" }}>Inspection Report</div>
            <div className="font-semibold text-3xl sm:text-4xl md:text-[clamp(20px,3.2vw,36px)] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-3 headline">Detailed inspection<br />report included<br />with every trade</div>
            <div className="text-sm sm:text-base md:text-[clamp(11px,1.3vw,16px)] text-white/50 leading-relaxed max-w-full md:max-w-[480px] body-text px-4 md:px-0">
              Results are issued as a digital report immediately after review. Buyers get full product details before delivery; sellers build a verified track record.
            </div>
            <Link target="_blank" to={`https://res.cloudinary.com/dydo1tjxm/image/upload/v1775026569/sample_report_tt1g3g.pdf`} className="mt-5 inline-block md:mt-4 px-6 md:px-5 py-2.5 md:py-2.5 rounded-full text-sm md:text-sm font-medium tracking-[0.05em] transition-all hover:brightness-110 cta-btn" style={{ background: "#185FA5", color: "#fff" }}>
              View sample report →
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-3.5 w-full max-w-[280px] md:w-[200px] report-visual">
              <div className="text-[11px] md:text-[12px] uppercase tracking-[0.12em] text-white/40 mb-2 md:mb-2.5">Inspection Report</div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-[11px] md:text-[13px]">
                <span className="text-white/45">Quantity match</span>
                <span className="font-medium text-green-400">✓ Match</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-[11px] md:text-[13px]">
                <span className="text-white/45">Label condition</span>
                <span className="font-medium text-green-400">✓ Good</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-[11px] md:text-[13px]">
                <span className="text-white/45">Origin marking</span>
                <span className="font-medium text-green-400">✓ Accurate</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-[11px] md:text-[13px]">
                <span className="text-white/45">Packaging</span>
                <span className="font-medium text-yellow-400">△ Minor damage</span>
              </div>
              <div className="flex justify-between items-center py-1.5 text-[10px] md:text-[13px]">
                <span className="text-white/45">Condition grade</span>
                <span className="font-medium" style={{ color: "#378ADD" }}>Grade B+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 4 - How It Works */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease flex items-center justify-center ${current === 4 ? "opacity-100 pointer-events-auto slide-active" : "opacity-0 pointer-events-none"}`} style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(153,60,29,0.12) 0%, transparent 60%), #0A0D0F" }}>
        <div className="flex flex-col md:flex-row w-full items-center justify-center md:justify-between px-5 md:px-16 lg:px-24 xl:px-28 py-12 md:py-0 gap-8 md:gap-[4%]">
          <div className="w-[3px] h-[40px] md:h-[60px] rounded-sm flex-shrink-0 hidden md:block" style={{ background: "linear-gradient(135deg,#993C1D,#D85A30)" }}></div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-[10px] md:text-[12px] font-medium tracking-[0.18em] uppercase mb-3 md:mb-[10px] eyebrow" style={{ color: "#D85A30" }}>How It Works</div>
            <div className="font-semibold text-3xl sm:text-4xl md:text-[clamp(20px,3.2vw,36px)] leading-[1.2] md:leading-[1.15] text-white mb-3 md:mb-3 headline">Get started in<br />3 simple steps</div>
            <div className="text-sm sm:text-base md:text-[clamp(11px,1.3vw,16px)] text-white/50 leading-relaxed max-w-full md:max-w-[480px] body-text px-4 md:px-0">
              ① Request inspection → ② On-site inspection by our team → ③ Receive report & confirm the deal. Sellers earn trust; buyers purchase fashion stock with zero risk.
            </div>
            <button onClick={() => navigate('/contact')} className="mt-5 md:mt-4 px-6 md:px-5 py-2.5 md:py-2.5 rounded-full text-sm md:text-sm font-medium tracking-[0.05em] transition-all hover:brightness-110 cta-btn" style={{ background: "#993C1D", color: "#fff" }}>
              Get started →
            </button>
          </div>
          <div className="flex-shrink-0 w-full md:w-auto flex items-center justify-center">
            <div className="flex flex-row md:flex-col gap-2 flex-wrap justify-center">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(216,90,48,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <circle cx="8" cy="8" r="5" stroke="#D85A30" strokeWidth="1.5" />
                    <text x="8" y="11.5" textAnchor="middle" fill="#D85A30" fontSize="7" fontFamily="sans-serif">1</text>
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Submit request online</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(216,90,48,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <circle cx="8" cy="8" r="5" stroke="#D85A30" strokeWidth="1.5" />
                    <text x="8" y="11.5" textAnchor="middle" fill="#D85A30" fontSize="7" fontFamily="sans-serif">2</text>
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">On-site expert inspection</span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 step-pill">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(216,90,48,0.2)" }}>
                  <svg viewBox="0 0 16 16" fill="none" width="12" height="12" className="md:w-[14px] md:h-[14px]">
                    <circle cx="8" cy="8" r="5" stroke="#D85A30" strokeWidth="1.5" />
                    <text x="8" y="11.5" textAnchor="middle" fill="#D85A30" fontSize="7" fontFamily="sans-serif">3</text>
                  </svg>
                </div>
                <span className="text-[12px] md:text-sm text-white/75">Report received & deal done</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hide on mobile */}
      <button onClick={prevSlide} className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-3.5 w-10 h-10 rounded-full bg-white/10 border border-white/15 items-center justify-center cursor-pointer z-10 transition-colors hover:bg-white/20 text-white/60 text-base">
        <ArrowLeft />
      </button>
      <button onClick={nextSlide} className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-3.5 w-10 h-10 rounded-full bg-white/10 border border-white/15 items-center justify-center cursor-pointer z-10 transition-colors hover:bg-white/20 text-white/60 text-base">
        <ArrowRight />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {[0, 1, 2, 3, 4].map((idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 cursor-pointer ${current === idx
                ? "w-5 bg-white/70 rounded-[3px] h-1.5"
                : "w-1.5 h-1.5 bg-white/20 rounded-full"
              }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-4 right-6 text-[12px] text-white/25 z-10">
        {current + 1} / {totalSlides}
      </div>
    </section>
  );
};

export default HeroSlider;