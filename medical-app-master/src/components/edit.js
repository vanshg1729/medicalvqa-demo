// Import React and other necessary libraries
import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import config from './config';
import DeleteIcon from '@mui/icons-material/Delete';

// Include the CSS styles here
import './edit.css'; // Include the path to your component's styles
import { Card, TextField, Typography } from '@mui/material';

const Edit = () => {

    const module = decodeURIComponent(window.location.href.split("/")[3])
    console.log(module, "module name");

    const [tagText, setTagText] = useState('');
    const [editTags, setEditTags] = useState(false); // if true, show textfield to edit tags
    // const [editId, setEditId] = useState(''); // id of the image whose tags are being edited
    const editId = useRef('');
    const [editingPair, setEditingPair] = useState(null);
    const [imageData, setImageData] = useState([
        // {
        //     id: 1,
        //     tags: [
        //         'First trimester',
        //         'Uterine Artery Doppler',
        //     ],
        //     path: 'uploads/image1.png',
        //     questions: [
        //         { id: 1, questionText: "First-trimester uterine artery evaluation- WHY at 11 + 0 to 13 + 6 weeks?", answerText: "This is a common time for first-trimester ultrasound examination in many countries to look for early signs of potential fetal abnormalities, and therefore practical in terms of logistics.\nEarlier assessment has not been studied extensively because trophoblast invasion is not yet sufficiently advanced as to be assessable.\n11-13+6 weeks is also an optimal period for risk assessment for preterm preeclampsia and fetal growth restriction and to initiate preventative therapy with low dose aspirin" },
        //         { id: 2, questionText: 'Why PI is more in TVS?', answerText: 'Close proximity to the probe. Angle of insonation is less.' },
        //         { id: 3, questionText: 'Bilateral Notching', answerText: 'Bilateral notching may be observed in around 50% of pregnant women at 11 + 0 to 13 + 6 weeks. This marker therefore has a very low specificity for PE.' },
        //         { id: 4, questionText: 'Factors Affecting Uterine Artery PI', answerText: 'Uterine artery PI may be affected by maternal factors, including ethnic origin (African origin is associated with increased PI), BMI (decreasing PI with increasing BMI) and previous PE (associated with increased PI).First trimester uterine artery PI should be expressed as multiples of the median (MoM) rather than absolute values.' },
        //         // Add more questionText-answerText questions as needed
        //     ],
        // },
        // {
        //     id: 2,
        //     tags: [
        //         'Frontal Bone',
        //         'Nasal Bone',
        //         'Callosal sulcus',
        //         'Corpus Callosum',
        //         'Cerebellum',
        //         'Parieto occipital sulcus',
        //         'Cisterna Magna',
        //         'Hard Palate',
        //         'Thalamus and Brainstem',
        //     ],

        //     path: 'uploads/image2.png',
        //     questions: [
        //         { id: 1, questionText: 'PERSISTENT RIGHT UMBILICAL VEIN', answerText: 'Relatively frequent: 1:500/1200.\nIt can be intra- or extrahepatic. The former is much commoner (about 95% of cases).' },
        //         { id: 2, questionText: 'Risk of chromosomal anomalies', answerText: 'When associated with other anomalies, an underlying chromosomal abnormalities in 8% of cases has been reported. Low, if isolated.' },
        //         { id: 3, questionText: 'Risk of nonchromosomal syndromes', answerText: 'Relatively high in cases of extrahepatic type of PRUV, which is commonly associated with other anomalies. Low, if isolated' },
        //         { id: 4, questionText: 'Prognosis, survival, and quality of life', answerText: 'When isolated and connected to the portal system, PRUV represents a normal anatomical variant.\nBad prognostic signs : Associated anomalies and abnormal draining (extrahepatic type of PRUV) into the fetal heart or IVC.\nPostnatal therapy-None is needed, if isolated.' },
        //         { id: 5, questionText: 'Ultrasound diagnosis', answerText: 'The US appearance is characteristic. US finding of PRUV is an indication for a targeted fetal sonography.\nUV curving to the left and toward the stomach, usually connecting to the right portal vein rather than to the left portal vein.\nThe gallbladder will be on the left of the UV (between the stomach and the UV)\nIt may bypass the liver and portal system (extrahepatic type) and may abnormally drain into the IVC or directly into the fetal heart.' },
        //         // Add more question-answer pairs as needed
        //     ],
        // },
    ]);
    // console.log(typeof(imageData), "imageData");
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
                setImageData(responseData['images']);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
          // Remove the "#" symbol from the hash
          const cleanedHash = hash.substring(1);
    
          // Add a delay before scrolling
          const delay = 100;
          setTimeout(() => {
            const element = document.getElementById(cleanedHash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, delay);
        }
      }, []); 

    const handleEdit = (pair) => {
        console.log(`Editing pair with id ${pair._id}`);
        setEditingPair(pair);
    };

    const handleEditChange = (newQuestion, num) => {
        if (num === 1) {
            setEditingPair((prevPair) => ({ ...prevPair, answerText: newQuestion }));
        } else {
            setEditingPair((prevPair) => ({ ...prevPair, questionText: newQuestion }));
        }
    };

    const handleDelete = (imageId, pairId) => {
        // Implement deletion functionality here
        console.log(`Deleting pair with id ${pairId} from image with id ${imageId}`);

        const updatedImageData = imageData.map((image) => {
            if (image.id == imageId) {
                const updatedQuestions = image.questions.filter((pair) => pair._id != pairId);
                return { ...image, questions: updatedQuestions };
            }
            return image;
        }
        );
        setImageData(updatedImageData);

        // now we delete the question in the backend
        const url = `${config.backendUrl}/api/question/delete/${pairId}`;
        const deleteQuestion = async () => {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData, "responseData");
            }
        }

        deleteQuestion();
        
    };

    const onSaveEdit = (imageId, pairId) => {
        // Implement saving edited question functionality here
        console.log(editingPair, "editingPair")
        const updatedImageData = imageData.map((image) => {
            if (image.id == imageId) {
                const updatedQuestions = image.questions.map((pair) => {
                    if (pair._id == pairId) {
                        return editingPair;
                    }
                    return pair;
                });
                return { ...image, questions: updatedQuestions };
            }
            return image;
        });

        // now we edit the question in the backend
        const url = `${config.backendUrl}/api/question/edit/${pairId}`;
        const editQuestion = async () => {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    questionText: editingPair.questionText,
                    answerText: editingPair.answerText,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData, "responseData");
            }
        }
        editQuestion();
        
        console.log(updatedImageData, "updatedImageData");

        console.log(
            `Saving edited question for pair with id ${pairId} in image with id ${imageId}: ${editingPair.questionText
            }`
        );

        setEditingPair(null); // Reset editing pair after saving
        setImageData(updatedImageData); // Update the state with the edited question
    };

    const addTag = (e) => {
        // Implement saving edited question functionality here
        const id = e.target.id;
        console.log(`Changing tags for image with id ${id}`);
        setEditTags(true);
        // setEditId(id);
        editId.current = id;

        setTagText('');
        console.log(`Changing tags to ${tagText}`);
    }

    const addTheTag = (id) => {
        setEditTags(false)
        console.log(`Saving tags for image with id ${id}`);

        console.log(`Adding tag ${tagText}`);
        
        // we change the tags of the image with id editId.current
        const updatedImageData = imageData.map((image) => {
            if (image.id == id) {
                const updatedTags = [...image.tags, tagText];
                return { ...image, tags: updatedTags };
            }
            return image;
        }
        );
        
        setImageData(updatedImageData);

        // now we add the tag in the backend by adding it to the image directly
        const func = async () => {
            const url = `${config.backendUrl}/api/image/${id}/addtag/${tagText}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData, "responseData");
            }
        }
        func();

        editId.current = '';


    }

    const deleteTag = (tag, id) => {
        // we remove the tag from the list first

        const updatedImageData = imageData.map((image) => {
            if (image.id == id) {
                const updatedTags = image.tags.filter((tag1) => tag1 != tag);
                return { ...image, tags: updatedTags };
            }
            return image;
        }
        );
        setImageData(updatedImageData);
        console.log(updatedImageData, "updatedImageData2222");

        // now we delete the tag in the backend
        const url = `${config.backendUrl}/api/tag/delete/${tag}`;
        const deleteTag = async () => {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData, "responseData");
            }
        }

        deleteTag();
    }

    const goToChatbotPage = (e, id) => {
        const categoryId = localStorage.getItem('module');
        console.log(categoryId, "categoryId");
        console.log(id, "id");
        console.log(e.target.src, "src");

        // we also have to store the image id in local storage
        localStorage.setItem('selectedImageId', id);
        localStorage.setItem('selectedImage', e.target.src);

        window.location.href = `/${module}/chatbot`;
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
            }}>
                Edit Questions, Answers and Tags
            </Typography>
            {/* now we write the module name below this */}
            <Typography variant="h2" gutterBottom style={{
                textAlign: 'center',
                color: '#fff5e1',
                fontFamily: 'Montserrat',
                fontSize: '4rem',
                fontWeight: 'bold',
            }}>
                Module: {module}
            </Typography>

            <div className="edit-container">
                {imageData.map((image, index) => (
                    <Card id={image.id + ';;;'} key={image.id} className="image-card" style={{
                        backgroundColor: '#f5f5f5d1',
                        margin: '4rem 3rem',
                        borderRadius: '2rem',
                    }}>
                        <div key={image.id} className="image-wrapper">
                            <div className="image-and-tags">
                                <div className="image">
                                    <img id={image.id} src={`${config.backendUrl}${image.path}`} onClick={(e) => goToChatbotPage(e, image.id)} alt="image" width={'700px'} height={'400px'} />
                                </div>
                                <div style={{ fontSize: '2rem', font: 'bold', fontFamily: 'Bebas Neue', marginTop: '3rem' }}>Tags</div>
                                <div className="tags-edit-page">
                                    {image.tags.map((tag) => (
                                        <span className="tag-edit">
                                            {tag}
                                            <button id={image.id} onClick={() => deleteTag(tag, image.id)} className='delete-button'><DeleteIcon size="small" style={{ verticalAlign: 'middle' }} /></button>
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
                                                display: editTags && editId.current == index ? 'block' : 'none',
                                                fontSize: '1.4rem',
                                            },
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => addTheTag(image.id)}
                                        style={{
                                            backgroundColor: 'rgb(113 90 90 / 88%)',
                                            margin: '1rem 0',
                                            paddingTop: '0.5rem',
                                            fontSize: '1.4rem',
                                            color: 'black',
                                            fontFamily: 'Bebas Neue',
                                            border: '2px solid black',
                                            width: '100px',
                                            display: editTags && editId.current == index ? 'block' : 'none',
                                        }}
                                    >
                                        Add Tag
                                    </Button>
                                </div>
                                <br />
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    // the id is the image id
                                    id={index}
                                    style={{
                                        backgroundColor: 'rgb(113 90 90 / 88%)',
                                        margin: '1rem 0',
                                        paddingTop: '0.5rem',
                                        fontSize: '1.5rem',
                                        color: 'black',
                                        fontFamily: 'Bebas Neue',
                                        border: '2px solid black',
                                        display: editTags && editId.current == index ? 'none' : 'block',
                                    }}
                                    onClick={addTag}
                                >
                                    Add Tag
                                </Button>
                            </div>
                            <div className="qa-pairs">
                                <div style={{ fontSize: '2rem', font: 'bold', fontFamily: 'Bebas Neue', minWidth: '50rem' }}>Question-Answer Pairs</div>';
                                {image.questions.map((pair) => (
                                    <div key={pair._id} className="qa-box">
                                        <div className="qa-content">
                                            <div className="qa-question">Q: {pair.questionText}</div>
                                            <div className="qa-answer">A: {pair.answerText}</div>
                                        </div>
                                        <div className="qa-buttons">
                                            {editingPair && editingPair._id === pair._id ? (
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
                                                            onClick={() => onSaveEdit(image.id, pair._id)}
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
                                                            onClick={() => handleDelete(image.id, pair._id)}
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
