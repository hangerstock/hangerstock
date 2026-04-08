import { useState } from "react";
import { Container } from "../components";
import { otherData } from "../assets";

const EscrowCategories = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Container className="pt-24 md:pt-32 pb-16">
            {/* Header Section */}
            <div className="mb-7">
                <div className="inline-block bg-[#eaf3de] text-[#27500a] text-[11px] font-semibold tracking-[0.08em] uppercase px-2.5 py-[3px] rounded-full mb-2.5">
                    Escrow & Payment Fee Structure
                </div>
                <div className="font-serif text-[1.6rem] text-gray-900 mb-1.5">
                    Payment & Escrow Fee Structure
                </div>
                <div className="text-[13px] text-gray-500 leading-relaxed">
                    {otherData?.brandName} uses Stripe for secure payment. Fees vary by payment method, buyer location, and card origin.
                </div>
            </div>

            {/* Card Payment Section */}
            <div className="mb-7">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-3 pb-1.5 border-b border-gray-200">
                    💳 Card payment — by buyer & card type
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {/* Domestic Card */}
                    <div className="border border-[#b8ddb8] rounded-xl p-4 bg-white">
                        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a] mb-2">
                            Domestic buyer · US card
                        </span>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#eaf3de] flex items-center justify-center text-sm flex-shrink-0">🇺🇸</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">US Buyer</div>
                                <div className="text-[11px] text-gray-400">US-issued card</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Card processing fee</div>
                                <div className="text-[11px] text-gray-400">Standard Stripe domestic</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#2A7A2A] text-right whitespace-nowrap">2.9% + $0.30</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Intl card surcharge</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-400 text-right whitespace-nowrap">None</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Currency conversion</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-400 text-right whitespace-nowrap">None</div>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                            <div className="text-[12px] font-semibold text-gray-500">Total buyer fee</div>
                            <div className="font-serif text-[1.15rem] text-[#2A7A2A]">2.9% + $0.30</div>
                        </div>
                    </div>

                    {/* International Card - USD */}
                    <div className="border border-[#e8c97a] rounded-xl p-4 bg-white">
                        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#faeeda] text-[#633806] mb-2">
                            Overseas buyer · Foreign card · USD
                        </span>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#faeeda] flex items-center justify-center text-sm flex-shrink-0">🌍</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">International Buyer</div>
                                <div className="text-[11px] text-gray-400">Non-US card · USD payment</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Card processing fee</div>
                                <div className="text-[11px] text-gray-400">Base Stripe rate</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#854f0b] text-right whitespace-nowrap">2.9% + $0.30</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Intl card surcharge</div>
                                <div className="text-[11px] text-gray-400">Card issued outside the US</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#854f0b] text-right whitespace-nowrap">+1.5%</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Currency conversion</div>
                                <div className="text-[11px] text-gray-400">Payment in USD</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-400 text-right whitespace-nowrap">None</div>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                            <div className="text-[12px] font-semibold text-gray-500">Total buyer fee</div>
                            <div className="font-serif text-[1.15rem] text-[#854f0b]">4.4% + $0.30</div>
                        </div>
                    </div>

                    {/* International Card - FX */}
                    <div className="border border-[#b5d4f4] rounded-xl p-4 bg-white">
                        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#e6f1fb] text-[#0c447c] mb-2">
                            Overseas buyer · Foreign card · FX
                        </span>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#e6f1fb] flex items-center justify-center text-sm flex-shrink-0">💱</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">International Buyer</div>
                                <div className="text-[11px] text-gray-400">Non-US card · Non-USD payment</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Card processing fee</div>
                                <div className="text-[11px] text-gray-400">Base Stripe rate</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#185fa5] text-right whitespace-nowrap">2.9% + $0.30</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Intl card surcharge</div>
                                <div className="text-[11px] text-gray-400">Card issued outside the US</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#185fa5] text-right whitespace-nowrap">+1.5%</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Currency conversion fee</div>
                                <div className="text-[11px] text-gray-400">Payment currency ≠ USD</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#185fa5] text-right whitespace-nowrap">+1.0%</div>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                            <div className="text-[12px] font-semibold text-gray-500">Total buyer fee</div>
                            <div className="font-serif text-[1.15rem] text-[#185fa5]">5.4% + $0.30</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wire Transfer Section */}
            <div className="mb-7">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-3 pb-1.5 border-b border-gray-200">
                    🏦 Wire transfer — domestic vs. international
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {/* Domestic Wire */}
                    <div className="border border-[#b8ddb8] rounded-xl p-4 bg-white">
                        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a] mb-2">
                            Domestic wire · US buyer
                        </span>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#eaf3de] flex items-center justify-center text-sm flex-shrink-0">🏛</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">US Domestic Wire</div>
                                <div className="text-[11px] text-gray-400">ACH or bank wire within the US</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">ACH transfer fee</div>
                                <div className="text-[11px] text-gray-400">Standard bank-to-bank (3–5 business days)</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#2A7A2A] text-right whitespace-nowrap">$1.00 flat</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Domestic wire fee</div>
                                <div className="text-[11px] text-gray-400">Same-day / next-day bank wire</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#2A7A2A] text-right whitespace-nowrap">$8.00 flat</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Currency conversion</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-400 text-right whitespace-nowrap">None</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">International surcharge</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-400 text-right whitespace-nowrap">None</div>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                            <div className="text-[12px] font-semibold text-gray-500">Typical total fee</div>
                            <div className="font-serif text-[1.15rem] text-[#2A7A2A]">$1.00 – $8.00</div>
                        </div>
                    </div>

                    {/* International Wire */}
                    <div className="border border-[#c0b4f4] rounded-xl p-4 bg-white">
                        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eeedfe] text-[#3c3489] mb-2">
                            International wire · Overseas buyer
                        </span>
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#eeedfe] flex items-center justify-center text-sm flex-shrink-0">🌐</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">International Wire</div>
                                <div className="text-[11px] text-gray-400">Cross-border SWIFT transfer</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">International wire fee</div>
                                <div className="text-[11px] text-gray-400">Stripe / SWIFT processing</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#533ab7] text-right whitespace-nowrap">$20.00 flat</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Intermediary bank fee</div>
                                <div className="text-[11px] text-gray-400">Third-party correspondent bank (varies)</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#533ab7] text-right whitespace-nowrap">$10–$25</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Currency conversion fee</div>
                                <div className="text-[11px] text-gray-400">When non-USD wire is received</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#533ab7] text-right whitespace-nowrap">+1.0%</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">FX rate spread</div>
                                <div className="text-[11px] text-gray-400">Stripe mid-market rate + spread</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#533ab7] text-right whitespace-nowrap">~0.5–1.5%</div>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-300">
                            <div className="text-[12px] font-semibold text-gray-500">Typical total fee</div>
                            <div className="font-serif text-[1.15rem] text-[#533ab7]">$30–$45 + FX</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Fees Section */}
            <div className="mb-7">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-3 pb-1.5 border-b border-gray-200">
                    📦 Seller fees — applied at payout
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {/* Standard Payout Fees */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white">
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#eaf3de] flex items-center justify-center text-sm flex-shrink-0">💰</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">Standard payout fees</div>
                                <div className="text-[11px] text-gray-400">All sellers</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Monthly active account fee</div>
                                <div className="text-[11px] text-gray-400">Only in months with a payout</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-700 text-right whitespace-nowrap">$2.00 / mo</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Payout transfer fee</div>
                                <div className="text-[11px] text-gray-400">linked bank account</div>
                            </div>
                            <div className="text-[13px] font-semibold text-gray-700 text-right whitespace-nowrap">0.25% + $0.25</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Intl payout surcharge</div>
                                <div className="text-[11px] text-gray-400">Seller bank outside the US</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#854f0b] text-right whitespace-nowrap">+0.25%</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Platform commission</div>
                                <div className="text-[11px] text-gray-400">{otherData?.brandName} fee on gross sale</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#2A7A2A] text-right whitespace-nowrap">10%</div>
                        </div>
                    </div>

                    {/* Dispute & Exception Fees */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-white">
                        <div className="flex items-center gap-2 mb-2.5">
                            <div className="w-[30px] h-[30px] rounded-full bg-[#fcebeb] flex items-center justify-center text-sm flex-shrink-0">⚖</div>
                            <div>
                                <div className="text-[13px] font-semibold text-gray-900">Dispute & exception fees</div>
                                <div className="text-[11px] text-gray-400">Applied when applicable</div>
                            </div>
                        </div>
                        <hr className="border-t border-gray-200 my-0 mb-2" />
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Chargeback / dispute fee</div>
                                <div className="text-[11px] text-gray-400">Stripe fee on lost disputes only</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#a32d2d] text-right whitespace-nowrap">$15.00</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Refund processing fee</div>
                                <div className="text-[11px] text-gray-400">Original 2.9% + $0.30 not returned</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#a32d2d] text-right whitespace-nowrap">Non-refundable</div>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1.5 border-t border-gray-200 first:border-t-0 first:pt-0">
                            <div className="flex-1">
                                <div className="text-[12.5px] text-gray-500">Wire return / recall fee</div>
                                <div className="text-[11px] text-gray-400">Returned international wire</div>
                            </div>
                            <div className="text-[13px] font-semibold text-[#a32d2d] text-right whitespace-nowrap">$15–$30</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary Table */}
            <div className="mb-7">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-3 pb-1.5 border-b border-gray-200">
                    Summary table — all payment methods
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-2.5">
                    <table className="w-full border-collapse text-[12.5px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Method</th>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Scenario</th>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Processing fee</th>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Surcharge / FX</th>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Typical total</th>
                                <th className="text-left p-3 text-[11px] font-semibold tracking-[0.05em] uppercase text-gray-500">Payer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Card</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">US buyer · US card</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">2.9% + $0.30</td>
                                <td className="p-3 text-center text-gray-400 border-t border-gray-200">—</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">2.9% + $0.30</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">Platform</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Card</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">Intl buyer · Foreign card · USD</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">2.9% + $0.30</td>
                                <td className="p-3 text-right text-[#854f0b] border-t border-gray-200">+1.5%</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#faeeda] text-[#633806]">4.4% + $0.30</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#faeeda] text-[#633806]">Buyer</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Card</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">Intl buyer · Foreign card · FX</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">2.9% + $0.30</td>
                                <td className="p-3 text-right text-[#185fa5] border-t border-gray-200">+1.5% + 1.0%</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#e6f1fb] text-[#0c447c]">5.4% + $0.30</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#e6f1fb] text-[#0c447c]">Buyer</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Wire</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">US domestic · ACH</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">$1.00 flat</td>
                                <td className="p-3 text-center text-gray-400 border-t border-gray-200">—</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">$1.00</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">Buyer</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Wire</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">US domestic · Bank wire</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">$8.00 flat</td>
                                <td className="p-3 text-center text-gray-400 border-t border-gray-200">—</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">$8.00</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eaf3de] text-[#27500a]">Buyer</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Wire</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">International · SWIFT</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">$20.00 flat</td>
                                <td className="p-3 text-right text-[#533ab7] border-t border-gray-200">+$10–25 + FX</td>
                                <td className="p-3 text-right border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eeedfe] text-[#3c3489]">$30–$45+</span></td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#eeedfe] text-[#3c3489]">Buyer</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Payout</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">Seller · All methods</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200">0.25% + $0.25</td>
                                <td className="p-3 text-right text-[#854f0b] border-t border-gray-200">+0.25% if intl</td>
                                <td className="p-3 text-right border-t border-gray-200">+ $2.00/mo</td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#faeeda] text-[#633806]">Seller</span></td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="p-3 text-gray-500 border-t border-gray-200"><strong>Commission</strong></td>
                                <td className="p-3 text-gray-500 border-t border-gray-200">Platform fee · All methods</td>
                                <td className="p-3 text-right font-medium text-gray-800 border-t border-gray-200" colSpan="2">10% of gross sale price</td>
                                <td className="p-3 text-right border-t border-gray-200">—</td>
                                <td className="p-3 border-t border-gray-200"><span className="inline-block text-[10px] px-2 py-[2px] rounded-full bg-[#faeeda] text-[#633806]">Seller</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Case Study Section */}
            <div className="mb-7">
                <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-gray-400 mb-3 pb-1.5 border-b border-gray-200">
                    Transaction example — $100 fashion lot
                </div>
                <div className="border border-[#b8ddb8] rounded-xl bg-[#f8fdf8] overflow-hidden">
                    <div className="bg-[#2A7A2A] text-white p-3">
                        <div className="text-[13px] font-semibold">Case Study</div>
                        <div className="text-[12px] opacity-80 mt-0.5">Buyer purchases a $100.00 fashion item — compare all payment scenarios</div>
                    </div>

                    <div className="flex bg-[#eaf3de] border-b border-[#b8ddb8]">
                        {['🇺🇸 US card', '🌍 Foreign card', '💱 Foreign card + FX', '🏛 US wire', '🌐 Intl wire'].map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`flex-1 py-2 px-1.5 text-[11px] font-medium text-[#27500a] text-center border-none bg-transparent font-sans border-b-2 transition-all ${activeTab === index
                                        ? 'bg-[#f8fdf8] border-b-2 border-[#2A7A2A] font-semibold'
                                        : 'border-b-2 border-transparent'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* US Card Panel */}
                    <div className={`${activeTab === 0 ? 'block' : 'hidden'}`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Gross sale price</div>
                                <div className="font-semibold text-[#2A7A2A]">$100.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Card processing (2.9% + $0.30)</div>
                                <div className="font-semibold text-[#a32d2d]">− $3.20</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Platform commission (10%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $10.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Payout fee (0.25% + $0.25)</div>
                                <div className="font-semibold text-[#a32d2d]">− $0.50</div>
                            </div>
                        </div>
                        <div className="bg-[#2A7A2A] p-3 flex justify-between items-center">
                            <div className="text-[14px] font-semibold text-white">Seller's final net payout</div>
                            <div className="font-serif text-[1.4rem] text-[#E8D800]">$86.30</div>
                        </div>
                    </div>

                    {/* Foreign Card Panel */}
                    <div className={`${activeTab === 1 ? 'block' : 'hidden'}`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Gross sale price</div>
                                <div className="font-semibold text-[#2A7A2A]">$100.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Card processing (2.9% + $0.30)</div>
                                <div className="font-semibold text-[#a32d2d]">− $3.20</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Intl card surcharge (1.5%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $1.50</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Platform commission (10%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $10.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Payout fee (0.25% + $0.25)</div>
                                <div className="font-semibold text-[#a32d2d]">− $0.50</div>
                            </div>
                        </div>
                        <div className="bg-[#2A7A2A] p-3 flex justify-between items-center">
                            <div className="text-[14px] font-semibold text-white">Seller's final net payout</div>
                            <div className="font-serif text-[1.4rem] text-[#E8D800]">$84.80</div>
                        </div>
                    </div>

                    {/* Foreign Card + FX Panel */}
                    <div className={`${activeTab === 2 ? 'block' : 'hidden'}`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Gross sale price</div>
                                <div className="font-semibold text-[#2A7A2A]">$100.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Card processing (2.9% + $0.30)</div>
                                <div className="font-semibold text-[#a32d2d]">− $3.20</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Intl card surcharge (1.5%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $1.50</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Currency conversion (1.0%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $1.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Platform commission (10%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $10.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Payout fee (0.25% + $0.25)</div>
                                <div className="font-semibold text-[#a32d2d]">− $0.50</div>
                            </div>
                        </div>
                        <div className="bg-[#2A7A2A] p-3 flex justify-between items-center">
                            <div className="text-[14px] font-semibold text-white">Seller's final net payout</div>
                            <div className="font-serif text-[1.4rem] text-[#E8D800]">$83.80</div>
                        </div>
                    </div>

                    {/* US Wire Panel */}
                    <div className={`${activeTab === 3 ? 'block' : 'hidden'}`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Gross sale price</div>
                                <div className="font-semibold text-[#2A7A2A]">$100.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Domestic wire fee (ACH)</div>
                                <div className="font-semibold text-[#a32d2d]">− $1.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Platform commission (10%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $10.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Payout fee (0.25% + $0.25)</div>
                                <div className="font-semibold text-[#a32d2d]">− $0.50</div>
                            </div>
                        </div>
                        <div className="bg-[#2A7A2A] p-3 flex justify-between items-center">
                            <div className="text-[14px] font-semibold text-white">Seller's final net payout</div>
                            <div className="font-serif text-[1.4rem] text-[#E8D800]">$88.50</div>
                        </div>
                    </div>

                    {/* Intl Wire Panel */}
                    <div className={`${activeTab === 4 ? 'block' : 'hidden'}`}>
                        <div className="px-5">
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Gross sale price</div>
                                <div className="font-semibold text-[#2A7A2A]">$100.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Intl wire fee (SWIFT)</div>
                                <div className="font-semibold text-[#a32d2d]">− $20.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Intermediary bank fee (est.)</div>
                                <div className="font-semibold text-[#a32d2d]">− $15.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Currency conversion + FX spread (~2%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $2.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Platform commission (10%)</div>
                                <div className="font-semibold text-[#a32d2d]">− $10.00</div>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#d4edcc] text-[13px]">
                                <div className="text-[#27500a]">Payout fee (0.25% + $0.25)</div>
                                <div className="font-semibold text-[#a32d2d]">− $0.50</div>
                            </div>
                        </div>
                        <div className="bg-[#2A7A2A] p-3 flex justify-between items-center">
                            <div className="text-[14px] font-semibold text-white">Seller's final net payout</div>
                            <div className="font-serif text-[1.4rem] text-[#E8D800]">$52.50</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notice Boxes */}
            <div className="flex flex-col gap-2.5">
                <div className="border border-[#f7c1c1] rounded-md bg-[#fcebeb] p-3 flex gap-2.5 items-start">
                    <div className="text-[15px] flex-shrink-0">⚠</div>
                    <div className="text-[12px] leading-relaxed text-[#791f1f]">
                        <strong>Wire transfer note:</strong> International wire fees are estimates — intermediary bank fees vary by country and correspondent bank. Buyers should confirm exact wire fees with their bank before sending payment.
                    </div>
                </div>
                <div className="border border-[#f7c1c1] rounded-md bg-[#fcebeb] p-3 flex gap-2.5 items-start">
                    <div className="text-[15px] flex-shrink-0">⚠</div>
                    <div className="text-[12px] leading-relaxed text-[#791f1f]">
                        <strong>Refund policy:</strong> Stripe does not refund the original card processing fee (2.9% + $0.30) on refunds. Wire transfers once received are also non-refundable without a formal recall process.
                    </div>
                </div>
                <div className="border border-[#b8ddb8] rounded-md bg-[#f3faf3] p-3 flex gap-2.5 items-start">
                    <div className="text-[15px] flex-shrink-0">💡</div>
                    <div className="text-[12px] leading-relaxed text-[#27500a]">
                        <strong>Platform tip:</strong> For high-value international lots, wire transfer (despite the fixed fee) is often more cost-effective than card payment — e.g. on a $5,000 lot, 5.4% card fees = $270 vs. ~$45 wire fees.
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default EscrowCategories;