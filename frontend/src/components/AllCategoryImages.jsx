import { Link } from "react-router-dom";
import { Skania } from "../assets";
import { CategoryImg } from "./";
import { ArrowUp, X } from "lucide-react";

const categoryImg = [
    {
        title: 'Aircrafts',
        image: Skania,
        link: '/category/aircraft'
    },
    {
        title: 'Parts & Engines',
        image: Skania,
        link: '/category/parts'
    },
    {
        title: 'Memorabilia',
        image: Skania,
        link: '/category/memorabilia'
    }
];

function AllCategoryImages() {
    return (
        <section className="bg-bg-secondary dark:bg-bg-primary lg:px-10 lg:py-16 w-full relative">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-text-primary-dark mb-5">Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {
                    categoryImg.map(category => (
                        <CategoryImg key={category.title} title={category.title} image={category.image} link={category.link} />
                    ))
                }
                <Link to={'/auctions'} className="group hover:scale-[101%] transition-all duration-200 relative h-44 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                    <p className="absolute bottom-5 left-5 text-text-primary dark:text-text-primary-dark">Explore All Auctions</p>
                    <ArrowUp className="absolute group-hover:top-4 group-hover:right-4 transition-all duration-200 top-5 right-5 text-text-primary dark:text-text-primary-dark rotate-45" strokeWidth={1.5} size={30} />
                </Link>
            </div>

            <X className="text-text-primary dark:text-text-primary-dark absolute right-5 top-5" size={30} />
        </section>
    );
}

export default AllCategoryImages;