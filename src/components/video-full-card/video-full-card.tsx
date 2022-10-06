import React from 'react';
import { IconKinopoisk, IconArrow, IconFlag, IconHeart, IconShare } from './icons';

import './video-full-card.scss';

export const VideoFullCard = ({
    title,
    image,
    genre,
    production,
    labels
}: IVideoFullCard): JSX.Element => {

    return (
        <div className="video-full-card">
            <div className="video-full-card__media">
                <img src={image} alt={title} width="232" height="342" />
            </div>
            <div className="video-full-card__content">

                <div className="video-full-card__content-wrapped">
                    <h2 className="video-full-card__title">{title}</h2>
                    <ul className="video-full-card__labels">
                        {labels?.fullhd && (
                            <li>full HD</li>
                        )}
                        {labels?.subtitles && (
                            <li>СУБ</li>
                        )}
                        {labels?.age_restrictions && (
                            <li>{labels?.age_restrictions}</li>
                        )}
                    </ul>

                    <ul className="video-full-card__production">
                        {production?.year && (
                            <li>{production?.year}</li>
                        )}
                        <li>
                            {genre?.map((item) => {
                                return (`${item}, `)
                            })}
                            {production?.country}
                        </li>
                    </ul>
                    <IconKinopoisk />
                </div>

                <a href="#" className="btn btn--not-av mb-18">
                    <span>Cмотреть<span className="btn__add">осталось смотреть 7 дней</span></span>
                </a>
                <a href="#" className="btn btn--spec btn--not-av mb-18">
                    <span>СМОТРЕТЬ за 1 ₽ без рекламы</span>
                </a>

                <div className="video-full-card__btn-line">
                    <a href="#" className="btn btn--dark btn--text-with-icon btn--not-av">
                        <span><IconArrow />ТРЕЙЛЕР</span>
                    </a>
                    <a href="#" className="btn btn--dark btn--round btn--not-av">
                        <span><IconFlag /><span className="sr-only">Screen Reader text will be here</span></span>
                    </a>
                    <a href="#" className="btn btn--dark btn--round btn--not-av">
                        <span><IconHeart /><span className="sr-only">Screen Reader text will be here</span></span>
                    </a>
                    <a href="#" className="btn btn--dark btn--round btn--not-av">
                        <span><IconShare /><span className="sr-only">Screen Reader text will be here</span></span>
                    </a>
                </div>
            </div>

        </div>
    )
}

export interface IVideoFullCard {
    id: string;
    title: string;
    image: string;
    genre: string[];
    production: IProduction;
    labels: ILabels;
}

export interface IProduction {
    year: string;
    country: string;
}

export interface ILabels {
    fullhd: boolean;
    subtitles: boolean;
    age_restrictions: string;
}