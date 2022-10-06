import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { VideoFullCard, IVideoFullCard } from '../video-full-card/video-full-card';
import { VideoComments, IVideoComments } from '../video-comments/video-comments';
import { VideoForm } from '../video-form/video-form';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';

import './video-details.scss';

const VIDEO_DETAIL_API_ENDPOINT = 'https://corsanywhere.herokuapp.com/https://fe-dev-offer.herokuapp.com/item/';
const VIDEO_COMMENTS_API_ENDPOINT = 'https://corsanywhere.herokuapp.com/http://fe-dev-offer.herokuapp.com/comments/';

export const VideoDetail = (): JSX.Element => {
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const { id } = useParams();
    const [videoDetail, setVideoDetail] = useState(null as IVideoFullCard);
    const [videoComments, setVideoComments] = useState(null as IVideoComments);

    useEffect(() => {
        getVideoDetal();
        getVideoComments();
    }, []);

    const getVideoComments = (): void => {
        axios.get(VIDEO_COMMENTS_API_ENDPOINT + id)
            .then(res => {
                setVideoComments(res.data);
                setLoadingComments(false);
            })
            .catch((error: string) => {
                console.dir(error);
            });
    }

    const getVideoDetal = (): void => {
        axios.get(VIDEO_DETAIL_API_ENDPOINT + id)
            .then(res => {
                setVideoDetail(res.data);
                setLoadingDetail(false);
            })
            .catch((error: string) => {
                console.dir(error);
            });
    }

    return (
        <>
            <div className="grid-container">
                {(loadingDetail || loadingComments) && <LoadingSpinner />}
                <div className="video-detail__header">
                    <h1 className="video-detail__title">Выбранное видео</h1>
                    <Link to={"/"} className="video-detail__all-link">
                        <span className="is-mobile">все</span>
                        <span className="is-tablet">к списку видео</span>
                        <span className="is-desktop">все</span>
                        <span className="is-destop-medium">все видео</span>
                    </Link>
                </div>
            </div>

            <div className="grid-container-detail">
                <div className="grid-container-detail__col1">
                    <div className="video-detail">
                        <VideoFullCard {...videoDetail} />
                        <VideoComments {...videoComments} />
                        <VideoForm id={id} />
                    </div>
                </div>
                <div className="grid-container-detail__col2">
                    <div className="banner">
                        <a href="#" title="Все выступления и лучшие моменты"><img src="assets/images/banner2.png" /></a>
                    </div>
                </div>
            </div>
        </>
    );

}
