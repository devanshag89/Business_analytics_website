import axios from 'axios';
import { useState } from 'react';

const FileUpload = ({ setFilename }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("No file selected");
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post('http://localhost:5000/api/upload', formData);
    setFilename(res.data.filename); // or res.data.fileId
  };

  return (
    <div>
      <input type="file" accept=".csv,.xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
