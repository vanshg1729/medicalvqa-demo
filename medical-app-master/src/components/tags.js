import React from 'react';
import tags from './tags.json';

import './homepage.css';

const TagsPage = () => {
    console.log(tags);
    return (
        <div>
            <div className='heading'>
                <div className='heading1'>Tags</div>
                <div className='heading2'>Total Tags: {tags.length}</div>
            </div>
            <div className='tags-values'>
                {tags.map((tag, index) => (
                    <div key={index}>--&gt; {tag}</div>
                ))}
            </div>
        </div>
    );
};

export default TagsPage;
