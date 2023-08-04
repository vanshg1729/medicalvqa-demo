import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chatbot'
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

    const chatbotShowRef = useRef(false);

    useEffect(() => {

        const track = document.getElementById("image-track");

        const handleOnDown = e => {
            track.dataset.mouseDownAt = e.clientX;
            if (e.target.classList.contains("image")) {
                setSelectedImage(e.target.src)
                console.log(e.target.src, "here")
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

            // for (const image of track.getElementsByClassName("image")) {
            //     image.animate({
            //         objectPosition: `${100 + nextPercentage - 48}% center`
            //     }, { duration: 1200, fill: "forwards" });
            // }
        }

        function resetScrollPosition() {
            if (chatbotShow) return;
            window.scrollTo(0, originalScrollPos);
        }

        function preventScrolling(event) {
            if (event.deltaY === 0) return;
            if (!chatbotShowRef.current) {
                event.preventDefault();
                console.log(event.deltaY);
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

        // window.onload = () => {
        //     for (const image of track.getElementsByClassName("image")) {
        //         image.animate({
        //             objectPosition: `${100 - 48}% center`
        //         }, { duration: 1200, fill: "forwards" });
        //     }
        // }


    }, [])


    // const handleHover = (e) => {
    //     // Apply the transformation on hover
    //     console.log(e, "e")
    //     // e.transform = 'scale(1.1)'; // You can adjust the scaling factor to control the pop-out effect
    // };

    // const handleMouseLeave = (e) => {
    //     // Reset the transformation when the mouse leaves the image
    //     console.log(e, "e")
    //     // e.transform = 'scale(1)';
    // };

    return (
        // <Chat selectedImage={"/static/media/image1.09b4704f81318845d419.png"} />
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
                <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
                    <img className="image" src={image1} draggable="false" />
                    <img className="image" src={image2} draggable="false" />
                    <img className="image" src={image3} draggable="false" />
                    <img className="image" src={image4} draggable="false" />
                    <img className="image" src={image5} draggable="false" />
                    <img className="image" src={image6} draggable="false" />
                    <img className="image" src={image7} draggable="false" />
                    <img className="image" src={image8} draggable="false" />
                    <img className="image" src={image9} draggable="false" />
                </div>
            </div>
        </>
    )
}

export default Homepage
