import React from 'react';

type props = {
    currentPage: number,
    setPage: Function,
    pages: number[],
    maxPage: number,
    minPage: number
}

const Pagination = ({currentPage, setPage, pages, maxPage, minPage}: props) => {
    return (
            <div
                className='bg-primary flex items-center justify-start gap-[1px] p-[1px] rounded z-10'>
                <button
                    key='first'
                    disabled={currentPage === minPage}
                    onClick={() => setPage(minPage)}
                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-r'>ابتدا
                </button>
                {
                    pages.map(item => (
                        <button
                            key={item}
                            disabled={currentPage === item}
                            onClick={() => setPage(item)}
                            className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary'>{item}
                        </button>
                    ))
                }
                <button
                    key='last'
                    disabled={currentPage === maxPage}
                    onClick={() => setPage(maxPage)}
                    className='flex items-center justify-center h-12 w-[3.5rem] bg-weef-black hover:bg-transparent text-weef-white hover:text-weef-black transition-all duration-300 disabled:text-weef-grey disabled:bg-secondary disabled:hover:text-weef-grey disabled:hover:bg-secondary rounded-l'>انتها
                </button>
            </div>
    );
}

export default React.memo(Pagination);