import { useState } from 'react';

import Pagination from 'react-paginate';

import { ArrowFatLeft, ArrowFatRight } from 'phosphor-react';

const Paginate = ({ children, pageCount, onPaginate, ...props }) => {
    const [selectedPage, setSelectedPage] = useState(0);

    const handlePageSelect = (selectedPage) => {
        setSelectedPage(selectedPage);
        onPaginate(selectedPage + 1);
    };

    return (
        <Pagination
            previousLabel={<ArrowFatLeft size='20px' />}
            disableInitialCallback
            nextLabel={<ArrowFatRight size='20px' />}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            containerClassName={'pagination'}
            activeClassName={'active'}
            onPageChange={(currentPage) => handlePageSelect(currentPage.selected)}
            forcePage={pageCount === 1 ? 0 : selectedPage}
            {...props}
        />
    );
};

export default Paginate;
