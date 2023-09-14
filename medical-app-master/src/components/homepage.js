import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chatbot'
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


import data from './data.json';

import './homepage.css'

import image1 from './image1.png'
import image2 from './image2.png'
import image3 from './image3.png'
import image4 from './image4.png'
import image5 from './image5.png'
import image6 from './image6.png'
import image7 from './image7.png'
import image8 from './image8.png'
import image9 from './image9.png'

const Homepage = () => {
    const [chatbotShow, setChatbotShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [displayImage, setDisplayImage] = useState([image1, image2, image3, image4, image5, image6, image7, image8, image9])
    // const [tagSearch, setTagSearch] = useState("")
    const [loading, setLoading] = useState(false);

    const chatbotShowRef = useRef(false);

    const imgList = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

    useEffect(() => {

        const track = document.getElementById("image-track");

        const handleOnDown = e => {
            track.dataset.mouseDownAt = e.clientX;
            if (e.target.classList.contains("image")) {
                setSelectedImage(e.target.src)
                // console.log(e.target.src, "here")
                setChatbotShow(true)
                chatbotShowRef.current = true;
            }
        }

        var originalScrollPos = window.pageYOffset || document.documentElement.scrollTop;

        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        }

        const handleOnMove = e => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;

            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

            track.dataset.percentage = nextPercentage;

            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, { duration: 1200, fill: "forwards" });

        }

        function resetScrollPosition() {
            if (chatbotShow) return;
            window.scrollTo(0, originalScrollPos);
        }

        function preventScrolling(event) {
            if (event.deltaY === 0) return;
            if (!chatbotShowRef.current) {
                event.preventDefault();
                // console.log(event.deltaY);
                // now with this i want to achieve the same thing as we did with the mousemove event
                // so we do the following

                const mouseDelta = event.deltaY / 2,
                    maxDelta = window.innerWidth / 2;

                const percentage = (mouseDelta / maxDelta) * -100,
                    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

                track.dataset.prevPercentage = nextPercentage; // this is an extra very important line
                track.dataset.percentage = nextPercentage;

                track.animate({
                    transform: `translate(${nextPercentage}%, -50%)`
                }, { duration: 1200, fill: "forwards" });

                // for (const image of track.getElementsByClassName("image")) {
                //     image.animate({
                //         objectPosition: `${100 + nextPercentage - 48}% center`
                //     }, { duration: 1200, fill: "forwards" });
                // }

                resetScrollPosition();
            }
        }

        /* -- Had to add extra lines for touch events -- */

        window.onmousedown = e => handleOnDown(e);

        window.ontouchstart = e => handleOnDown(e.touches[0]);

        window.onmouseup = e => handleOnUp(e);

        window.ontouchend = e => handleOnUp(e.touches[0]);

        window.onmousemove = e => handleOnMove(e);

        window.ontouchmove = e => handleOnMove(e.touches[0]);

        window.addEventListener('wheel', preventScrolling, { passive: false });


    }, [])

    const [selectedTags, setSelectedTags] = useState([]);
    const tags = ['image1', 'image2', 'image3', 'image4', 'image5']

    const handleTagSelect = (event, value) => {
        // we have to set the selected tags to the value
        setSelectedTags(value);
    };

    const handleSendQuestionTag = () => {
        // selecting unique tags
        selectedTags.filter((item, index) => selectedTags.indexOf(item) === index)
        if (selectedTags.length === 0) {
            alert("Please select a tag")
        }
        else {
            setTimeout(() => {
                const newDisplayImage = []
                for (let i = 0; i < data.images.length; i++) {
                    let check = 0
                    for (let j = 0; j < data.images[i].tags.length; j++) {
                        for (let k = 0; k < selectedTags.length; k++) {
                            if ((data.images[i].tags[j].includes(selectedTags[k]))) {
                                check = 1
                            }
                        }
                    }
                    if (check === 1) {
                        newDisplayImage.push(imgList[i])
                    }
                }
                console.log(newDisplayImage)
                // for (let i = 0; i < data.images.length; i++) {
                //     for (let j = 0; j < data.images[i].tags.length; j++) {
                //         if (data.images[i].tags[j].includes("hi mom")) {
                //             newDisplayImage.push(imgList[i])
                //             break;
                //         }
                //     }
                // }
                setDisplayImage(newDisplayImage)
            }, 1500);
        }
    }

    return (
        <>
            <Chat selectedImage={selectedImage} chatbotShow={chatbotShow} setChatbotShow={setChatbotShow} />
            <div style={{
                // display: chatbotShow ? "none" : "block",
                fontFamily: '"Bebas Neue", sans-serif',
                transition: 'opacity 1s ease-in-out',
                opacity: chatbotShow ? 0 : 1,
                display: chatbotShow ? "none" : "block",
            }}>
                <div className="heading">
                    <div className="heading1">BayMax</div>
                    <div className="heading2">Please select an image to ask questions related to that image</div>
                </div>

                <Autocomplete
                    multiple
                    id="tag-select"
                    options={tags} // Replace 'tags' with your list of available tags
                    onChange={handleTagSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            variant="outlined"
                            // value={tagSearch}
                            // onChange={handleInputChangeTag}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    handleSendQuestionTag();
                                    // if not empty, then only do this
                                    // if (tagSearch !== "") {
                                    //     setLoading(true);
                                    //     setTimeout(() => {
                                    //         setLoading(false);
                                    //     }, 1500);
                                    // }
                                }
                            }}
                            style={{ position: 'absolute', color: '#F0EAD6', border: '2px solid darkgrey', top: '25vh', width: '40vw', left: '30vw', backgroundColor: 'transparent' }}
                        />
                    )}
                />
                {loading ?
                    <div className="blue-loader-container">
                        <div className="blue-loader"></div>
                    </div>
                    : null}

                <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                    {
                        displayImage.map((image, index) => {
                            return (
                                <img key={index} className="image" src={image} draggable="false" />
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Homepage
