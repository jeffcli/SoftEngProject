// import React, { useState} from "react";
import styles from "./Login.module.css";
import heroImage from "../assets/HeroPhotos/heroImage.png";
import mapImage from "../assets/mapImage.png";
import Button from "@mui/material/Button";
// import bwhLogo from "../assets/bwh-logo.svg";
import {useNavigate} from "react-router-dom";
import {Interests} from "@mui/icons-material";




const Login: React.FC = () => {
    const navigate = useNavigate();
    const navigateMap = () => {
        navigate("/floor-map");
    };


    return (

        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={heroImage} alt="Covering 3/4 page" className={styles.coverImage}/>
                <div className={styles.textOverlay}>
                    <p className={styles.disclaimer}>This website is a term project exercise for WPI CS 3733 Software
                        Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s
                        Hospital website</p>
                </div>
            </div>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>Brigham and Women's Hospital</h1>
                <br/>
            <br/>
                <br/>
                <p className={styles.heading2}>Helping our patients and their families get back to what matter most</p>
                <br/>
                <br/>
                <br/>
                <br/>

                <Button className={styles.position} onClick={navigateMap} color="primary" style={{
                    backgroundImage: `url(${mapImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '200px', // Adjust button width as needed
                    height: '200px', // Adjust button height as needed

                }}
                >
                <span style={{color: 'black', fontSize: '18px', fontStyle: Interests, marginTop: '150px'}}>
                View Map</span>
                </Button>
            </div>
        </div>
);
};


export default Login;
