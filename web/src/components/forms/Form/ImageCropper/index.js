import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as styles from './style.module.css'

const ImageCropper = ({ image, onSubmit, onCancel }) => {

  const editorRef = useRef(null)
  const [currentZoom, setCurrentZoom] = useState(1.2)

  const onClickSave = (e) => {
    e.preventDefault()
    if (editorRef) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editorRef.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = editorRef.getImageScaledToCanvas()

      onSubmit(canvasScaled)
    }
  }

  return (
    <div className={styles.editor}>
      <h3>Edit image</h3>
      <AvatarEditor
        ref={editorRef}
        image={image}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={currentZoom}
        rotate={0}
        className={styles.cropper}
      />
      <div className={styles.inputGroup}>
        <label className={styles.label}>Zoom:</label>
        <Slider 
          min={1}
          max={2}
          step={0.1}
          onChange={(val) => setCurrentZoom(val)}
        />
      </div>
      <div  className={styles.buttonGroup}>
        <button className={styles.button2} onClick={() => onCancel()}>Cancel</button>
        <button className={styles.button} onClick={(e) => onClickSave(e)}>Save image</button>
      </div>
    </div>
  )
}

export default ImageCropper