import React, { useEffect, useRef, useState } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

import config from './config';
import subpath from './subpath';
// import data from './data.json';
import Breadcrumbs from './breadcrumbs';

import './CustomModal.css';
import './homepage.css'

const Homepage = ({ selectedImage }) => {

    const navigate = useNavigate();

    const module = decodeURIComponent(window.location.href.split("/")[4])
    console.log(module, "module")
    const imgImportList = []
    const imgIDImportList = []
    // for (let i = 0; i < data.images.length; i++) { // we left the first image to just test it out
    //     // importing images inside the images folder
    //     const imagePath = data.images[i].image

    //     // Import the image using the dynamic import syntax
    //     // console.log(img, "img.default")
    //     imgImportList.push(imagePath)
    //     imgIDImportList.push((i + 1).toString()) // TODO CHANGE THIS LATER
    // }
    const [displayImage, setDisplayImage] = useState([])
    const [displayImageId, setDisplayImageId] = useState([])

    const [searchByGivenTag, setSearchByGivenTag] = useState(true)
    const [myTagSearch, setMyTagSearch] = useState("")
    const [loading, setLoading] = useState(false);

    const arr1 = useRef([]);
    const arr2 = useRef([]);
    const arr3 = useRef([]); // this is a list of lists, which has the tags of each image, where images are in the same order as in arr1 (in a list)
    const tags = useRef([]);
    // const correspondingImageToTheTags = useRef([]);

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
                console.log(responseData, "responseData");
                tags.current = responseData.map(obj => obj.name);
                // correspondingImageToTheTags.current = responseData.map(obj => obj.images);
                console.log(tags, "tags");
            }
        }
        getTheTags();


        const getImages = async () => {

            const token = localStorage.getItem('token');
            const moduleId = localStorage.getItem('module');
            const url = `${config.backendUrl}/api/category/` + moduleId + '/images';

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const res = await response.json();
            if (response.ok) {
                const receivedImages = res.images;
                if (receivedImages.length != 0) {
                    const len = receivedImages.length;
                    const newImages = []
                    const newImageIDS = []
                    for (let i = 0; i < len; i++) {
                        const thePath = receivedImages[i].path
                        const splitArr = thePath.split("/")
                        const newImagePath = splitArr.slice(1, splitArr.length).join("/")
                        newImages.push(newImagePath)
                        // console.log(receivedImages[i], "checking the id")
                        newImageIDS.push(receivedImages[i].id)
                    }
                    newImages.reverse() // so that the latest images are shown first
                    newImageIDS.reverse()
                    setDisplayImage([...newImages, ...displayImage])
                    setDisplayImageId([...newImageIDS, ...displayImageId])
                    arr1.current = [...newImages, ...displayImage]
                    arr2.current = [...newImageIDS, ...displayImageId]
                    const newArr = []
                    for (let i = 0; i < len; i++) {
                        const theTags = receivedImages[i].tags
                        newArr.push(theTags)
                    }
                    newArr.reverse()
                    arr3.current = [...newArr]
                    console.log(arr1.current, "arr1")
                    console.log(arr3.current, "arr3")
                    // console.log("New image ids", newImageIDS)
                    // console.log("Old image ids", displayImageId)
                }

                // now we add these images to the displayImage array
            } else {
                console.log(res.error, "erriefhha");
            }
        }

        getImages();

        const track = document.getElementById("image-track");

        const handleOnDown = (e) => {
            track.dataset.mouseDownAt = e.clientX;
            if (e.target.classList.contains("image")) {
                // setSelectedImage(e.target.src)
                selectedImage.current = e.target.src;
                console.log(e.target.src, "here1111111111111")
                localStorage.setItem('selectedImage', e.target.src);
                console.log(e.target.id, "here")
                localStorage.setItem('selectedImageId', arr2.current[e.target.id]);
                // window.location.href = '/module/chatbot';
                // /${module}/chatbot`, { selectedImage: selectedImage.current });
                console.log(`/${module}/chatbot`, "here")
                navigate(`/${module}/chatbot`, { selectedImage: selectedImage.current });
                // console.log(selectedImage.current, "niceto")
                // console.log(e.target.src, "here")
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
        console.log(selectedTags, "selectedTags")
        if (selectedTags.length === 0 && myTagSearch == "") {
            setDisplayImage(arr1.current)
            if (searchByGivenTag == true)
                alert("Please select a tag")
            else
                alert("Please enter a tag")
        }
        else {
            setLoading(true);
            if (searchByGivenTag == true) {
                selectedTags.filter((item, index) => selectedTags.indexOf(item) === index)
                // // setTimeout(() => {
                let newDisplayImage = []

                // we have the images and their corresponding tags when we get the images data from the backend
                console.log(arr1.current, "arr1")

                for (let i = 0; i < arr3.current.length; i++) {
                    let check = 0
                    for (let j = 0; j < arr3.current[i].length; j++) {
                        for (let k = 0; k < selectedTags.length; k++) {
                            if ((arr3.current[i][j].includes(selectedTags[k]))) {
                                check = 1
                            }
                        }
                    }
                    if (check === 1) {
                        newDisplayImage.push(arr1.current[i])
                    }
                }
                // console.log(newDisplayImage, "newDisplayImage")
                setDisplayImage(newDisplayImage)
            }
            else {
                console.log("Request being sent")
                const url = `${config.backendUrl}/api/flask/get_similar_tags`
                console.log(`homepage.js: Sending request to ${url}`)
                // we get the 3 topmost similar tags, and then show all the images that are tagged with those tags
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ input_tag: myTagSearch, all_tags: tags.current, token: localStorage.getItem('token'), selectedImageId: localStorage.getItem('selectedImageId') }),
                });
                console.log("response recieved");
                if (response.ok) {
                    console.log("Response is OK");
                    const recievedData = await response.json();
                    console.log(recievedData, "the data recieved from fetch")

                    const top5Tags = recievedData.top_tags
                    console.log(top5Tags, "top5Tags")

                    let newDisplayImage = []
                    for (let i = 0; i < arr3.current.length; i++) {
                        let check = 0
                        for (let j = 0; j < arr3.current[i].length; j++) {
                            for (let k = 0; k < top5Tags.length; k++) {
                                if ((arr3.current[i][j].includes(top5Tags[k]))) {
                                    check = 1
                                }
                            }
                        }
                        if (check === 1) {
                            newDisplayImage.push(arr1.current[i])
                        }
                    }
                    console.log(newDisplayImage, "newDisplayImage")

                    // console.log(newDisplayImage)

                    setDisplayImage(newDisplayImage)

                    // TODO NOTE: We are searching from all the tags right now, which is wrong, we should only be using the module/category tags
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
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }

    const toggleButtonStyle2 = {
        position: 'absolute',
        top: '29.5vh',
        left: '90vw',
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
        zIndex: '10000',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }

    const func1 = (event) => {
        // console.log(event.target.value, "here")
        setMyTagSearch(event.target.value)
    }

    const toggleColor = () => {
        const store = !searchByGivenTag
        setSearchByGivenTag(store)
        setMyTagSearch("")
    }

    const [showModal, setShowModal] = useState(false);
    const [imgPath, setImagePath] = useState('');
    const [imgId, setImageId] = useState('');
    const [addTags, setAddTags] = useState('');


    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        // setShowModal(false);
        setShowModal(false);
        setImagePath('');
        setImageId('');
        setAddTags('');
    }

    const handleAddImageTags = () => {
        // Add your logic to handle the module data

        console.log('Adding image:', { name: imgPath, description: addTags });

        const theTags = addTags.split(",").map((item) => item.trim())
        console.log(theTags, "theTags")

        // adding the module to the database
        const addImage = async () => {

            const token = localStorage.getItem('token');

            // const response = await fetch(url, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`,
            //     },
            //     body: JSON.stringify({
            //         path: imgPath
            //     }),
            // })
            // const res = await response.json();
            // if (response.ok) {

            // now we add this image to the displayImage array
            // one example of imgPath is uploads/Screenshot from 2023-12-13 01-00-57.png
            // taking all the stuff other than the uploads/ part
            const splitArr = imgPath.split("/")
            const newImagePath = splitArr.slice(1, splitArr.length).join("/")
            let newImage = newImagePath; // for now lets do something else
            setDisplayImage([newImage, ...displayImage])


            // first we add the image to the module
            const moduleId = localStorage.getItem('module');
            // this is the url at which we have to POST: router.post('/:categoryId/addimage/:imageId', requireAuth, addImageToCategory)

            const url2 = `${config.backendUrl}/api/category/${moduleId}/addimage/${imgId}`;
            const response2 = await fetch(url2, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const res2 = await response2.json();
            console.log(response2, "res2");
            if (response2.ok) {
                console.log(res2, "result222222222");


                // now we add the tags to the image

                for (let i = 0; i < theTags.length; i++) {
                    const url3 = `${config.backendUrl}/api/image/${imgId}/addtag/${theTags[i]}`;
                    const response3 = await fetch(url3, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    })
                    const res3 = await response3.json();
                    console.log(response3, "res3");
                    if (response3.ok) {
                        console.log(res3, "result333333333");
                    } else {
                        console.log(res3.error, "3333333333");
                    }
                }


            } else {
                console.log(res2.error, "2222222222");
            }

            //     } else {
            //         console.log(res.error, "erriefhha");
            //     }
        }

        addImage();

        // Close the modal and reset form fields
        handleClose();
        setImagePath('');
        setImageId('');
        setAddTags('');

    };

    // const handleImageUpload = async (e) => {
    //     const file = e.target.files[0];

    //     if (file) {
    //         const formData = new FormData();
    //         formData.append('image', file);

    //         try {
    //             const response = await axios.post('http://localhost:5000/upload', formData);
    //             setImagePath(response.data.imagePath);
    //         } catch (error) {
    //             console.error('Error uploading image:', error);
    //         }
    //     }
    // };


    const onDrop = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        const url = `${config.backendUrl}/api/image/upload`
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: formData,
            })
            const res = await response.json();
            console.log(res, "jshdkladfhkjhfres");
            setImagePath(res.path);
            setImageId(res._id);

            arr2.current = [res._id, ...arr2.current]


        } catch (error) {
            console.error('Error uploading image:', error);
        }

    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const dropzoneStyle = {
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        width: '70%',
    };


    return (
        <>
            <Breadcrumbs />
            {/* {console.log(selectedImage.current, "hellownice")} */}
            <div style={{
                fontFamily: '"Bebas Neue", sans-serif',
                transition: 'opacity 1s ease-in-out',
            }}>
                <div className="heading">
                    <div className="heading1">KREST</div>
                    <div className="heading2">Ask questions corresponding to images</div>
                </div>

                {searchByGivenTag == true ?
                    <Autocomplete
                        multiple
                        id="tag-select"
                        options={tags.current}
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
                                <img key={index} id={index} className="image" src={`${config.backendUrl}/api/${image}`} alt="Uploaded" draggable="false" />
                            )
                        }
                        )
                    }
                </div>




                <Button
                    variant='contained'
                    style={toggleButtonStyle2}
                    onClick={handleShow}
                // onClick={() => setModalOpen(true)}
                >
                    <span style={{
                        fontSize: '1.5rem',
                        position: 'relative',
                        // top: '-0.5vh',
                    }}>
                        Add Image
                    </span>
                </Button>
                {/* <CustomModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        onAddModule={handleAddImageTags}
                    /> */}
                <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100000, color: '#F0EAD6', letterSpacing: '0.1rem' }}>
                    <Modal.Dialog style={{ width: '50%', background: 'none', height: '50%' }}>
                        <Modal.Header closeButton onHide={handleClose} >
                            <h1>Add Image</h1>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="imgUpload">
                                    <h2>Upload Image:</h2>
                                    <div {...getRootProps()} style={dropzoneStyle}>
                                        <input {...getInputProps()} />
                                        <p>Drag & drop an image here, or click to select one</p>
                                    </div>
                                    {imgPath && (
                                        <img
                                            src={`${config.backendUrl}api/${imgPath}`}
                                            alt="Uploaded"
                                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                                        />
                                    )}
                                </Form.Group>
                                <Form.Group controlId="addTags">
                                    <h2>List of tags (Comma separated):</h2>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        style={{ width: '75%', fontSize: '1rem' }}
                                        value={addTags}
                                        onChange={(e) => setAddTags(e.target.value)}
                                    />
                                </Form.Group>
                            </Form>

                        </Modal.Body>

                        <Modal.Footer style={{
                            margin: '20px 0px',
                        }}>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleAddImageTags}>
                                Add Image
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>



            </div>
        </>
    )
}

export default Homepage
