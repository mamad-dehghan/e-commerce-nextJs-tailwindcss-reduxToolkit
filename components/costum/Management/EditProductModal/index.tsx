import React, {useCallback, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {useCookies} from "react-cookie";
import Input from "../../../common/Input";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../../common/Button";
import {addProduct, editProductDetails} from "../../../../utilities/functions/ApiCall/products";
import ColorMultiSelect from "../../../common/ColorMultiSelect";
import MultiSelect from "../../../common/MultiSelect";
import TextArea from "../../../common/TextArea";
import IProduct from "../../../../interfaces/product";
import {getCategoryById} from "../../../../utilities/functions/ApiCall/category";
import {findBrandNameById} from "../../../../utilities/functions/ApiCall/brand";
import {toast} from "react-toastify";

const addProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(4, 'نام‌کاربری معتبر نیست')
        .max(150, 'نام‌کاربری معتبر نیست')
        .required('نام‌کاربری ضروری است'),
    image: Yup.string()
        .required('رمز عبور ضروری است'),
    category: Yup.string().required(),
    brand: Yup.string().required(),
    description: Yup.string()
});

type props = {
    toggleOpen: Function,
    handleEditProduct: Function,
    productInfos: IProduct
}

type formValuesType = {
    name: string,
    image: string,
    category: string | number,
    brand: string | number,
    description: string
}


