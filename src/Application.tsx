import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter, Routes, Route } from "react-router-dom";
import { VideoList } from './components/video-list/video-list';
import { VideoDetail } from './components/video-detail/video-detail';
import { ScrollToTop } from './components/scroll-to-top/scroll-to-top';
import './Application.scss';

const Application: React.FC = () => {
    return (
        <main>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<VideoList />} />
                    <Route path="/video/:id" element={<VideoDetail />} />
                </Routes>
            </HashRouter>
        </main>
    );
};

export default hot(module)(Application);
