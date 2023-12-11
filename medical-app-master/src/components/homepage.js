import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chatbot'
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';

import data from './data.json';
import tags from './tags.json';
import Breadcrumbs from './breadcrumbs';


import './homepage.css'

import image1 from './images/image1.png'
import image2 from './images/image2.png'
import image3 from './images/image3.png'
import image4 from './images/image4.png'
import image5 from './images/image5.png'
import image6 from './images/image6.png'
import image7 from './images/image7.png'
import image8 from './images/image8.png'
import image9 from './images/image9.png'

const Homepage = ({ selectedImage }) => {

    const navigate = useNavigate();

    const module = decodeURIComponent(window.location.href.split("/")[3])
    console.log(module, "module")

    // const [chatbotShow, setChatbotShow] = useState(false)
    const [displayImage, setDisplayImage] = useState([image1, image2, image3, image4, image5, image6, image7, image8, image9])
    const [searchByGivenTag, setSearchByGivenTag] = useState(true)
    const [myTagSearch, setMyTagSearch] = useState("")
    const [loading, setLoading] = useState(false);

    // const chatbotShowRef = useRef(false);

    const imgList = [image1, image2, image3, image4, image5, image6, image7, image8, image9]

    useEffect(() => {

        const track = document.getElementById("image-track");

        const handleOnDown = e => {
            track.dataset.mouseDownAt = e.clientX;
            if (e.target.classList.contains("image")) {
                // setSelectedImage(e.target.src)
                selectedImage.current = e.target.src;
                localStorage.setItem('selectedImage', e.target.src);
                // window.location.href = '/module/chatbot';
                navigate(`/${module}/chatbot`, { selectedImage: selectedImage.current });
                // console.log(selectedImage.current, "niceto")
                // console.log(e.target.src, "here")
                // setChatbotShow(true)
                // chatbotShowRef.current = true;
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
            // if (chatbotShow) return;
            window.scrollTo(0, originalScrollPos);
        }

        function preventScrolling(event) {
            if (event.deltaY === 0) return;
            if (true) {
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

    const handleTagSelect = (event, value) => {
        // we have to set the selected tags to the value
        setSelectedTags(value);
    };

    const handleSendQuestionTag = async () => {
        if (selectedTags.length === 0 && myTagSearch == "") {
            setDisplayImage(imgList)
            if (searchByGivenTag == true)
                alert("Please select a tag")
            else
                alert("Please enter a tag")
        }
        else {
            setLoading(true);
            if (searchByGivenTag == true) {
                selectedTags.filter((item, index) => selectedTags.indexOf(item) === index)
                // setTimeout(() => {
                let newDisplayImage = []
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
            }
            else {
                console.log("Request being sent")
                const response = await fetch('https://tagsmedvqa.onrender.com/api/tags', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userInput: myTagSearch }),
                });
                console.log("response recieved");
                if (response.ok) {
                    console.log("Response is OK");
                    const recievedData = await response.json();
                    console.log(recievedData, "the data recieved from fetch")
                    const images = recievedData.images
                    // console.log(images[0])
                    let newDisplayImage = []
                    for (let i = 0; i < data.images.length; i++) {
                        if (data.images[i]["image"] == images[0][0] || data.images[i]["image"] == images[1][0] || data.images[i]["image"] == images[2][0])
                            newDisplayImage.push(imgList[i])
                    }
                    console.log(newDisplayImage)

                    setDisplayImage(newDisplayImage)
                }
            }
            setLoading(false)
            // }, 1500);
        }
    }

    const toggleButtonStyle = {
        position: 'absolute',
        top: '29.5vh',
        left: '74vw',
        color: '#F0EAD6',
        display: 'flex',
        // alignItems: 'center',
        // textAlign: 'center',
        border: '2px solid grey',
        // padding: '1vh',
        fontSize: '1.5rem',
        borderRadius: '7px',
        fontFamily: '"Bebas Neue", sans-serif',
        backgroundColor: 'rgb(61, 72, 73)',
        height: '7vh',
    }

    const func1 = (event) => {
        console.log(event.target.value, "here")
        setMyTagSearch(event.target.value)
    }

    const toggleColor = () => {
        const store = !searchByGivenTag
        setSearchByGivenTag(store)
        setMyTagSearch("")
    }

    return (
        <>
            <Breadcrumbs />
            {/* <Chat selectedImage.current={selectedImage.current} /> */}
            {/* {console.log(selectedImage.current, "hellownice")} */}
            <div style={{
                // display: chatbotShow ? "none" : "block",
                fontFamily: '"Bebas Neue", sans-serif',
                transition: 'opacity 1s ease-in-out',
                // opacity: chatbotShow ? 0 : 1,
                // display: chatbotShow ? "none" : "block",
            }}>
                <div className="heading">
                    <div className="heading1">KREST</div>
                    <div className="heading2">Please select an image to ask questions related to that image</div>
                </div>

                {searchByGivenTag == true ?
                    <Autocomplete
                        multiple
                        id="tag-select"
                        options={tags}
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
                                    }
                                }}
                                onChange={func1}
                                style={{ position: 'absolute', color: '#F0EAD6', border: '2px solid darkgrey', top: '30vh', width: '40vw', left: '30vw', backgroundColor: '#ffffff4f' }}
                            />
                        )}
                    />

                    :

                    <TextField
                        variant="outlined"
                        type='text'
                        label="Search"
                        value={myTagSearch}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleSendQuestionTag();
                            }
                        }}
                        onChange={func1}
                        style={{ position: 'absolute', color: '#F0EAD6', border: '2px solid darkgrey', top: '30vh', width: '40vw', left: '30vw', backgroundColor: '#ffffff4f' }}
                    />}

                <Button
                    variant='contained'
                    style={toggleButtonStyle}
                    onClick={toggleColor}
                >
                    <span style={{
                        fontSize: '1.2rem',
                        position: 'relative',
                        top: '-0.5vh',
                    }}>
                    {searchByGivenTag == true ? "Search by default tags" : "Type in your input tag"}
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        position: 'absolute',
                        top: '4vh',
                    }}>
                    (Click to change input format)
                    </span>
                </Button>

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
