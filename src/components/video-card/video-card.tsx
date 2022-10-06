import React from 'react';
import { Link } from 'react-router-dom';
import './video-card.scss';

export const VideoCard = ({
    id,
    image,
    title,
    description,
    text,
}: IVideoCard): JSX.Element => {
    return (
        <div className="video-card">
            <div className="video-card__media">
                <img src={image} alt={title} className="video-card__img" width="488" height="255" />
                <div className="video-card__hover-content">
                    <div className="video-card__hover-content-inner">
                        <div className="video-card__hover-text">{text}</div>
                        <Link to={`/video/${id}`} className="video-card__btn">смотреть</Link>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="video-card__title">
                    {title}
                    <span className="video-card__description">
                        {description}
                    </span>
                </h2>

            </div>
        </div >
    )
}
export interface IVideoCard {
    id: string;
    image: string;
    title: string;
    description: string;
    text: string;
    detail: string;
}