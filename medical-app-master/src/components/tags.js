import React from 'react';

import Breadcrumbs from './breadcrumbs';
import tags from './tags.json';
import './homepage.css';

const TagsPage = () => {
    const groupTagsAlphabetically = () => {
        const groupedTags = {};
        const sortedTags = tags.sort(); // for grouping the tags alphabetically
        sortedTags.forEach((tag) => {
            const firstChar = tag.charAt(0).toUpperCase();
            if (!groupedTags[firstChar]) {
                groupedTags[firstChar] = [];
            }
            groupedTags[firstChar].push(tag);
        });

        return groupedTags;
    };

    const groupedTags = groupTagsAlphabetically();

    return (
        <>
            <Breadcrumbs />
            <div>
                <div className='heading'>
                    <div className='heading1'>Tags</div>
                    <div className='heading2'>Total Tags: {tags.length}</div>
                </div>
                <div className='tags-values'>
                    {Object.entries(groupedTags).map(([alphabet, tagsGroup]) => (
                        <React.Fragment key={alphabet}>
                            <div className='alphabet-header'>{alphabet}</div>
                            {tagsGroup.map((tag, index) => (
                                <div key={index}>--&gt; {tag}</div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TagsPage;
