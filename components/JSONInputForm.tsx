import React, { useState } from 'react';
import usePostData from '../hooks/usePostData';

interface JSONInputFormProps {
  onSubmit: (data: any) => void;
}

const JSONInputForm: React.FC<JSONInputFormProps> = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { postData } = usePostData();

  // Function to handle file upload and convert to base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Convert file to base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]); // Remove the "data:" prefix
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedData = JSON.parse(jsonInput);

      // If a file is uploaded, convert it to base64 and include it in the data
      let fileBase64 = '';
      if (file) {
        fileBase64 = await convertFileToBase64(file);
      }

      const payload = {
        ...parsedData,
        file_b64: fileBase64, // Include base64 file in the payload
      };

      const data = await postData(payload);

      if (data) {
        onSubmit(data);
      }
    } catch (e) {
      console.error('Error parsing or submitting JSON:', e);
      setError('An error occurred while submitting the data. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="json-input">JSON Input:</label>
        <textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={10}
          cols={50}
          placeholder='Enter JSON data here like this { "data": ["1", "5", "a", "b", "9", "Z", "x", "2"] }'
          className="text-black"
        />
        
        <label htmlFor="file-input">Upload a file (optional):</label>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          accept="image/*, .pdf, .doc, .docx" // File type restriction (optional)
          className="my-2"
        />

        <button type="submit" disabled={loading} className="mt-2">
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default JSONInputForm;
