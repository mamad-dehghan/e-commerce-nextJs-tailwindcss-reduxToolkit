import React, {useCallback, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Input from "../../../common/Input";
import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "../../../common/Button";
import {addProduct} from "../../../../utilities/functions/ApiCall/products";
import ColorMultiSelect from "../../../common/ColorMultiSelect";
import MultiSelect from "../../../common/MultiSelect";
import TextArea from "../../../common/TextArea";
import {findCategoryIdByName} from "../../../../utilities/functions/ApiCall/category";

const addProductSchema = Yup.object().shape({
    name: Yup.string().required('ضروری'),
    image: Yup.string().required('ضروری'),
    category: Yup.string().required('ضروری'),
    brand: Yup.string().required('ضروری'),
    description: Yup.string()
});

type props = {
    toggleOpen: Function,
    handleAddProduct: Function
}

const AddProductModal = ({toggleOpen, handleAddProduct}: props) => {
    const [cookies] = useCookies(['token']);
    const [product, setProduct] = useState<any>()
    const [colors, setColors] = useState<string[]>([])
    const [sizes, setSizes] = useState<string[]>([])

    const handleAdd = useCallback(() => {
        console.log(product)
        findCategoryIdByName(formik.values.category)
            .then(([status, categoryId]) => {
                if (status) {
                    addProduct(cookies.token, {...product, category: categoryId})
                        .then(([status, response]: any) => {
                            if (status) {
                                handleAddProduct(response)
                                toggleOpen(false)
                            } else {
                                console.log(response)
                            }
                        })
                }
                else
                    console.log('category error')
            })
        addProduct(cookies.token, product)
            .then(([status, response]: any) => {
                if (status) {
                    handleAddProduct(response)
                    toggleOpen(false)
                } else {
                    console.log(response)
                }
            })
    }, [handleAddProduct, cookies.token, product, toggleOpen])

    useEffect(() => {
        if (product)
            handleAdd()
    }, [handleAdd, product])

    const formik = useFormik({
        initialValues: {
            name: '',
            image: '',
            category: '',
            brand: '',
            description: ''
        },
        validationSchema: addProductSchema,
        onSubmit: values => {
            console.log(values.image);
            setProduct({
                name: values.name,
                mainImage: values.image,
                price: '0',
                final_price: '0',
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
        <div className='absolute top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center'
             style={{zIndex: 100}}>
            <form onSubmit={formik.handleSubmit}
                  className='flex flex-col items-stretch w-[90%] max-h-[90%] shadow-lg bg-primary p-[1px] rounded-lg'>
                <div className='h-fit w-full p-8 bg-weef-black flex items-stretch rounded-t-lg z-20'>
                    <div className='w-1/2 h-full flex flex-col items-stretch justify-start gap-2'>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='name'
                                   className='text-weef-white whitespace-nowrap'>{"نام کالا"}</label>
                            <div className='w-[75%]'>
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
                            <div className='w-[75%]'>
                                <Input value={formik.values.category}
                                       disabled={formik.isSubmitting}
                                       about={formik.errors.category}
                                       onChange={formik.handleChange} type="text" id='category' name='category'
                                       placeholder={"دسته بندی"}
                                       className='h-9 text-center' widthOnPercent={100}/>
                            </div>
                        </div>
                        <div className='flex px-4 justify-between items-center'>
                            <label htmlFor='image'
                                   className='text-weef-white whitespace-nowrap'>{"تصویر کالا"}</label>
                            <div className='w-[75%]'>
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
                            <div className='w-[75%]'>
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
                    <Button disable={!formik.isValid} type='submit' size='medium'>ایجاد کالا</Button>
                    <Button onClick={() => toggleOpen(false)} size='medium'>بستن</Button>
                </div>
            </form>
        </div>
    );
}

export default AddProductModal;