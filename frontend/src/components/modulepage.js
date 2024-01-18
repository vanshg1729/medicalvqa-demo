import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Card from './cards'
import './homepage.css'
import './CustomModal.css'
import { Grid } from '@mui/material'
import Breadcrumbs from './breadcrumbs'
import config from './config';
// import CustomModal from './customModal'

import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles

export default function Modulepage() {

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animations should only happen once
            mirror: false, // Whether elements should animate out while scrolling up
        });
    }, []);

    // const [isModalOpen, setModalOpen] = useState(false);
    // const handleAddModule = (moduleData) => {
    //     console.log('Adding module:', moduleData);
    //     setModalOpen(false);
    //   };

    const [cards, setCards] = useState([])

    useEffect(() => {
        const url = `${config.backendUrl}/api/category/`;
        const token = localStorage.getItem('token');

        const getCategories = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            const res = await response.json();
            console.log(res, "res");
            if (response.status === 200) {
                console.log(res, "res");

                const newCards = res.map((card) => {
                    console.log("cardid", card._id)
                    return {
                        id: card._id,
                        title: card.name,
                        content: card.text,
                    }
                })
                setCards([...cards, ...newCards]);

                console.log(cards, "cards");
                console.log(...newCards, "newCards");
                console.log([...cards, ...newCards], "cards, newCards")

                cards.map((card) => {
                    console.log(card, "card");
                }
                )

            } else {
                console.log(res.error);
            }
        }
        getCategories();
    }
        , [])

    const toggleButtonStyle = {
        position: 'relative',
        // top: '1.5vh',
        // margin: '0vh 0vw 0vh 0vw',
        left: '5vw',
        color: '#F0EAD6',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // display: 'flex',
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
    }

    const [showModal, setShowModal] = useState(false);
    const [moduleName, setModuleName] = useState('');
    const [moduleDescription, setModuleDescription] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        // setShowModal(false);
        setShowModal(false);
        setModuleName('');
        setModuleDescription('');
    }

    const handleAddModule = () => {
        // Add your logic to handle the module data
        console.log('Adding module:', { name: moduleName, description: moduleDescription });

        // Close the modal and reset form fields
        handleClose();
        setModuleName('');
        setModuleDescription('');

        // adding the module to the database
        const addModule = async () => {

            const url = `${config.backendUrl}/api/category/create`;
            const token = localStorage.getItem('token');

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: moduleName,
                    text: moduleDescription,
                }),
            })
            const res = await response.json();
            console.log(response, "res");
            if (response.ok) {
                console.log(res, "resultsnfsdfn");

                const newCard = {
                    id: res._id,
                    title: res.name,
                    content: res.text
                }

                setCards([...cards, newCard])

            } else {
                console.log(res.error, "erriefhha");
            }
        }

        addModule();

    };


    return (
        <>
            <Breadcrumbs />
            <div style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                <div className="heading">
                    <div className="heading3">KREST Fetal Radiology Image Bank for Personalized Learning</div>
                    <div className='heading-button-align'>
                        <div className="heading4">Choose the module you want to explore</div>
                        <div>
                            <Button
                                variant='contained'
                                style={toggleButtonStyle}
                                onClick={handleShow}
                            // onClick={() => setModalOpen(true)}
                            >
                                <span style={{
                                    fontSize: '1.5rem',
                                    position: 'relative',
                                    // top: '-0.5vh',
                                }}>
                                    Add Module
                                </span>
                            </Button>
                        </div>
                    </div>
                    {/* <CustomModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setModalOpen(false)}
                        onAddModule={handleAddModule}
                    /> */}
                    <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100000, letterSpacing: '0.1rem' }}>
                        <Modal.Dialog style={{ width: '50%', background: 'none', height: '50%' }}>
                            <Modal.Header closeButton onHide={handleClose} >
                                <h1>Add Module</h1>
                            </Modal.Header>

                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="moduleName">
                                        <h2>Module Name:</h2>
                                        <Form.Control
                                            type="text"
                                            value={moduleName}
                                            onChange={(e) => setModuleName(e.target.value)}
                                            style={
                                                {
                                                    width: '75%',
                                                    height: '5vh',
                                                    fontSize: '1.5rem',
                                                }
                                            }
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="moduleDescription">
                                        <h2>Module Description:</h2>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            style={{ width: '75%', fontSize: '1rem' }} // Set the width here
                                            value={moduleDescription}
                                            onChange={(e) => setModuleDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer style={{
                                margin: '2vh 0vh',
                            }}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleAddModule}>
                                    Add Module
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>

                </div>
                <div className="modules">
                    <div className="card-container">
                        <Grid container spacing={3}>
                            {cards.map((card) => (
                                <Grid key={card.id * 100} data-aos="fade-up" item xs={12} sm={6} md={4} lg={3}>
                                    {console.log(card, "carhalfdhkd")}
                                    <Card key={card.id} id={card.id} title={card.title} content={card.content} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}