const EditProductModal = ({toggleOpen, handleEditProduct, productInfos}: props) => {
    const [cookies] = useCookies(['token']);
    const [initialForm, setInitialForm] = useState<formValuesType>({
        name: productInfos.name,
        image: productInfos.main_image,
        category: productInfos.category,
        brand: productInfos.brand,
        description: productInfos.description
    })
    const [product, setProduct] = useState<any>()
    const [colors, setColors] = useState<string[]>([])
    const [sizes, setSizes] = useState<string[]>([])

    useLayoutEffect(() => {
        getCategoryById(productInfos.category)
            .then(([status, response]) => {
                if (status)
                    setInitialForm(prevState => ({...prevState, category: response.name}))
            })
        findBrandNameById(parseInt(productInfos.brand))
            .then(([status, response]) => {
                if (status)
                    setInitialForm(prevState => ({...prevState, brand: response}))
            })
    }, [productInfos])

    const handleEdit = useCallback(() => {
        editProductDetails(cookies.token, product, productInfos.id)
            .then(([status, response]: any) => {
                if (status) {
                    toast.success("اطلاعات محصول با موفقیت تغییر یافت")
                    handleEditProduct(response)
                    toggleOpen(false)
                } else {
                    toast.error("خطا در ارسال اطلاعات")
                }
            })
    }, [product, cookies.token, productInfos.id, handleEditProduct, toggleOpen])

    useEffect(() => {
        if (product)
            handleEdit()
    }, [handleEdit, product])

    const formik = useFormik({
        initialValues: initialForm as formValuesType,
        validationSchema: addProductSchema,
        enableReinitialize: true,
        onSubmit: values => {
            console.log(values);
            setProduct({
                name: values.name,
                mainImage: values.image,
                brand: values.brand,
                category: values.category,
                description: values.description,
                attributes: {
                    sizes,
                    colors
                }
            })
        }
    })

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center'
             style={{zIndex: 100}}>
            <form onSubmit={formik.handleSubmit}
                  className='flex flex-col items-stretch w-[90%] max-h-[90%] shadow-lg bg-primary p-[1px] rounded-lg'>
                <div className='h-fit w-full p-8 bg-weef-black flex items-stretch rounded-t-lg z-20'>
                    <div className='w-1/2 h-full flex flex-col items-stretch justify-start gap-2'>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='name'
                                   className='text-weef-white whitespace-nowrap'>{"نام کالا"}</label>
                            <div className='w-[85%]'>
                                <Input value={formik.values.name}
                                       disabled={formik.isSubmitting}
                                       about={formik.errors.name}
                                       onChange={formik.handleChange} type="text" id='name' name='name'
                                       placeholder={"نام کالا"}
                                       className='h-9 text-center' widthOnPercent={100}/>
                            </div>
                        </div>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='category'
                                   className='text-weef-white whitespace-nowrap'>{"دسته بندی"}</label>
                            <div className='w-[85%]'>
                                <Input value={formik.values.category}
                                       disabled={formik.isSubmitting}
                                       about={formik.errors.category}
                                       onChange={formik.handleChange} type="text" id='category' name='category'
                                       placeholder={"کد دسته بندی"}
                                       className='h-9 text-center' widthOnPercent={100}/>
                            </div>
                        </div>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='image'
                                   className='text-weef-white whitespace-nowrap'>{"تصویر کالا"}</label>
                            <div className='w-[85%]'>
                                <Input value={formik.values.image}
                                       disabled={formik.isSubmitting}
                                       about={formik.errors.image}
                                       onChange={formik.handleChange} type="text" id='image' name='image'
                                       placeholder={"آدرس تصویر"}
                                       className='h-9 text-center' widthOnPercent={100}/>
                            </div>
                        </div>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='brand'
                                   className='text-weef-white whitespace-nowrap'>{"برند"}</label>
                            <div className='w-[85%]'>
                                <Input value={formik.values.brand}
                                       disabled={formik.isSubmitting}
                                       about={formik.errors.brand}
                                       onChange={formik.handleChange}
                                       type="text" id='brand' name='brand' placeholder={"برند"}
                                       className='h-9 text-center' widthOnPercent={100}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 h-full flex flex-col items-stretch justify-start gap-2'>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='colors'
                                   className='text-weef-white whitespace-nowrap'>{"رنگ بندی"}</label>
                            <ColorMultiSelect
                                onChange={setColors}
                                position={'absolute'} id='colors' name='colors'
                                options={[
                                    'black', 'white', 'maroon',
                                    'navy', 'blueviolet', 'chocolate',
                                    'cyan', 'darkgray', 'darkslateblue',
                                    'forestgreen', 'gainsboro', 'gold',
                                    'indigo', 'lightslategrey', 'orange',
                                    'orangered', 'peru', 'saddlebrown',
                                    'sandybrown', 'slategray', 'wheat'
                                ]}
                                initialValues={productInfos.attributes.colors}
                                title='رنگ بندی'/>
                        </div>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='sizes'
                                   className='text-weef-white whitespace-nowrap'>{"سایز بندی"}</label>
                            <MultiSelect
                                onChange={setSizes}
                                position={'absolute'} id='sizes' name='sizes'
                                options={[
                                    '37', '38', '39',
                                    '40', '41', '42',
                                    '43', '44', '45', '46',
                                    's', 'm', 'l', 'xl',
                                    '2xl', '3xl', '4xl'
                                ]}
                                initialValues={productInfos.attributes.sizes}
                                title='سایز بندی'/>
                        </div>
                    </div>
                </div>
                <div className='w-full py-8 px-12 bg-weef-black flex items-stretch overflow-hidden z-10'>
                    <div className='flex justify-between items-center w-full overflow-hidden p-1'>
                        <label htmlFor='brand'
                               className='text-weef-white whitespace-nowrap'>{"توضیحات"}</label>
                        <div className='w-[82%]'>
                            <TextArea value={formik.values.description}
                                      disabled={formik.isSubmitting}
                                      about={formik.errors.description}
                                      onChange={formik.handleChange}
                                      type="text" id='description' name='description' placeholder={"توضیحات"}
                                      className='h-9 text-center' widthOnPercent={100}/>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center p-3 bg-secondary gap-4 rounded-b-lg'>
                    <Button disable={!formik.isValid} type='submit' size='medium'>تغییر کالا</Button>
                    <Button onClick={() => toggleOpen(false)} size='medium'>بستن</Button>
                </div>
            </form>
        </div>
    );
}

export default EditProductModal;