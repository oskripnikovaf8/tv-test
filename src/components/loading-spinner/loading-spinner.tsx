import React from 'react'
import './loading-spinner.scss';

export const LoadingSpinner = (): JSX.Element => {
    return (
        <div>
            <div className="loading-spinner">
                <div className="spinner-loader"></div>
            </div>
        </div>
    )
}