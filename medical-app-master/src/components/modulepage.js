import React, { useEffect, useState } from 'react'
import { Modal, Form } from 'react-bootstrap';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import Card from './cards'
import './homepage.css'
import './CustomModal.css'
import { Grid } from '@mui/material'
import Breadcrumbs from './breadcrumbs'
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

    const [cards, setCards] = useState(
        [
            // {
            //     id: 1,
            //     title: "Early Pregnancy",
            //     content: "Early pregnancy, spanning the first 12 weeks, starts with fertilization. During this time, key organs develop, and common symptoms like fatigue and nausea may occur. Timely prenatal care and a healthy lifestyle are important for the well-being of both the mother and the fetus."
            // },
            {
                id: 2,
                title: "First Trimester",
                content: "The first trimester of pregnancy lasts about 12 weeks and begins with fertilization. Key organs develop, and common symptoms include fatigue and nausea. Timely prenatal care and a healthy lifestyle are crucial for the well-being of both the mother and the fetus."
            },
            {
                id: 3,
                title: "Second Trimester",
                content: "In the second trimester (weeks 13-26), women often feel more comfortable as early symptoms subside. Fetal movements become noticeable, and it's a generally smoother period. Prenatal care remains essential for a healthy pregnancy."
            },
            {
                id: 4,
                title: "Third Trimester",
                content: "The third trimester, weeks 27 to 40, marks the final stretch of pregnancy. As the baby grows, discomfort may return, and the mother may experience new symptoms. Monitoring fetal movement becomes crucial. Regular prenatal check-ups are vital during this phase to ensure a healthy pregnancy and prepare for childbirth."
            },
            {
                id: 5,
                title: "Fetal Doppler",
                content: "A fetal Doppler is a handheld device used in pregnancy to listen to the baby's heartbeat. It's commonly used in the second and third trimesters, providing reassurance for parents. Consulting healthcare professionals for guidance is recommended."
            },
            {
                id: 6,
                title: "Heart",
                content: "The heart is a vital organ that pumps blood throughout the body, supplying oxygen and nutrients. In the context of pregnancy, monitoring the baby's heartbeat is crucial. This is often done using a fetal Doppler in later trimesters. Regular heart check-ups for both the mother and the developing baby are essential for a healthy pregnancy."
            },
            {
                id: 7,
                title: "Gastrointestinal",
                content: "The gastrointestinal (GI) system is the digestive system, including the stomach and intestines. Common issues include acid reflux and irritable bowel syndrome. Lifestyle and diet affect GI health. If persistent symptoms like stomach pain arise, seeking medical advice is important."
            },
            {
                id: 8,
                title: "Renal",
                content: "The renal system involves the kidneys and urinary system. Kidney issues, like kidney stones or infections, are common. Hydration and a balanced diet support renal health. Persistent symptoms like pain during urination warrant medical attention."
            },
            {
                id: 9,
                title: "Brain",
                content: "The brain is the central organ of the nervous system. It controls thoughts, movements, and vital functions. Brain health is influenced by lifestyle and genetics. Mental health is essential, and symptoms like persistent headaches or changes in cognition should be addressed with medical advice."
            },
            {
                id: 10,
                title: "Skeletal System",
                content: "The skeletal system includes bones and joints, providing structure and support. Bone health is influenced by diet and exercise. Maintaining a balanced lifestyle is crucial. Persistent issues like joint pain require medical attention."
            },
        ]
    )

    useEffect(() => {
        const url = 'http://localhost:5000/api/category/';
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
                    return {
                        id: card.id,
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
        position: 'absolute',
        top: '23.5vh',
        left: '86vw',
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

            const url = 'http://localhost:5000/api/category/create';
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
                    <div className="heading4">Choose the module you want to explore</div>
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

                            <Modal.Footer>
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
                                    <Card key={card.id} title={card.title} content={card.content} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    )
}
