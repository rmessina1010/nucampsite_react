import React from 'react';

export const Loading = () => {
    return (
        <div className="col">
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" aria-hidden="true"></i>
            <p>Loading...</p>
        </div>
    );
}