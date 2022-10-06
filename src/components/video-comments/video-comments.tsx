import React from 'react'
import { VideoComment } from '../video-comment/video-comment';

export const VideoComments = ({ comments }: IVideoComments): JSX.Element => {
    return (
        <ul className="video-comments">
            {comments?.map((item: IVideoComment) => (
                <li key={`${item.id}`} className="video-comment">
                    <VideoComment {...item} />
                </li>
            ))}
        </ul>
    )
}

export interface IVideoComments {
    pid: number;
    comments: IVideoComment[];
}

export interface IVideoComment {
    id: number;
    author: string;
    description: string;
    comment: string;
    image?: string;
}