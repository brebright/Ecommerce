import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {image && <p>Image uploaded: {image.name}</p>}
    </div>
  );
};

export default ImageUpload;
