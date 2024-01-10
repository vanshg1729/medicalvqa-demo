// Import React and other necessary libraries
import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import config from './config';

// Include the CSS styles here
import './edit.css'; // Include the path to your component's styles
import { Card, TextField, Typography } from '@mui/material';

const Edit = () => {

    const [tagText, setTagText] = useState('');
    const [editTags, setEditTags] = useState(false); // if true, show textfield to edit tags
    // const [editId, setEditId] = useState(''); // id of the image whose tags are being edited
    const editId = useRef('');
    const [editingPair, setEditingPair] = useState(null);
    const [imageData, setImageData] = useState([
        {
            id: 1,
            tags: [
                { id: 1, name: 'First trimester' },
                { id: 2, name: 'Uterine Artery Doppler' },
            ],
            path: 'uploads/image1.png',
            questions: [
                { id: 1, questionText: "First-trimester uterine artery evaluation- WHY at 11 + 0 to 13 + 6 weeks?", answerText: "This is a common time for first-trimester ultrasound examination in many countries to look for early signs of potential fetal abnormalities, and therefore practical in terms of logistics.\nEarlier assessment has not been studied extensively because trophoblast invasion is not yet sufficiently advanced as to be assessable.\n11-13+6 weeks is also an optimal period for risk assessment for preterm preeclampsia and fetal growth restriction and to initiate preventative therapy with low dose aspirin" },
                { id: 2, questionText: 'Why PI is more in TVS?', answerText: 'Close proximity to the probe. Angle of insonation is less.' },
                { id: 3, questionText: 'Bilateral Notching', answerText: 'Bilateral notching may be observed in around 50% of pregnant women at 11 + 0 to 13 + 6 weeks. This marker therefore has a very low specificity for PE.' },
                { id: 4, questionText: 'Factors Affecting Uterine Artery PI', answerText: 'Uterine artery PI may be affected by maternal factors, including ethnic origin (African origin is associated with increased PI), BMI (decreasing PI with increasing BMI) and previous PE (associated with increased PI).First trimester uterine artery PI should be expressed as multiples of the median (MoM) rather than absolute values.' },
                // Add more questionText-answerText questions as needed
            ],
        },
        {
            id: 2,
            tags: [
                { id: 1, name: 'Frontal Bone' },
                { id: 2, name: 'Nasal Bone' },
                { id: 3, name: 'Callosal sulcus' },
                { id: 4, name: 'Corpus Callosum' },
                { id: 5, name: 'Cerebellum' },
                { id: 6, name: 'Parieto occipital sulcus' },
                { id: 7, name: 'Cisterna Magna' },
                { id: 8, name: 'Hard Palate' },
                { id: 9, name: 'Thalamus and Brainstem' },
            ],

            path: 'uploads/image2.png',
            questions: [
                { id: 1, questionText: 'PERSISTENT RIGHT UMBILICAL VEIN', answerText: 'Relatively frequent: 1:500/1200.\nIt can be intra- or extrahepatic. The former is much commoner (about 95% of cases).' },
                { id: 2, questionText: 'Risk of chromosomal anomalies', answerText: 'When associated with other anomalies, an underlying chromosomal abnormalities in 8% of cases has been reported. Low, if isolated.' },
                { id: 3, questionText: 'Risk of nonchromosomal syndromes', answerText: 'Relatively high in cases of extrahepatic type of PRUV, which is commonly associated with other anomalies. Low, if isolated' },
                { id: 4, questionText: 'Prognosis, survival, and quality of life', answerText: 'When isolated and connected to the portal system, PRUV represents a normal anatomical variant.\nBad prognostic signs : Associated anomalies and abnormal draining (extrahepatic type of PRUV) into the fetal heart or IVC.\nPostnatal therapy-None is needed, if isolated.' },
                { id: 5, questionText: 'Ultrasound diagnosis', answerText: 'The US appearance is characteristic. US finding of PRUV is an indication for a targeted fetal sonography.\nUV curving to the left and toward the stomach, usually connecting to the right portal vein rather than to the left portal vein.\nThe gallbladder will be on the left of the UV (between the stomach and the UV)\nIt may bypass the liver and portal system (extrahepatic type) and may abnormally drain into the IVC or directly into the fetal heart.' },
                // Add more question-answer pairs as needed
            ],
        },
    ]);
    console.log(typeof(imageData), "imageData");
    useEffect(() => {
        const categoryId = localStorage.getItem('module');
        const url = `${config.backendUrl}/api/category/${categoryId}/images`;

        const fetchData = async () => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData, "responseData");
                console.log(imageData, "imageData");
                setImageData(responseData['images']);
            }
        }
        fetchData();
    }, []);

    const handleEdit = (pair) => {
        setEditingPair(pair);
    };

    const handleEditChange = (newQuestion, num) => {
        if (num === 1) {
            setEditingPair((prevPair) => ({ ...prevPair, answer: newQuestion }));
        } else {
            setEditingPair((prevPair) => ({ ...prevPair, question: newQuestion }));
        }
    };

    const handleDelete = (imageId, pairId) => {
        // Implement deletion functionality here
        console.log(`Deleting pair with id ${pairId} from image with id ${imageId}`);
    };

    const onSaveEdit = (imageId, pairId) => {
        // Implement saving edited question functionality here
        const updatedImageData = imageData.map((image) => {
            if (image.id === imageId) {
                const updatedPairs = image.questions.map((pair) =>
                    pair.id === pairId ? { ...pair, question: editingPair.questionText, answer: editingPair.answerText } : pair
                );
                return { ...image, pairs: updatedPairs };
            }
            return image;
        });

        console.log(
            `Saving edited question for pair with id ${pairId} in image with id ${imageId}: ${editingPair.questionText
            }`
        );

        setEditingPair(null); // Reset editing pair after saving
        setImageData(updatedImageData); // Update the state with the edited question
    };

    const changeTags = (e) => {
        // Implement saving edited question functionality here
        const id = e.target.id;
        console.log(`Changing tags for image with id ${id}`);
        setEditTags(true);
        // setEditId(id);
        editId.current = id;
        // comma separated values of tags in textfield
        const csv = imageData[id - 1].tags.map((tag) => tag.name).join(", ");

        console.log(csv, "csv");

        setTagText(csv);
        console.log(`Changing tags to ${tagText}`);
    }

    const saveTags = (e) => {
        setEditTags(false)
        console.log(`Saving tags for image with id ${editId.current}`);
        // we change the tags of the image with id editId.current
        const updatedImageData = imageData.map((image) => {
            if (image.id == editId.current) {
                const updatedTags = tagText.split(",").map((tag) => ({ id: 1, name: tag.trim() }));
                return { ...image, tags: updatedTags };
            }
            return image;
        });
        setImageData(updatedImageData);
        editId.current = '';
    }

    return (
        <>
            <Typography variant="h1" gutterBottom style={{
                textAlign: 'center',
                color: '#fff5e1',
                fontFamily: 'Montserrat',
                fontSize: '6rem',
                fontWeight: 'bold',
                marginTop: '5rem',
            }}>
                EDIT KREST DATA
            </Typography>
            <Typography variant="h2" gutterBottom style={{
                textAlign: 'center',
                color: '#fff5e1',
                fontFamily: 'Montserrat',
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '7rem',
            }}>
                Edit Questions, Answers and Tags
            </Typography>

            <div className="edit-container">
                {imageData.map((image) => (
                    <Card key={image.id} className="image-card" style={{
                        backgroundColor: '#f5f5f5d1',
                        margin: '5rem 3rem',
                        borderRadius: '2rem',
                    }}>
                        <div key={image.id} className="image-wrapper">
                            <div className="image-and-tags">
                                <div className="image">
                                    <img src={`${config.backendUrl}${image.path}`} alt="image" width={'700px'} height={'400px'} />
                                </div>
                                <div style={{ fontSize: '2rem', font: 'bold', fontFamily: 'Bebas Neue', marginTop: '3rem' }}>Tags</div>
                                <div className="tags-edit-page">
                                    {image.tags.map((tag) => console.log(tag, "hdfhaskdflkh") && (
                                        <span key={tag.id} className="tag-edit">
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                {/* // we can add a textfield here to edit tags, which will be shown when editTags is true, and also when displayed the inner text will be the tags of the image in a comma separated format */}
                                <div className="edit-input">
                                    <TextField
                                        type="text"
                                        value={tagText}
                                        onChange={(e) => setTagText(e.target.value)}

                                        InputProps={{
                                            style: {
                                                color: 'black',
                                                display: editTags && editId.current == image.id ? 'block' : 'none',
                                                fontSize: '1.4rem',
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={saveTags}
                                        style={{
                                            backgroundColor: 'rgb(113 90 90 / 88%)',
                                            margin: '1rem 0',
                                            paddingTop: '0.5rem',
                                            fontSize: '1.4rem',
                                            color: 'black',
                                            fontFamily: 'Bebas Neue',
                                            border: '2px solid black',
                                            width: '100px',
                                            display: editTags && editId.current == image.id ? 'block' : 'none',
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                                <br />
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    // the id is the image id
                                    id={image.id}
                                    style={{
                                        backgroundColor: 'rgb(113 90 90 / 88%)',
                                        margin: '1rem 0',
                                        paddingTop: '0.5rem',
                                        fontSize: '1.5rem',
                                        color: 'black',
                                        fontFamily: 'Bebas Neue',
                                        border: '2px solid black',
                                        display: editTags && editId.current == image.id ? 'none' : 'block',
                                    }}
                                    onClick={changeTags}
                                >
                                    Edit Tags
                                </Button>
                            </div>
                            <div className="qa-pairs">
                                <div style={{ fontSize: '2rem', font: 'bold', fontFamily: 'Bebas Neue' }}>Question-Answer Pairs</div>';
                                {image.questions.map((pair) => (
                                    <div key={pair.id} className="qa-box">
                                        <div className="qa-content">
                                            <div className="qa-question">Q: {pair.questionText}</div>
                                            <div className="qa-answer">A: {pair.answerText}</div>
                                        </div>
                                        <div className="qa-buttons">
                                            {editingPair && editingPair.id === pair.id ? (
                                                <div className="edit">
                                                    <div className="edit-input">
                                                        <TextField
                                                            type="text"
                                                            value={editingPair.questionText}
                                                            onChange={(e) => handleEditChange(e.target.value, 0)}
                                                            InputProps={{
                                                                style: {
                                                                    color: 'black',
                                                                    width: '400px',
                                                                    height: 'auto',
                                                                },
                                                            }}
                                                        />
                                                        <TextField
                                                            type="text"
                                                            value={editingPair.answerText}
                                                            onChange={(e) => handleEditChange(e.target.value, 1)}
                                                            InputProps={{
                                                                style: {
                                                                    color: 'black',
                                                                    width: '400px',
                                                                    height: 'auto',
                                                                },
                                                            }}
                                                        />
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => onSaveEdit(image.id, pair.id)}
                                                            style={{
                                                                backgroundColor: 'rgb(113 90 90 / 88%)',
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="edit">
                                                    <div className="edit-input">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="primary"
                                                            onClick={() => handleEdit(pair)}
                                                            style={{
                                                                textAlign: 'center',
                                                                verticalAlign: 'middle',
                                                                backgroundColor: 'rgb(113 90 90 / 88%)',
                                                                // border: '1px solid black',
                                                            }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="secondary"
                                                            onClick={() => handleDelete(image.id, pair.id)}
                                                            style={{
                                                                textAlign: 'center',
                                                                verticalAlign: 'middle',
                                                                backgroundColor: '#534c4c',
                                                                // border: '1px solid black',
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default Edit;
