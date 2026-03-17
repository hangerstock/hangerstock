import { Outlet } from "react-router-dom";
import { Footer, Header, MobileNav, ScrollToTop, ScrollToTopIcon, SearchFormPopUp } from "./components";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import { usePopUp } from "./contexts/PopUpContextProvider";

const CategoryImagesSection = lazy(() => import('./components/CategoryImagesSection'));

function App() {
    const { isPopupOpen, closePopup } = usePopUp();
    const isSearchFormPopUpOpen = isPopupOpen('searchForm');
    const isCategoryImagesSectionOpen = isPopupOpen('category');
    useEffect(() => {
        const removeGoogleBar = () => {
            // Only hide the iframe banner, don't touch skiptranslate
            document.querySelectorAll(".goog-te-banner-frame").forEach(el => {
                el.style.display = "none";
            });

            // Fix body position shift
            document.body.style.top = "0px";
            document.documentElement.style.removeProperty("top");
        };

        removeGoogleBar();
        const interval = setInterval(removeGoogleBar, 500);

        const observer = new MutationObserver(removeGoogleBar);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []);
    return (
        <main className="bg-gray-50">
            <Header />
            <Outlet />
            <Footer />
            <MobileNav />
            <Toaster />
            <ScrollToTop />
            <ScrollToTopIcon />
            {isSearchFormPopUpOpen && <SearchFormPopUp closePopup={closePopup} />}
            {isCategoryImagesSectionOpen && <Suspense><CategoryImagesSection closePopup={closePopup} /></Suspense>}
        </main>
    );
}

export default App;