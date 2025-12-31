
import React from 'react';

interface PrivacyPolicyProps {
    onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 animate-fade-in">
            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-100">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-stone-900 outfit">Privacy Policy</h1>
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

                <div className="space-y-6 text-stone-600 leading-relaxed">
                    <p>
                        We collect your <strong>name</strong>, <strong>phone number</strong>, <strong>email</strong>, and your <strong>resolution</strong> to generate your personalized poster and certificate.
                    </p>

                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                        <p className="font-medium text-red-800 mb-2">Want to remove your data?</p>
                        <p className="text-red-700 text-sm">
                            If you wanted to be removed, please return back to us on the number below so that we can remove the data.
                        </p>
                        <a href="tel:+919940142349" className="inline-block mt-4 text-lg font-bold text-red-600 hover:underline">
                            +91 99401 42349
                        </a>
                    </div>
                </div>

                <div className="mt-10 pt-8 border-t border-stone-100 text-center">
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
