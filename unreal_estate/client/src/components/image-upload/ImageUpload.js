import React, { Component } from 'react';
import { toast } from 'react-toastify';
var ConfigFile = require('../config');

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
      toast.error("No file attached.");
      return;
    }
    const files = Array.from(this.state.file)
    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    await fetch(`${ConfigFile.Config.server}advertising/test_upload`, {
      method: "POST",
      body: formData
    }).then(response => {
      // handle your response;
    }).catch(error => {
      // handle your error
    });
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