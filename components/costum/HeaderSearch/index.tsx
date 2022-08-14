import React, {useMemo, useState} from 'react';
import SearchInput from "../../common/SearchInput";
import SearchResultModal from "../SearchResultModal";

const HeaderSearch = () => {
    const [value, setValue] = useState<string>('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const [modalFocus, setModalFocus] = useState<boolean>(false);

    const handleFocus = useMemo(() => {
        if (inputFocus || modalFocus)
            return true
    }, [inputFocus, modalFocus])

    return (
        <div className='relative'>
            <SearchInput toggleFocus={setInputFocus} isFocus={handleFocus} onChange={(e: string) => setValue(e)}
                         initial={''} itemType={'header'} placeholder='جست‌وجو بین محصولات ...'/>
            <SearchResultModal value={value} isFocus={handleFocus} toggleFocus={setModalFocus}/>
        </div>
    );
}

export default HeaderSearch;