import React, {useEffect, useState} from "react";
import styles from './Paginator.module.css';
import cn from "classnames";

type PaginatorPropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChange: (page: number) => void,
    portionSize?: number,
}

const Paginator: React.FC<PaginatorPropsType> = ({
                       totalItemsCount,
                       pageSize,
                       currentPage,
                       onPageChange,
                       // onPortionNumberChange,
                       portionSize = 10,
                       // portionNumber
}) => {

    // сколько всего страниц, например 100 юзеров / 10 юзеров на странице = 10 страниц
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    // страницы
    const pages: Array<number> = [] ;
    // страницы от 1 до максимум
    // [1][2]...[10]
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    // сколько порций страниц по 10 будет:
    // 10 страниц всего / 10 (обьем одной порции, мы хотим чтобы 10 страниц это одна порция была) = 1 порция ([1][2]...[10])
    // 100 страниц всего / 10 = 10 порций по 10 страниц ([1][2]...[10], [11][12]...[20], ...)
    const portionCount = Math.ceil(pagesCount / portionSize);
    // номер порции ([1][2]...[10] = 1, [11][12]...[20] = 2, ...)
    const [portionNumber, setPortionNumber] = useState(1);
    // [1][2]...[10] | [11][12]...[20] | ... рассчитываем левую границу порции (например левая граница 2ой порции это 11 страница)
    const portionPageNumberLeft = (portionNumber - 1) * portionSize + 1; // (2-1) * 10 + 1 = 11
    // рассчитываем правую границу порции (например правая граница 2ой порции это 20 страница)
    const portionPageNumberRight = portionNumber * portionSize; // 2 * 10 = 20

    // чтобы после выбора страницы порция не сбивалась на первую
    // это вместо варианта если брать из пропс portionNumber
    useEffect(() => {
        setPortionNumber(Math.ceil(currentPage/portionSize));
    },[currentPage]);

    return (
        <div className={styles.pages}>
            {/* если текущая порция первая ([1]...[10]) то кнопку PREV не показывать, если 2ая или больше - показывать */}
            {portionNumber > 1 && <button onClick={ () => {setPortionNumber(portionNumber - 1)} }>PREV</button>}
            {/* возващаем новый массив с помощью фильтрации - фильтруем только те страницы, */}
            {/* которые больше либо равны чем левая граница текущей порции и меньше либо равны чем правая граница порции */}
            {/* например в порции [1][2]...[10]: [1] страница === [1] (левая граница) && [1] < [10] (правая граница) - возвращает true и страница [1] записывается в массив */}
            {/* ... */}
            {/* так же [10] страница > [1] (левая граница) && [10] === [10] (правая граница) - возвращает true и страница [10] записывается в массив */}
            {pages
                .filter(page => page >= portionPageNumberLeft && page <= portionPageNumberRight)
                .map(page =>
                    <span key={page}
                          // className={ currentPage === page ? styles.activePage : '' }
                          className={cn({
                              [styles.activePage]: currentPage === page // так как свойством обьекта не может быть переменная, но если в переменной сидит строка то свойство обрамляем []
                          }, styles.pageNumber)}
                          onClick={ () => {onPageChange(page)} }>
                        {page}
                    </span>
            )}
            {/* если число максимального кол-ва порций (последней) больше чем число текущей порции (макс (последняя) 10 > 6 текущая) то кнопку NEXT показывать */}
            {portionCount > portionNumber && <button onClick={ () => {setPortionNumber(portionNumber + 1)} }>NEXT</button>}
        </div>
    )
}

export default Paginator;
