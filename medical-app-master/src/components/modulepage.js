import React, { useEffect, useState } from 'react'
import Card from './cards'
import './homepage.css'
import { Grid } from '@mui/material'

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
      
    const [cards, setCards] = useState(
        [
            {
                id: 1,
                title: "Cardiology",
                content: "Cardiology is a branch of medicine that deals with the disorders of the heart as well as some parts of the circulatory system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease and electrophysiology."
            },
            {
                id: 2,
                title: "Dermatology",
                content: "Dermatology is the branch of medicine dealing with the skin. It is a specialty with both medical and surgical aspects. A dermatologist is a specialist doctor who manages skin diseases and deals with both internal and external causes and some cosmetic concerns involving the skin."
            },
            {
                id: 3,
                title: "Endocrinology",
                content: "Endocrinology is a branch of biology and medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones. It is also concerned with the integration of developmental events proliferation, growth, and differentiation, and the psychological or behavioral activities of metabolism and growth."
            },
            {
                id: 4,
                title: "Gastroenterology",
                content: "Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Diseases affecting the gastrointestinal tract, which include the organs from mouth into anus, along the alimentary canal, are the focus of this speciality."
            },
            {
                id: 5,
                title: "Cardiology",
                content: "Cardiology is a branch of medicine that deals with the disorders of the heart as well as some parts of the circulatory system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease and electrophysiology."
            },
            {
                id: 6,
                title: "Dermatology",
                content: "Dermatology is the branch of medicine dealing with the skin. It is a specialty with both medical and surgical aspects. A dermatologist is a specialist doctor who manages skin diseases and deals with both internal and external causes and some cosmetic concerns involving the skin."
            },
            {
                id: 7,
                title: "Endocrinology",
                content: "Endocrinology is a branch of biology and medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones. It is also concerned with the integration of developmental events proliferation, growth, and differentiation, and the psychological or behavioral activities of metabolism and growth."
            },
            {
                id: 8,
                title: "Gastroenterology",
                content: "Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Diseases affecting the gastrointestinal tract, which include the organs from mouth into anus, along the alimentary canal, are the focus of this speciality."
            },
            {
                id: 9,
                title: "Cardiology",
                content: "Cardiology is a branch of medicine that deals with the disorders of the heart as well as some parts of the circulatory system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease and electrophysiology."
            },
            {
                id: 10,
                title: "Dermatology",
                content: "Dermatology is the branch of medicine dealing with the skin. It is a specialty with both medical and surgical aspects. A dermatologist is a specialist doctor who manages skin diseases and deals with both internal and external causes and some cosmetic concerns involving the skin."
            },
            {
                id: 11,
                title: "Endocrinology",
                content: "Endocrinology is a branch of biology and medicine dealing with the endocrine system, its diseases, and its specific secretions known as hormones. It is also concerned with the integration of developmental events proliferation, growth, and differentiation, and the psychological or behavioral activities of metabolism and growth."
            },
            {
                id: 12,
                title: "Gastroenterology",
                content: "Gastroenterology is the branch of medicine focused on the digestive system and its disorders. Diseases affecting the gastrointestinal tract, which include the organs from mouth into anus, along the alimentary canal, are the focus of this speciality."
            },
        ]
    )

    return (
        <div style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
            <div className="heading">
                <div className="heading3">BayMax! your personalised healthcare companion</div>
                <div className="heading4">Choose the module you want to explore</div>
            </div>
            <div className="modules">
                <div className="card-container">
                    <Grid container spacing={3}>
                        {cards.map((card) => (
                            <Grid data-aos="fade-up" item xs={12} sm={6} md={4} lg={3}>
                                <Card key={card.id} title={card.title} content={card.content} />
                            </Grid>
                    ))}
                    </Grid>
                </div>
            </div>
        </div>
    )
}
