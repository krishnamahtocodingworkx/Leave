// "use client";
// import React from 'react'
// import Image from 'next/image';
// import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

// const options = [
//     'stove',
//     'utensils',
//     'Cooker',
//     'Microwave',
//     'Refrigerator',
//     'Dishwasher',
//     'Toaster',
// ];

// const CategoryCard = ({ index }: { index: number }) => {

//     return <div key={index} className="category-card">
//         <Image
//             src="/images/cleaning.png"
//             className="category-image"
//             height={50}
//             width={50}
//             alt="category"
//         />

//         <span className="font-semibold text-base category-title">
//             Cleaning
//             <ExpandMoreRoundedIcon className="category-expand-icon" />
//         </span>

//         <span className='category-options-container'>
//             {
//                 options.map((option, idx) => (
//                     <span key={idx} className="category-option text-sm">
//                         {option}
//                     </span>
//                 ))
//             }
//         </span>
//     </div>
// }

// const Categories = () => {

//     return (
//         <section className="categories-section">
//             {
//                 new Array(10).fill(null).map((_, index) => (
//                     <CategoryCard key={index} index={index} />
//                 ))
//             }
//         </section>

//     )
// }

// export default Categories;

"use client";
import React from "react";
import Image from "next/image";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { ProductCategories } from "@/utils/data";
import { ProductCategoryType } from "@/utils/type";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }: { category: ProductCategoryType }) => {
    const router = useRouter();
    return (
        <div className="category-card" onClick={() => router.push(category.value)} >
            <Image
                src={category.imgUrl}
                className="category-image"
                height={64}
                width={64}
                alt={category.label}
            />

            <div className="category-title-row">
                <span className="category-title">{category.label}</span>
                <ExpandMoreRoundedIcon className="category-expand-icon" />
            </div>

            <div className="category-options-container">
                {category.options.map((option, idx) => (
                    <Link key={idx} className="category-option" href={`/${category.value}/${option.value}`} onClick={(e) => e.stopPropagation()}>
                        {option.label}
                    </Link>
                ))}
            </div>
        </div >
    );
};

const Categories = () => {
    return (
        <section className="categories-section">
            {
                ProductCategories.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                )
                )
            }
        </section>
    );
};

export default Categories;
