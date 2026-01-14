"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { ProductCategories } from "@/utils/data";
import { ProductCategoryType } from "@/utils/type";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoryCard = ({ category }: { category: ProductCategoryType }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<'center' | 'left' | 'right'>('center');
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            // Check if dropdown would overflow on right
            if (rect.left + 180 > viewportWidth - 16) {
                setDropdownPosition('right');
            }
            // Check if dropdown would overflow on left
            else if (rect.left - 180 < 16) {
                setDropdownPosition('left');
            } else {
                setDropdownPosition('center');
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsHovered(!isHovered);
    };

    return (
        <div
            className="category-card"
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Image
                src={category.imgUrl}
                className="category-image"
                height={64}
                width={64}
                alt={category.label}
            />

            <div className="category-title-row">
                <span className="category-title">{category.label}</span>
                <ExpandMoreRoundedIcon
                    className={`category-expand-icon ${isHovered ? 'expanded' : ''}`}
                />
            </div>

            <div
                className={`category-options-container ${dropdownPosition} ${isHovered ? 'visible' : ''}`}
            >
                {category.options.map((option, idx) => (
                    <Link
                        key={idx}
                        className="category-option"
                        href={`/${category.value}/${option.value}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsHovered(false);
                        }}
                    >
                        {option.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Categories = () => {
    return (
        <section className="categories-section">
            {ProductCategories.map((category, index) => (
                <CategoryCard key={index} category={category} />
            ))}
        </section>
    );
};

export default Categories;