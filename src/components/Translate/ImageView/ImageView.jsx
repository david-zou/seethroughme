import React, { Component } from 'react';

// ImageView Component only contains imageURL
// Using Stateless style
// Expect App.js pass imageURL data to ImageView
 const ImageView = (props) => {
  //  console.log('in image view,' props.imgURL);
  return (
    <div className="image-view-container">
      <img src={props.imgURL} className="image-view" />
    </div>
  )
}

export default ImageView;
