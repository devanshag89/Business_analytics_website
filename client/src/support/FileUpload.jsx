import { Upload } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ setFilename, title }) => {
  const [file, setFile] = useState(null);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleUpload = async () => {
    if (!title) return alert("Title is required");
    if (!file) return alert("No file selected");
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${BASE_URL}/upload`, formData);
    setFilename(res.data.filename);
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Upload Your Data</h3>
      
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors duration-200">
          <Upload className="w-8 h-8 text-gray-500 mb-2" />
          <span className="text-gray-700 font-medium">{file ? file.name : 'Choose a file'}</span>
          <input 
            type="file" 
            accept=".csv,.xlsx" 
            className="hidden" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </label>
        
        <button 
          onClick={handleUpload} 
          disabled={!file}
          className="w-full md:w-auto bg-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-teal-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload File
        </button>
      </div>
      
      <p className="mt-3 text-sm text-gray-500">Supports CSV and Excel files</p>
    </div>
  );
};


export default FileUpload