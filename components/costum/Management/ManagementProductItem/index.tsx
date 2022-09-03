import React, {useCallback, useEffect, useState} from 'react';
import RotatedButton from "../../../common/RotatedButton";
import {Colors} from "../../../../utilities/constants/colors";
import ManagementItem from "../ManagmentItem";
import IProduct from "../../../../interfaces/product";
import _3DigitSeparator from "../../../../utilities/functions/_3DigitSeparator";
import ICategory from "../../../../interfaces/category";
import {getCategoryById} from "../../../../utilities/functions/ApiCall/category";
import {deleteProduct, editProductDetails} from "../../../../utilities/functions/ApiCall/products";
import {useCookies} from "react-cookie";
import EditProductModal from "../EditProductModal";

type props = {
    product:IProduct,
    handleDeleteProduct:Function,
    handleEditProduct:Function
}

const ManagementProductItem=({product, handleEditProduct, handleDeleteProduct}: props)=> {
    const [cookies] = useCookies(['token']);
    const [open, setOpen] = useState<boolean>(false)
    const [category, setCategory] = useState<ICategory>()

    useEffect(()=>{
        getCategoryById(product.category)
            .then(([status, response])=>{
                if (status)
                    setCategory(response)
            })
    },[])

    const handleDelete = useCallback(()=>{
        deleteProduct(cookies.token,product.id)
            .then(res=>{
                console.log(res)
                handleDeleteProduct(product.id)
            })
    },[product.id])

    return (
        <div className='w-full flex justify-center' style={{zIndex : open?200:0}}>
        <ManagementItem
            heightOnPx={72}
            items={[
                {title: product.name, width: 35},
                {title: (category?.name || ''), width: 35},
                {title: `${_3DigitSeparator(product.price)} تومان`, width: 30}
            ]}
            key={product.id}>

            <RotatedButton
                onClick={handleDelete}
                heightOnPx={72}
                background={Colors._primary_red}
                className='absolute left-0 -translate-x-1/2 text-sm'
                key={product.slug + '1'}>
                حذف
            </RotatedButton>
            <RotatedButton
                onClick={()=>setOpen(true)}
                heightOnPx={72}
                background={Colors._primary_orange}
                className='absolute right-0 translate-x-1/2 text-sm'
                key={product.slug + '2'}>
                <span className='text-center whitespace-nowrap'>
                ویرایش
                </span>
            </RotatedButton>
            {
                open &&
                <EditProductModal key={product.id} toggleOpen={setOpen} handleEditProduct={handleEditProduct} productInfos={product} />
            }
        </ManagementItem>
        </div>
    );
}

export default React.memo(ManagementProductItem);