"use client"
import React, { useEffect, useState } from 'react';
import JSONInputForm from '@/components/JSONInputForm';
import DropdownMenu from '@/components/DropdownMenu';
import VisibilitySelector from '@/components/VisibilitySelector';

interface ResponseData {
  alphabets: string[];
    numbers: string[]; // Note: Changed to string[] because you provided strings for numbers
    highest_lowercase_alphabet: string[];
    email: string;
    is_success: boolean;
    roll_number: string;
    user_id: string;
    file_valid: boolean; // Added for file validation status
    file_mime_type: string; // Added for file MIME type
    file_size_kb: string;
}

const Home: React.FC = () => {
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [visibility, setVisibility] = useState<string[]>([]);

  const handleFormSubmit = (data: ResponseData) => {
    console.log('Submitted Data:', data); // Log the submitted data
    setResponseData(data);
  };

  useEffect(() => {
    if (responseData) { // Only log when responseData is not null
      console.log('Response Data:', responseData);
    }
  }, [responseData]); // Correct dependency

  return (
    <div>
      <h1>BFHL api testing</h1>
      <JSONInputForm onSubmit={handleFormSubmit} />
      {responseData && (
        <>
          <VisibilitySelector onChange={(selected: string[]) => setVisibility(selected)} />
          <DropdownMenu data={responseData} visibility={visibility} />
        </>
      )}
    </div>
  );
};

export default Home;