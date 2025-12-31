
import React, { useState, useRef, useEffect } from 'react';
import { countries, Country } from '../utils/countries';

interface CountryCodeSelectProps {
    selectedCode: string;
    onSelect: (code: string) => void;
}

const CountryCodeSelect: React.FC<CountryCodeSelectProps> = ({ selectedCode, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Find the selected country object
    const selectedCountry = countries.find(c => c.dial_code === selectedCode) || countries[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearch(''); // Reset search on close
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        country.dial_code.includes(search) ||
        country.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 h-full px-3 bg-stone-100 border-r border-stone-200 rounded-l-xl hover:bg-stone-200 transition-colors outline-none focus:bg-stone-200"
            >
                <span className="text-xl leading-none">{selectedCountry.flag}</span>
                <span className="text-xs font-bold text-stone-600">{selectedCountry.dial_code}</span>
                <svg className={`w-3 h-3 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-stone-100 z-50 overflow-hidden max-h-80 flex flex-col">
                    {/* Search Input */}
                    <div className="p-2 border-b border-stone-100 sticky top-0 bg-white">
                        <input
                            type="text"
                            placeholder="Search country..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                            className="w-full px-3 py-2 bg-stone-50 rounded-lg text-xs font-bold text-stone-700 outline-none focus:ring-1 focus:ring-red-500"
                        />
                    </div>

                    {/* List */}
                    <div className="overflow-y-auto flex-1 p-1 scrollbar-thin scrollbar-thumb-stone-200">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                        onSelect(country.dial_code);
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-stone-50 transition-colors text-left group ${selectedCode === country.dial_code ? 'bg-red-50' : ''}`}
                                >
                                    <span className="text-xl leading-none">{country.flag}</span>
                                    <div className="flex-1">
                                        <div className={`text-xs font-bold ${selectedCode === country.dial_code ? 'text-red-700' : 'text-stone-700'}`}>
                                            {country.name}
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-mono font-bold ${selectedCode === country.dial_code ? 'text-red-500' : 'text-stone-400'}`}>
                                        {country.dial_code}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-xs text-stone-400">No country found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CountryCodeSelect;
