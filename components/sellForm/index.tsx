"use client";
import { ProductCategories, ProductConditionOptions, sellProductSteps } from '@/utils/data';
import { ProductCategory, ProductSubCategory } from '@/utils/enum';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react'
import "./style.css";
import { useFormik } from 'formik';
import { aboutItemSchema, categorySchema } from '@/utils/schema';
import SelectField from '../common/dropdown/FormikSelect';
import Input from '../input';
import TextArea from '../input/TextArea';
import MediaDropzone from '../input/MediaDropzone';
import { SHOW_ERROR_TOAST } from '@/utils/toasts';
import VerifyDetails from './VerifyDetails';
import Address from './Address';



const SellForm = () => {
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [step, setStep] = useState(3);
    const categoryForm = useFormik({
        initialValues: { category: "", subCategory: "" },
        validationSchema: categorySchema,
        validateOnBlur: true,
        onSubmit: (value, action) => {
            console.log("value :", value);
            setStep(1);
        }
    })
    const aboutForm = useFormik({
        initialValues: {
            itemName: "",
            about: "",
            reasonToSell: "",
            price: "",
            condition: ""
        },
        validationSchema: aboutItemSchema,
        onSubmit: (value, action) => {
            console.log("values :", value)
            setStep(2);
        }
    })
    const [subCatOpt, setSubCatOpt] = useState<{ label: string, value: ProductSubCategory }[]>([]);

    function subCategoryHandler(selectedCategory: ProductCategory) {
        const subCatOption = ProductCategories.find((prod) => prod.value === selectedCategory);
        if (subCatOption && subCatOption?.options)
            setSubCatOpt(subCatOption?.options);
    }

    function buildFormData() {
        const formData = new FormData();

        // category
        formData.append("category", categoryForm.values.category);
        formData.append("subCategory", categoryForm.values.subCategory);

        // about item
        Object.entries(aboutForm.values).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // media
        mediaFiles.forEach((file) => {
            formData.append("media", file);
        });

        return formData;
    }


    function saveHandler() {
        switch (step) {
            case 0:
                categoryForm.handleSubmit();
                break;
            case 1:
                aboutForm.handleSubmit();
                break;
            case 2:
                if (mediaFiles.length === 0) {
                    SHOW_ERROR_TOAST("Please upload at least one media file.");
                    return;
                } else {
                    setStep(3);
                }
                break;
            case 3:
                setStep(4);
                break;
            case 4:
                const formData = buildFormData();

                // DEBUG (optional)
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                // 👉 API CALL HERE
                // await fetch("/api/sell", { method: "POST", body: formData })
                break;
            default:
                break;
        }

    }

    return (
        <section>
            <Box width={1} className="">
                <Stepper alternativeLabel activeStep={step}>
                    {
                        sellProductSteps.map((stepLabel) => {
                            return (<Step key={stepLabel} >
                                <StepLabel>{stepLabel}</StepLabel>
                            </Step>)
                        })
                    }
                </Stepper>
            </Box>
            <div className='form-container ' >
                <div className=' flex-1  flex flex-col gap-4 '>
                    <Button onClick={saveHandler} sx={{ borderRadius: 2, px: 2, py: 1, width: "100%" }} disableElevation variant='contained'>{step === 4 ? "Save" : "Continue"}</Button>
                    {
                        step > 0 && <Button onClick={() => setStep(prev => prev - 1)} sx={{ borderRadius: 2, px: 2, py: 1, width: "100%" }} disableElevation variant='outlined'>Back</Button>
                    }
                </div>
                <div className='flex-3  md:px-[20%]'>
                    {
                        step === 0 &&
                        (<Box sx={{
                            display: "flex", flexDirection: "column", gap: {
                                xs: 2,
                                md: 5
                            },
                        }}>
                            <SelectField
                                name="category"
                                label="Select Item Category"
                                value={categoryForm.values.category}
                                options={ProductCategories}
                                onChange={(value) => {
                                    categoryForm.setFieldValue("category", value);
                                    subCategoryHandler(value as ProductCategory);
                                }}
                                onBlur={() => categoryForm.setFieldTouched("category", true)}
                                error={Boolean(
                                    categoryForm.touched.category && categoryForm.errors.category
                                )}
                                helperText={categoryForm.errors.category}
                            />

                            <SelectField
                                name="subCategory"
                                label="Select Item Sub Category"
                                value={categoryForm.values.subCategory}
                                options={subCatOpt}
                                disabled={subCatOpt.length === 0}
                                onChange={(value) => {
                                    categoryForm.setFieldValue("subCategory", value);
                                }}
                                onBlur={() => categoryForm.setFieldTouched("subCategory", true)}
                                error={Boolean(
                                    categoryForm.touched.subCategory && categoryForm.errors.subCategory
                                )}
                                helperText={categoryForm.errors.subCategory}
                            />
                        </Box>)
                    }
                    {
                        step === 1 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, }}>
                                <Input
                                    name='itemName'
                                    error={aboutForm.errors.itemName}
                                    value={aboutForm.values.itemName}
                                    changeHandler={aboutForm.handleChange}
                                    onBlur={aboutForm.handleBlur}
                                    label='Enter Item name'
                                    required
                                    type='text'
                                    disabled={aboutForm.isSubmitting}
                                    touched={aboutForm.touched.itemName}
                                />
                                <TextArea
                                    name='about'
                                    error={aboutForm.errors.about}
                                    value={aboutForm.values.about}
                                    changeHandler={aboutForm.handleChange}
                                    onBlur={aboutForm.handleBlur}
                                    label='Enter about Item'
                                    required
                                    placeHolder='Describe your item in detail...'
                                    disabled={aboutForm.isSubmitting}
                                    touched={aboutForm.touched.about}
                                />
                                <TextArea
                                    name='reasonToSell'
                                    error={aboutForm.errors.reasonToSell}
                                    value={aboutForm.values.reasonToSell}
                                    changeHandler={aboutForm.handleChange}
                                    onBlur={aboutForm.handleBlur}
                                    label='Reason to Sell'
                                    required
                                    placeHolder='Why are you selling this item...?'
                                    disabled={aboutForm.isSubmitting}
                                    touched={aboutForm.touched.reasonToSell}
                                />
                                <Input
                                    name='price'
                                    error={aboutForm.errors.price}
                                    value={aboutForm.values.price}
                                    changeHandler={aboutForm.handleChange}
                                    onBlur={aboutForm.handleBlur}
                                    label='Enter Price'
                                    required
                                    type='number'
                                    disabled={aboutForm.isSubmitting}
                                    touched={aboutForm.touched.price}
                                />
                                <SelectField
                                    name="condition"
                                    label="Select Item Condition"
                                    value={aboutForm.values.condition}
                                    options={ProductConditionOptions}
                                    onChange={(value) => {
                                        aboutForm.setFieldValue("condition", value);
                                    }}
                                    onBlur={() => aboutForm.setFieldTouched("condition", true)}
                                    error={Boolean(
                                        aboutForm.touched.condition && aboutForm.errors.condition
                                    )}
                                    helperText={aboutForm.errors.condition}
                                    required
                                />
                            </Box>)
                    }
                    {
                        step === 2 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <h1 className="text-lg font-semibold">Upload Images / Videos</h1>

                                <MediaDropzone
                                    onChange={(files) => setMediaFiles(files)}
                                />
                            </Box>
                        )
                    }
                    {
                        step === 3 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <h1 className="text-lg font-semibold">Address</h1>

                                <Address />
                            </Box>
                        )
                    }
                    {
                        step === 4 && (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                <VerifyDetails
                                    categoryData={categoryForm.values}
                                    aboutData={aboutForm.values}
                                    mediaFiles={mediaFiles}
                                />
                            </Box>
                        )
                    }

                </div>
            </div>


        </section >
    )
}

export default SellForm;