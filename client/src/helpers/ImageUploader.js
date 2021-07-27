import React from 'react' 
import axios from 'axios'
import Form from 'react-bootstrap/Form'

const uploadURL = process.env.REACT_APP_CLOUDINARY_URL
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET

export const ImageUploadField = ({ handleImageUrl, value }) => {

  const handleUpload = async (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const res = await axios.post(uploadURL, data)
    handleImageUrl(res.data.url)
    console.log('response', res.data.url)
  }

  return (
    <>
      {value ?
        <div>
          <img src={value} alt="profile" />
        </div> 
        :
        <>
          <Form.Label>Image</Form.Label>
          <Form.Control 
            type="file" 
            onChange={handleUpload}  
          />
        </>
      }
    </>
  )




}
export default ImageUploadField