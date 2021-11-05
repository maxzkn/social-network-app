import React from "react";
import styles from './Paginator.module.css';

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChange }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map( (page, idx) =>
                    <span key={idx} className={ currentPage === page ? styles.activePage : '' }
                    onClick={() => { onPageChange(page) }} >{page}</span>
                )}
            </div>
        </div>
        )
}

export default Paginator;
