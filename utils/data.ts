import { ProductCategory, ProductCondition, ProductSubCategory } from "./enum";
import { IMAGES } from "./images";
import { ProductCategoryType } from "./type";

export const ProductCategories: ProductCategoryType[] = [
    {
        label: "Furniture",
        value: ProductCategory.FURNITURE,
        imgUrl: IMAGES.furniture,
        options: [
            { label: "Bed", value: ProductSubCategory.BED },
            { label: "Mattress", value: ProductSubCategory.MATTRESS },
            { label: "Table", value: ProductSubCategory.TABLE },
            { label: "Chair", value: ProductSubCategory.CHAIR },
            { label: "Wardrobe", value: ProductSubCategory.WARDROBE },
        ]
    },
    {
        label: "Kitchen", value: ProductCategory.KITCHEN,
        imgUrl: IMAGES.kitchen,
        options: [
            { label: "Stove", value: ProductSubCategory.STOVE },
            { label: "Utensils", value: ProductSubCategory.UTENSILS },
            { label: "Cooker", value: ProductSubCategory.COOKER },
        ]
    },
    {
        label: "Electronics", value: ProductCategory.ELECTRONICS,
        imgUrl: IMAGES.electronics,
        options: [
            { label: "Fridge", value: ProductSubCategory.FRIDGE },
            { label: "Washing Machine", value: ProductSubCategory.WASHING_MACHINE },
            { label: "Microwave", value: ProductSubCategory.MICROWAVE },
            { label: "Iron", value: ProductSubCategory.IRON },
        ]
    },
    // {
    //     label: "Room Essentials", value: ProductCategory.ROOM_ESSENTIALS,
    //     imgUrl: IMAGES.lifestyle,
    //     options: [
    //         { label: "Laptop Table", value: ProductSubCategory.LAPTOP_TABLE },
    //         { label: "Extension Board", value: ProductSubCategory.EXTENSION_BOARD },
    //         { label: "Lamp", value: ProductSubCategory.LAMP },
    //     ]
    // },
    {
        label: "Cleaning", value: ProductCategory.CLEANING,
        imgUrl: IMAGES.cleaning,
        options: [
            { label: "Geyser", value: ProductSubCategory.GEYSER },
            { label: "Mirror", value: ProductSubCategory.MIRROR },
        ]
    },
    {
        label: "Stationary", value: ProductCategory.STUDY_WORK,
        imgUrl: IMAGES.study,
        options: [
            { label: "Bean Bag", value: ProductSubCategory.BEAN_BAG },
            { label: "Speaker", value: ProductSubCategory.SPEAKER },
        ]
    },
    {
        label: "Bathroom", value: ProductCategory.BATHROOM,
        imgUrl: IMAGES.bathroom,
        options: [
            { label: "Mirror", value: ProductSubCategory.MIRROR },
        ]
    },
    {
        label: "Daily Use", value: ProductCategory.DAILY_USE,
        imgUrl: IMAGES.dailyUse,
        options: [
            { label: "Utensils", value: ProductSubCategory.UTENSILS },
        ]
    },
    {
        label: "Lifestyle", value: ProductCategory.LIFESTYLE,
        imgUrl: IMAGES.lifestyle,
        options: [
            { label: "Speaker", value: ProductSubCategory.SPEAKER },
        ]
    },
]

export const sellProductSteps = [
    "Category",
    "About",
    "Media",
    "Confirmation"
]

export const ProductConditionOptions = [
    { label: "New", value: ProductCondition.NEW },
    { label: "Like New", value: ProductCondition.LIKE_NEW },
    { label: "Used", value: ProductCondition.USED },
    { label: "Heavily Used", value: ProductCondition.HEAVILY_USED },
]