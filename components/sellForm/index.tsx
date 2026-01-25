"use client";
import { ProductCategories, sellProductSteps } from '@/utils/data';
import { ProductCategory, ProductSubCategory } from '@/utils/enum';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react'
import "./style.css";
import { useFormik } from 'formik';
import { categorySchema } from '@/utils/schema';
import SelectField from '../common/dropdown/FormikSelect';

const SellForm = () => {
    const [step, setStep] = useState(0);
    const categoryForm = useFormik({
        initialValues: { category: "", subCategory: "" },
        validationSchema: categorySchema,
        validateOnBlur: true,
        onSubmit: (value, action) => {
            console.log("value :", value);
            setStep(1);
        }
    })
    const [subCatOpt, setSubCatOpt] = useState<{ label: string, value: ProductSubCategory }[]>([]);

    function subCategoryHandler(selectedCategory: ProductCategory) {
        const subCatOption = ProductCategories.find((prod) => prod.value === selectedCategory);
        if (subCatOption && subCatOption?.options)
            setSubCatOpt(subCatOption?.options);
    }

    function saveHandler() {
        if (step === 0) categoryForm.handleSubmit();
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
            <form className='form-container' onSubmit={categoryForm.handleSubmit}>
                <div className='flex justify-end'>
                    <Button type='submit' sx={{ borderRadius: 2 }} disableElevation variant='contained'>Continue</Button>
                </div>
                {
                    step === 0 &&
                    (<Box sx={{ display: "flex", flexDirection: "column", gap: 5, px: "30%" }}>
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
            </form>


        </section >
    )
}

export default SellForm;