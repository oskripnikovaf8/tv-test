import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { VideoCard, IVideoCard } from '../video-card/video-card';
import { useCheckMobileScreen } from '../check-mobile/useCheckMobileScreen';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

import './video-list.scss';
import './pagination.scss';

const API_ENDPOINT = 'https://corsanywhere.herokuapp.com/https://fe-dev-offer.herokuapp.com/list';
const ITEMS_PER_PAGE = 6;

export const VideoList = (): JSX.Element => {

    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const pagesVisited = pageNumber * ITEMS_PER_PAGE;
    const displayItems = data.slice(pagesVisited, pagesVisited + ITEMS_PER_PAGE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_ENDPOINT)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error: string) => {
                console.dir(error);
            });
    }, []);

    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

    const changePage = (item: { selected: number }): void => {
        setPageNumber(item.selected);
    };

    return (
        <>
            <div className="grid-container">
                <div className="grid-container__col1">
                    <h1>Наши видео</h1>
                    {loading && <LoadingSpinner />}
                </div>
            </div>
            <div className="grid-container">
                <div className="grid-container__col1">
                    <div className="video-list">
                        {
                            useCheckMobileScreen() && (
                                <>
                                    <ul className="video-list__grid">
                                        {data.map((item: IVideoCard) => (
                                            <li key={`${item.id}`} className="video-list__item">
                                                <VideoCard {...item} />
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )
                        }
                        {
                            !useCheckMobileScreen() && (
                                <>
                                    <ul className="video-list__grid">
                                        {displayItems.map((item: IVideoCard) => (
                                            <li key={`${item.id}`} className="video-list__item">
                                                <VideoCard {...item} />
                                            </li>
                                        ))}
                                    </ul>
                                    <ReactPaginate
                                        previousLabel={"<"}
                                        nextLabel={">"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"pagination"}
                                        pageClassName={"pagination__item"}
                                        previousClassName={"pagination__arrow pagination__arrow-prev"}
                                        nextClassName={"pagination__arrow pagination__arrow-next"}
                                        disabledClassName={"is-disabled"}
                                        activeClassName={"is-active"}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
                <div className="grid-container__col2">
                    <div className="banner">
                        <a href="#" title="Все выступления и лучшие моменты"><img src="assets/images/banner2.png" /></a>
                    </div>
                </div>
            </div>
        </>
    );
};
