"use client";
import React from "react";
import Image from "next/image";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { ProductCategories } from "@/utils/data";
import { ProductCategoryType } from "@/utils/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./style.css";

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
                <div className="category-expand-icon"><ExpandMoreRoundedIcon /></div>
            </div>

            <div className="category-options-container" onClick={(e) => e.stopPropagation()}>
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
