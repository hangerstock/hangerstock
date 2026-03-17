import React, { useState } from "react";

const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "zh-CN", name: "Chinese", flag: "🇨🇳" },
    { code: "ko", name: "Korean", flag: "🇰🇷" },
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
    { code: "bn", name: "Bangla", flag: "🇧🇩" }
];

export default function LanguageSwitcher() {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(languages[0]);

    function changeLanguage(lang) {
    const select = document.querySelector(".goog-te-combo");

    if (!select) return;

    // If user selects English → reset translation
    if (lang.code === "en") {

        document.cookie = "googtrans=/en/en;path=/";

        window.location.reload();

        return;
    }

    select.value = lang.code;
    select.dispatchEvent(new Event("change"));

    setCurrent(lang);
    setOpen(false);
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