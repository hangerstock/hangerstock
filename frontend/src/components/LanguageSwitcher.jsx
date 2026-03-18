import React, { useState } from "react";

const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "bn", name: "Bangla", flag: "🇧🇩" }
];

export default function LanguageSwitcher() {
    const [open, setOpen] = useState(false);

    // In LanguageSwitcher.jsx, initialize current state from cookie
    const getInitialLanguage = () => {
        // Check if we're resetting to English
        if (window.location.search.includes('reset')) {
            return languages[0];
        }

        // Try to get current language from cookie
        const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
        if (match) {
            const code = match[1];
            return languages.find(l => l.code === code) || languages[0];
        }
        return languages[0];
    };

    // Then use it:
    const [current, setCurrent] = useState(getInitialLanguage);

    // function changeLanguage(lang) {
    //     const select = document.querySelector(".goog-te-combo");

    //     if (!select) return;

    //     // If user selects English → reset translation
    //     if (lang.code === "en") {

    //         document.cookie = "googtrans=/en/en;path=/";

    //         window.location.reload();

    //         return;
    //     }

    //     select.value = lang.code;
    //     select.dispatchEvent(new Event("change"));

    //     setCurrent(lang);
    //     setOpen(false);
    // }

    function changeLanguage(lang) {
        if (lang.code === "en") {
            setCurrent(lang);
            setOpen(false);

            // Method 1: Try to reset Google Translate properly
            const select = document.querySelector(".goog-te-combo");
            if (select) {
                select.value = "";
                select.dispatchEvent(new Event("change", { bubbles: true }));

                // Give Google Translate time to process
                setTimeout(() => {
                    // Then reload without any translation cookies
                    window.location.href = window.location.pathname + "?reset=" + Date.now();
                }, 100);
                return;
            }

            // Method 2: If select not found, reload with cache busting
            window.location.href = window.location.pathname + "?reset=" + Date.now();
            return;
        }

        // For non-English languages
        const attemptChange = (retries = 5) => {
            const select = document.querySelector(".goog-te-combo");

            if (!select) {
                if (retries > 0) setTimeout(() => attemptChange(retries - 1), 300);
                return;
            }

            select.value = lang.code;
            select.dispatchEvent(new Event("change", { bubbles: true }));
            select.dispatchEvent(new Event("input", { bubbles: true }));
        };

        setCurrent(lang);
        setOpen(false);
        attemptChange();
    }

    return (
        <div className="lang-container relative">
            <button
                className="lang-button flex items-center gap-1 px-2 py-1 md:py-1.5 md:px-3 border rounded-md hover:bg-gray-50"
                onClick={() => setOpen(!open)}
            >
                <span className="text-lg">{current.flag}</span>
                <span className="hidden sm:inline">{current.name}</span>
                <span className="text-xs">▾</span>
            </button>

            {open && (
                <div className="lang-dropdown absolute top-full right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
                    {languages.map((lang) => (
                        <div
                            key={lang.code}
                            className="lang-option flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                            onClick={() => changeLanguage(lang)}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span>{lang.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}