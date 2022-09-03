import {useState, useEffect, useRef} from 'react';

const useComponentVisible = (initialIsVisible: any) => {
    const [open, setOpen] = useState<boolean>(initialIsVisible);
    const ref: any = useRef(null);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target))
            setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return {ref, open, setOpen};
}
export default useComponentVisible