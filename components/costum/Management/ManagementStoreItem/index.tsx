import React, {useCallback, useEffect, useMemo, useState} from 'react';
import RotatedButton from "../../../common/RotatedButton";
import {Colors} from "../../../../utilities/constants/colors";
import IProduct from "../../../../interfaces/product";
import _3DigitSeparator from "../../../../utilities/functions/_3DigitSeparator";
import ItemRow from "../../ItemRow";
import classNames from "classnames";
import Input from "../../../common/Input";
import * as Yup from "yup";
import {useFormik} from "formik";
import parse3DigitNumber from "../../../../utilities/functions/parse3DigitNumber";
import {editProductQuantityAndPrice} from "../../../../utilities/functions/ApiCall/products";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";
import parse3digitNumber from "../../../../utilities/functions/parse3DigitNumber";

interface formValues {
    remaining: number,
    price: string,
    final_price: string
}

const SignInSchema = Yup.object().shape({
    remaining: Yup.number()
        .min(0)
        .required(),
    price: Yup.string()
        .matches(/^[0-9\,]+$/, 'mmmmmmmmmm')
        .min(0)
        .required(),
    final_price: Yup.string()
        .matches(/^[0-9\,]+$/)
        .min(0)
        .required()
});

type props = {
    product: IProduct,
    handleSubmit: Function,
    forceSubmit: boolean
}

const ManagementProductItem = ({product, handleSubmit, forceSubmit}: props) => {
    const [cookies] = useCookies(['token']);
    const [hover, setHover] = useState<boolean>(false)

    const className = useMemo(() => {
        return classNames(
            'h-full text-center text-weef-white flex items-center transition-all duration-300 flex items-center justify-center gap-1 px-3 last:pl-12 overflow-hidden',
            hover ? 'even:bg-secondary' : 'even:bg-weef-secondary-light'
        )
    }, [hover])

    const formik = useFormik({
        initialValues: {
            remaining: product.remaining,
            price: _3DigitSeparator(product.price),
            final_price: _3DigitSeparator(product.final_price)
        } as formValues,
        validationSchema: SignInSchema,
        onSubmit: (values,{setSubmitting}) => {
            let temp: any = {};
            if (parse3DigitNumber('' + values.price) !== parse3digitNumber(product.price))
                temp.price = parse3digitNumber('' + values.price)
            if (parse3DigitNumber('' + values.final_price) !== parse3digitNumber(product.final_price))
                temp.final_price = parse3digitNumber('' + values.final_price)
            if (values.remaining !== product.remaining)
                temp.remaining = Number(values.remaining)

            if (Object.keys(temp).length !== 0) {
                editProductQuantityAndPrice(cookies.token, temp, product.id)
                    .then(([status,]) => {
                        if (status) {
                            toast.success("تغییر اطلاعات محصول انجام شد")
                            handleSubmit({
                                ...temp,
                                id: product.id
                            })
                        } else
                            toast.error("تغییر اطلاعات محصول انجام نشد")
                        setSubmitting(false)
                    })
            }
        },
    });

    const handleChange = useCallback((field: string, value: string) => {
        const formatted = 0
        formik.setFieldValue(field, _3DigitSeparator('' + parse3DigitNumber(value)), true)
    }, [formik])

    useEffect(() => {
        formik.handleSubmit()
    }, [forceSubmit])

    return (
        <ItemRow heightOnPx={72} backgroundContent={Colors._secondary} backgroundContentOnHover={Colors._black}
                 toggleHover={setHover}>
            <form onSubmit={formik.handleSubmit} className='w-full h-full flex gap-2 items-stretch justify-start'>
                <div className={className} style={{width: "20%"}}>
                    {product.name}
                </div>
                <div className={className} style={{width: "20%"}}>
                    <div className='flex justify-center items-center px-3'>
                        <Input
                            widthOnPercent={100}
                            className={`text-center h-9 bg-weef-secondary-light ${!formik.errors.remaining && 'ring-weef-secondary-light'}`}
                            id='remaining' name='remaining'
                            about={formik.errors.remaining}
                            onChange={formik.handleChange}
                            value={formik.values.remaining}
                            placeholder='موجودی'/>
                    </div>
                </div>
                <div className={className} style={{width: "28%"}}>
                    <div className='flex justify-center items-center px-3'>
                        <Input
                            widthOnPercent={100}
                            className='text-center h-9'
                            id='price' name='price'
                            about={formik.errors.price}
                            onChange={(e) => handleChange('price', e.target.value)}
                            value={formik.values.price}
                            placeholder='قیمت محصول'/>
                    </div>
                    <span>تومان</span>
                </div>
                <div className={className} style={{width: "32%"}}>
                    <div className='flex justify-center items-center px-3'>
                        <Input
                            widthOnPercent={100}
                            className={`text-center h-9 bg-weef-secondary-light ${!formik.errors.final_price && 'ring-weef-secondary-light'}`}
                            id='final_price' name='final_price'
                            about={formik.errors.final_price}
                            onChange={(e) => handleChange('final_price', e.target.value)}
                            value={formik.values.final_price}
                            placeholder='قیمت نهایی محصول'/>
                    </div>
                    <span>تومان</span>
                </div>
            </form>
            <RotatedButton
                onClick={formik.handleSubmit}
                heightOnPx={72}
                background={Colors._primary_red}
                className='absolute left-0 -translate-x-1/2 text-sm'
                key={product.slug}>
                ثبت
            </RotatedButton>
        </ItemRow>
    );
}

export default ManagementProductItem;