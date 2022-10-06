import React from 'react'
import { IVideoComment } from '../video-comments/video-comments';
import './video-comment.scss';

export const VideoComment = ({
    author,
    description,
    comment,
    image
}: IVideoComment): JSX.Element => {
    return (
        <>
            <div className="video-comment__author-area">
                {image && (
                    <div className="video-comment__image">
                        <img src={image} alt={author} />
                    </div>
                )}
                <div>
                    <h2 className="video-comment__author">{author}</h2>
                    <div className="video-comment__description">{description}</div>
                </div>
            </div>

            <div className="video-comment__comment">{comment}</div>
        </>
    )
}
