import React, { useState, useRef, useEffect } from 'react';
import './ArtSubmission.css';
import { FaFileUpload } from "react-icons/fa";


const ArtSubmission = ({ children, onDismiss, file, className = '' }) => {
  // simple patterns used for client-side validation
  const urlPattern = /^(https?:\/\/[\S]+)$/i; // basic http(s) URL
  const artistPattern = /^[\w\s'-]{1,100}$/;  // letters, spaces, hyphen, apostrophe

  const [formData, setFormData] = useState({
    artist: '',
    title: '',
    artUrl: '',
    description: ''
  });
  const [childFile, setFile] = useState(file);
  const [uploaded, setUploaded] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    useEffect(() => {
      if (file) {
        setFile(file);
        setUploaded(true);
      }
    }, [file]);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        // restrict to common image types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          alert('Only JPG, PNG or GIF images are allowed.');
          event.target.value = null;
          return;
        }
        setFile(file);
        setUploaded(true);
      }
    };

  const submitArt = async (e) => {
    e.preventDefault();

    // client-side sanity checks
    if (formData.artUrl && !urlPattern.test(formData.artUrl)) {
      alert('Please enter a valid URL (must start with http:// or https://)');
      return;
    }
    if (formData.artist && !artistPattern.test(formData.artist)) {
      alert('Artist name may only contain letters, spaces, hyphens and apostrophes');
      return;
    }

    // 1. Paste your Webhook URL here
    const webhookURL = process.env.REACT_APP_ART_SUBMISSION_WEBHOOK;
    const data = new FormData();
const messageData = {
  content: "🎨 **New Art Submission!**",
  embeds: [{
    title: formData.title || "Untitled",
    color: 15105570,
    fields: [
      { name: "Artist", value: formData.artist || "Anonymous", inline: true },
      { name: "Link", value: formData.artUrl || "No URL provided" }, // Added as text
      { name: "Email", value: formData.email || "No email provided" },
      { name: "Description", value: formData.description || "No description." }
    ],
    // This tells Discord to try and render the image
    image: { 
      url: formData.artUrl 
    },
    footer: { text: "Verified Submission" },
    timestamp: new Date().toISOString()
  }]
};
if(file || childFile) {
  let uploadableFile = file;
  if (childFile != null) {
    uploadableFile = childFile
  }
  data.append('payload_json', JSON.stringify(messageData));
  if (uploadableFile) {
  data.append('file', uploadableFile);
  }
  }
  

    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        body: data,
      });
      if (!response.ok) {
        throw new Error(`Unable to submit: Please try again later or contact support.`);
      }
      alert("Art submitted successfully!");
      onDismiss()
      setFormData({ artist: '', title: '', artUrl: '', description: '' });
    } catch (err) {
      alert("Failed to send to Discord.");
    }
  };
  return (
<div className="container">
      <h2>Submit Your Artwork</h2>
      <form onSubmit={submitArt} className="form">
        <input
          name="artist"
          placeholder="Your Name"
          value={formData.artist}
          onChange={handleChange}
          className="input"
          pattern={artistPattern.source}
          title="letters, spaces, hyphen or apostrophe only"
        />
        <input
          name="title"
          placeholder="Art Title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="artUrl"
          placeholder="URL"
          value={formData.artUrl}
          onChange={handleChange}
          className="input"
          pattern="https?://.+"
          title="must start with http:// or https://"
        />
        <input
          name="email"
          type="email"
          placeholder="Email (Optional)"
          value={formData.email}
          onChange={handleChange}
          className="input"
        />
      <textarea name="description" placeholder="Brief description..." value={formData.description} onChange={handleChange} className="textarea input" required/>

                <div className="upload-wrapper">
                  <div 
                    className={uploaded ? "drop-zone uploaded" : "drop-zone"}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      console.log("File dropped:", e.dataTransfer.files[0].name);
                    }}
                  >
                    {uploaded ? <FaFileUpload /> : <div className="upload-icon">↑</div>}
                    
                    {uploaded ? (
                      <p className="upload-text">File Successfully Uploaded</p>
                    ) : (
                      <p className="upload-text">Drag & drop files here</p>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/jpeg,image/png,image/gif" 
                      style={{ display: 'none' }} 
                    />
                    </div>

                    <button className="upload-button" onClick={handleButtonClick}>
                      Choose File
                    </button>
                  </div>
        <div className="footer">
          <button type="button" className="button cancel" onClick={onDismiss}>Cancel</button>
          <button type="submit" className="button">Submit</button>
        </div>             
      </form>
    </div>
  );
};

export default ArtSubmission;


