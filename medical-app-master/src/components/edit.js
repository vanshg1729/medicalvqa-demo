// Import React and other necessary libraries
import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';

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
            name: 'Image 1',
            tags: [
                { id: 1, name: 'Tag 1' },
                { id: 2, name: 'Tag 2' },
                { id: 3, name: 'Tag 3' },
                { id: 4, name: 'Tag 4' },
                { id: 5, name: 'Tag 5' },
                { id: 6, name: 'Tag 6' },
                { id: 7, name: 'Tag 7' },
                { id: 8, name: 'Tag 8' },
                { id: 9, name: 'Tag 9' },
            ],
            url: 'http://localhost:5001/uploads/Screenshot%20from%202023-12-31%2016-11-00.png',
            pairs: [
                { id: 1, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 2, question: '222nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 3, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 4, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 5, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 6, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                // Add more question-answer pairs as needed
            ],
        },
        {
            id: 2,
            name: 'Image 2',
            tags: [
                { id: 1, name: 'Tag 1' },
                { id: 2, name: 'Tag 2' },
                { id: 3, name: 'Tag 3' },
                { id: 4, name: 'Tag 4' },
                { id: 5, name: 'Tag 5' },
                { id: 6, name: 'Tag 6' },
                { id: 7, name: 'Tag 7' },
                { id: 8, name: 'Tag 8' },
                { id: 9, name: 'Tag 9' },
            ],

            url: 'http://localhost:5001/uploads/Screenshot%20from%202023-12-31%2016-11-00.png',
            pairs: [
                { id: 1, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 2, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 3, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 4, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                // Add more question-answer pairs as needed
            ],
        },
        {
            id: 3,
            name: 'Image 2',
            tags: [
                { id: 1, name: 'Tag 1' },
                { id: 2, name: 'Tag 2' },
                { id: 3, name: 'Tag 3' },
            ],
            url: 'http://localhost:5001/uploads/Screenshot%20from%202023-12-31%2016-11-00.png',
            pairs: [
                { id: 1, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 2, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 3, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                { id: 4, question: 'nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you nice to meet you, how are you ?', answer: 'It is a test image.' },
                // Add more question-answer pairs as needed
            ],
        },
        // Add more images as needed
    ]);

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
                const updatedPairs = image.pairs.map((pair) =>
                    pair.id === pairId ? { ...pair, question: editingPair.question, answer: editingPair.answer } : pair
                );
                return { ...image, pairs: updatedPairs };
            }
            return image;
        });

        console.log(
            `Saving edited question for pair with id ${pairId} in image with id ${imageId}: ${editingPair.question
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
                EDIT PAGE
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
                                    <img src={image.url} alt={image.name} width={'700px'} />
                                </div>
                                <div style={{ fontSize: '2rem', font: 'bold', fontFamily: 'Bebas Neue', marginTop: '3rem' }}>Tags</div>
                                <div className="tags-edit-page">
                                    {image.tags.map((tag) => (
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
                                {image.pairs.map((pair) => (
                                    <div key={pair.id} className="qa-box">
                                        <div className="qa-content">
                                            <div className="qa-question">Q: {pair.question}</div>
                                            <div className="qa-answer">A: {pair.answer}</div>
                                        </div>
                                        <div className="qa-buttons">
                                            {editingPair && editingPair.id === pair.id ? (
                                                <div className="edit">
                                                    <div className="edit-input">
                                                        <TextField
                                                            type="text"
                                                            value={editingPair.question}
                                                            onChange={(e) => handleEditChange(e.target.value, 0)}
                                                            InputProps={{
                                                                style: {
                                                                    color: 'black',
                                                                    height: '40px',
                                                                    width: '400px',
                                                                },
                                                            }}
                                                        />
                                                        <TextField
                                                            type="text"
                                                            value={editingPair.answer}
                                                            onChange={(e) => handleEditChange(e.target.value, 1)}
                                                            InputProps={{
                                                                style: {
                                                                    color: 'black',
                                                                    height: '40px',
                                                                    width: '400px',
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
