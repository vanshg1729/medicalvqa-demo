import React from 'react';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import Breadcrumbs from './breadcrumbs';
import config from './config';
// import tags from './tags.json';
import './homepage.css';

const TagsPage = () => {

    const tags = useRef([]);
    const [groupedTags, setGroupedTags] = useState({});

    useEffect(() => {
            
        const getTheTags = async () => {
            const response = await fetch(`${config.backendUrl}/api/tag`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                tags.current = responseData.map(obj => obj.name);
                const groupTagsAlphabetically = () => {
                    const groupedTagsInner = {};
                    const sortedTags = tags.current.sort(); // for grouping the tags alphabetically
                    console.log(sortedTags, "sortedTags");
                    sortedTags.forEach((tag) => {
                        const firstChar = tag.charAt(0).toUpperCase();
                        if (!groupedTagsInner[firstChar]) {
                            groupedTagsInner[firstChar] = [];
                        }
                        groupedTagsInner[firstChar].push(tag);
                    });
            
                    return groupedTagsInner;
                };
            
                const result = groupTagsAlphabetically();
                setGroupedTags(result);
                console.log(tags, "tags");
            }
        }
        getTheTags();
    }, []);

    

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
