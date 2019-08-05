import React, { Component } from 'react';
import { toast } from 'react-toastify';
var ConfigFile = require('../../config');

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null
    };

    this.submitFile = this.submitFile.bind(this);
  }

  submitFile = async (event) => {
    event.preventDefault();
    console.log(this.state.file);
    if (!this.state.file) {
    } else {

      const files = Array.from(this.state.file)
      const formData = new FormData()

      formData.append('file', files[0]);
      formData.append('upload_preset', 'wiu02rqf');

      await fetch(`https://api.cloudinary.com/v1_1/dl3x9yefn/image/upload`, {
        method: "POST",
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      }).then(response => {
        console.log(response)
        return response.json()
      }).then(responceJson => {
        console.log(responceJson)
        console.log(responceJson.body.url)
        // handle your response;
      }).catch(error => {
        // handle your error
      });
    }
  }

  handleFileUpload = (event) => {
    var errorFound = false;
    Array.from(event.target.files).forEach(element => {
      if (element.type === "image/png" || element.type === "image/jpeg" ){
        console.log(element.type);
      } else {
        toast.error("You can only upload Image files.");
        errorFound = true;
        return;
      }
    });
    if (!errorFound) {
      this.setState({ file: event.target.files });
    } else {
      this.setState({ file: null });
      event.target.files = null;
    }
  }

  render() {
    return (
      <form onSubmit={this.submitFile}>
        <input label='upload file' type='file' onChange={this.handleFileUpload} multiple/>
        <button onClick={this.submitFile}>Upload</button>
      </form>
    );
  }
}

export default FileUpload;