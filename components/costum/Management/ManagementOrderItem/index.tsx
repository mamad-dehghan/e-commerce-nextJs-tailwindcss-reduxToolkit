import React, {useEffect, useState} from 'react';
import RotatedButton from "../../../common/RotatedButton";
import {Colors} from "../../../../utilities/constants/colors";
import ManagementItem from "../ManagmentItem";
import {ISuccessOrder} from "../../../../interfaces/order";
import OrderModal from "../OrderModal";
import _3DigitSeparator from "../../../../utilities/functions/_3DigitSeparator";
import {ISuccessUser} from "../../../../interfaces/editUser";
import {getSpecificAddress} from "../../../../utilities/functions/ApiCall/address";
import {useCookies} from "react-cookie";

type props = {
    order: ISuccessOrder,
    user: ISuccessUser | undefined,
    handleChange: Function
}

const ManagementOrderItem = ({user, order, handleChange}: props) => {
    const [cookies] = useCookies(['token']);
    const [open, setOpen] = useState<boolean>(false)
    // const [address, setAddress] = useState<any>()
    //
    // useEffect(() => {
    //     getSpecificAddress(cookies.token, order.address)
    //         .then(response => {
    //             setAddress(response.address)
    //         })
    // })

    return (
        <div className='w-full flex justify-center' style={{zIndex: open ? 200 : 0}}>
            <ManagementItem
                heightOnPx={72}
                items={[
                    {title: (new Date(order.created)).toDateString(), width: 35},
                    {title: (new Date(order.data?.sendOrderTime)).toDateString(), width: 35},
                    {title: `${_3DigitSeparator(order.total.toString())} تومان`, width: 30}
                ]}
                key={order.id}>
                <RotatedButton
                    onClick={() => setOpen(true)}
                    heightOnPx={72}
                    background={Colors._primary_red}
                    className='absolute left-0 -translate-x-1/2 text-sm'
                    key={order.data?.trackingCode + '1'}>
                    بررسی
                </RotatedButton>
                <RotatedButton
                    heightOnPx={72}
                    background={Colors._primary_orange}
                    className='absolute right-0 translate-x-1/2 text-sm'
                    key={order.data?.trackingCode + '2'}>
                <span className='text-center'>
                {
                    order.status === 'checked' ?
                        "تایید شده" :
                        "تایید نشده"
                }
                </span>
                </RotatedButton>
                {
                    open &&
                    <OrderModal user={user} order={order} toggleOpen={setOpen}
                                handleChange={handleChange}/>
                }
            </ManagementItem>
        </div>
    );
}

export default React.memo(ManagementOrderItem);