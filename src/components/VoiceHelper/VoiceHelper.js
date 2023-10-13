import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { Model } from './Car'
import { Canvas, useThree } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import microIcon from './../../assets/icons/micro.svg'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Controls() {
    const {
      camera,
      gl: {domElement},
    } = useThree();
    return <OrbitControls args={[camera, domElement]} />;
  }

const VoiceHelper = () => {

    const [isVoiceRecording, setIsVoiceRecording] = useState(false)
    const [recordingIconClassName, setRecordingIconClassName] = useState(styles.icon + styles.iconHovered)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    

    const onMicroClickHandler = () => {
        if(isVoiceRecording){
            console.log('stop recording')
            SpeechRecognition.stopListening()
            setIsVoiceRecording(false)
            resetTranscript()
        }
        else{
            console.log('start recording')
            setIsVoiceRecording(true)
            SpeechRecognition.startListening({continuous: true, language: 'en'})
        }
    }

    useEffect(() => {
        let interval = null
        if(isVoiceRecording){
            interval = setInterval(() => {
                recordingIconClassName === (styles.icon + styles.iconHovered) ? 
                    setRecordingIconClassName(styles.icon) :
                    setRecordingIconClassName(styles.icon + styles.iconHovered)
            }, 0.5)
        }
        return () => interval
    }, [isVoiceRecording])

    return (
        <div className={styles.helperWindow}>
            <Canvas>
                <Controls/>
                <Float speed={1.4} rotationIntensity={1.5} floatIntensity={2.3}>
                    <Model />
                </Float>
            </Canvas>
            <div className={styles.microWrapper}>
                <img src={microIcon} className={styles.icon} onClick={onMicroClickHandler}/>
            </div>
        </div>
    )
}

export default VoiceHelper