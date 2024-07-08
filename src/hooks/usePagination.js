import { useState } from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const goToFirst = () => {
        setCurrentPage(1);
    };

    const goToEnd = () => {
        setCurrentPage(totalPages);
    };

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        goToFirst,
        goToEnd
    };
};

export default usePagination;
