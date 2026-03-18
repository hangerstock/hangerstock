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

            const domain = window.location.hostname;
            const isLocalhost = domain === "localhost" || domain === "127.0.0.1";

            // Clear every possible variation of the cookie
            const cookiesToClear = [
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`,
                `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`,
            ];

            // On production also try secure flag
            if (!isLocalhost) {
                cookiesToClear.push(
                    `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}; secure`,
                    `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}; secure`
                );
            }

            cookiesToClear.forEach(cookie => document.cookie = cookie);

            // Verify cookies are actually cleared before reloading
            const cookieStillExists = document.cookie.includes("googtrans");
            if (cookieStillExists) {
                console.warn("Cookie not cleared, forcing harder reset");
            }

            // Force reload bypassing cache
            setTimeout(() => {
                window.location.href = window.location.href.split("?")[0] +
                    "?reset=" + Date.now();
            }, 100);

            return;
        }

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