
import React from 'react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="max-w-3xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100 max-h-[90vh] overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-center mb-10 border-b border-stone-100 pb-6">
                    <div>
                        <h1 className="text-3xl font-black text-stone-900 outfit mb-2">Privacy Policy</h1>
                        <p className="text-stone-400 text-sm font-medium">Last Updated: December 31, 2025</p>
                    </div>
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-8 text-stone-600 leading-relaxed text-sm sm:text-base">

                    <section>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 outfit">1. Introduction</h3>
                        <p>
                            At <strong>2026 Resolution</strong> ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us when participating in our resolution pledge initiative.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 outfit">2. Information We Collect</h3>
                        <p className="mb-2">We collect the minimum amount of information necessary to create your personalized experience. This includes:</p>
                        <ul className="list-disc pl-5 space-y-1 marker:text-red-500">
                            <li><strong>Full Name:</strong> To personalize your resolution poster and certificate.</li>
                            <li><strong>Contact Information:</strong> Phone number and email address to facilitate communication.</li>
                            <li><strong>Resolution Statement:</strong> The specific goal or pledge you wish to commit to for 2026.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 outfit">3. Purpose of Collection</h3>
                        <p>
                            The primary purpose of collecting this data is to:
                        </p>
                        <ul className="list-disc pl-5 space-y-1 mt-2 marker:text-red-500">
                            <li>Generate a custom, downloadable resolution poster.</li>
                            <li>Support you in your journey by acknowledging your commitment.</li>
                            <li>Occasionally send updates or resources relevant to achieving your resolution goals.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 outfit">4. Data Rights & Removal</h3>
                        <p>
                            You maintain full control over your personal information. If at any time you wish to have your data permanently removed from our records, please contact us directly. We will promptly process your deletion request.
                        </p>

                        <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mt-4">
                            <p className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wide">Contact for Data Removal</p>
                            <p className="text-stone-500 mb-3">
                                Reach out to us via phone or WhatsApp, and we will assist you immediately.
                            </p>
                            <a href="https://wa.me/919940142349" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-bold text-stone-900 hover:text-red-600 transition-colors">
                                <span>+91 99401 42349</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        </div>
                    </section>

                </div>

                <div className="mt-12 pt-8 border-t border-stone-100 text-center">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors shadow-lg shadow-stone-200"
                    >
                        Acknowledge & Return
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
