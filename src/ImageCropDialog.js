import React, { useState } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./cropImage"

const aspectRatios = [
    {value:4/3, text:"4/3"},
    {value:16/9, text:"16/9"},
    {value:1/2, text:"1/2"},
]


const ImageCropDialog = ({
    id, 
    imageUrl, 
    cropInit, 
    zoomInit, 
    aspectInit,
    rotationInit,
    onCancel,
    setCroppedImageFor,
    resetImage
}) => {
    if(zoomInit == null){
        zoomInit = 1
    }
    if(cropInit == null){
        cropInit = {x:0, y:0}
    }
    if(aspectInit == null){
        aspectInit = aspectRatios[0]
    }
    if(rotationInit == null){
        rotationInit = 0
    }

    const [zoom, setZoom] = useState(zoomInit)
    const [crop, setCrop] = useState(cropInit)
    const [aspect, setAspect] = useState(aspectInit)
    const [rotation, setRotation] = useState(rotationInit)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const onAspectChange = (e) => {
        const value = e.target.value
        const ratio = aspectRatios.find((ratio) => ratio.value === value)
        setAspect(ratio)
    }

    const onRotationChange = (rotation) => {
        setRotation(rotation)
    }
    
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels, rotation)
        setCroppedImageFor(id, crop, zoom, aspect, rotation, croppedImageUrl)
    }

    const onResetImage = () => {
        resetImage(id)
    }

    return <div>
        <div className="backdrop"></div>
        <div className="crop-container">
            <Cropper 
                image={imageUrl} 
                zoom={zoom} 
                crop={crop} 
                aspect={aspect.value} 
                rotation={rotation}
                onCropChange={onCropChange} 
                onZoomChange={onZoomChange}
                onRotationChange={onRotationChange}
                onCropComplete={onCropComplete}
            />
        </div>
        <div className="controls">
            <div className="controls-upper-area">
                <label className="controls-label">Zoom</label>
                <input 
                    type="range" 
                    min={1} 
                    max={3} 
                    step={0.1} 
                    value={zoom} 
                    onInput={(e) => {
                        onZoomChange(e.target.value)
                    }}
                    className="slider controls-input"
                    />
                <label className="controls-label">Aspect</label>
                <select 
                onChange={onAspectChange} 
                defaultValue={{ label: "Aspect", value: 0 }}
                className="controls-input">
                    {
                        aspectRatios.map(
                            ratio=>(
                                <option 
                                    key={ratio.text}
                                    value={ratio.value}
                                    selected={ratio.value === aspect.value}> 
                                    {ratio.text}
                                </option>
                            )
                        )
                    }
                </select>
                <label className="controls-label">Rotate</label>
                <input 
                    type="range" 
                    min={0} 
                    max={360} 
                    step={1} 
                    value={rotation} 
                    onInput={(e) => {
                        onRotationChange(e.target.value)
                    }}
                    className="slider controls-input"
                    />
            </div>
            <div className="button-area">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onResetImage}>Reset</button>
                <button onClick={onCrop}>Crop</button>
            </div>
        </div>
    </div>
}

export default ImageCropDialog