import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as styles from './style.module.css'
import { render } from 'katex';

class ImageCropper extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      zoom: 1.2
    }
  }

  onClickSave = (e) => {
    e.preventDefault()
    
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = this.editor.getImage()

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvasScaled = this.editor.getImageScaledToCanvas().toBlob((blob) => {
        // var newImg = document.createElement('img'),
      
        // newImg.onload = function() {
        //   // no longer need to read the blob so it's revoked
        //   URL.revokeObjectURL(url);
        // };
      
        // newImg.src = url;
        this.props.onSubmit(blob)
      })
      this.props.onCancel()
      this.props.onSubmit(canvasScaled)

    }
  }

  setEditorRef = (editor) => (this.editor = editor)

  render() {
    const {
      image,
      onSubmit,
      onCancel
    } = this.props

    return (
      <div className={styles.editor}>
        <h3>Edit image</h3>
        <AvatarEditor
          ref={this.setEditorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={this.state.zoom}
          rotate={0}
          className={styles.cropper}
        />
        <div className={styles.inputGroup}>
          <label className={styles.label}>Zoom:</label>
          <Slider 
            min={1}
            max={2}
            step={0.1}
            onChange={(val) => this.setState({zoom: val})}
          />
        </div>
        <div  className={styles.buttonGroup}>
          <button className={styles.button2} onClick={() => onCancel()}>Cancel</button>
          <button className={styles.button} onClick={(e) => this.onClickSave(e)}>Save image</button>
        </div>
      </div>
    )
  }

}

export default ImageCropper