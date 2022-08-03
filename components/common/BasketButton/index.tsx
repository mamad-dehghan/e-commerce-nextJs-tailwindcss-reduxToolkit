import React, {useMemo} from 'react';
import BasketIcon from "../../../utilities/icons/BasketIcon";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

const BasketButton = () => {
    const {finalSum} = useSelector((state: RootState) => state.BasketSlice);
    const basketIsEmpty = useMemo(() => {
        return finalSum === 0;
    }, [finalSum]);

    return (
        <BasketIcon isEmpty={basketIsEmpty}/>
    );
}

export default BasketButton;