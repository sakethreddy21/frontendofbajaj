import React from 'react';

interface DropdownMenuProps {
  data: {
    alphabets: string[];
    numbers: string[]; // Note: Changed to string[] because you provided strings for numbers
    highest_lowercase_alphabet: string[];
    email: string;
    is_success: boolean;
    roll_number: string;
    user_id: string;
    file_valid: boolean; // Added for file validation status
    file_mime_type: string; // Added for file MIME type
    file_size_kb: string; // Added for file size
  };
  visibility: string[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ data, visibility }) => {
  if (!data) return null;

  // Check if any filter is applied
  const hasFilters = visibility.length > 0;

  return (
    <div>
      {/* User ID */}
      {(!hasFilters || visibility.includes('User ID')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>User ID</h3>::<p>{data.user_id}</p>
        </div>
      )}

      {/* Email */}
      {(!hasFilters || visibility.includes('Email')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>Email</h3>::<p>{data.email}</p>
        </div>
      )}

      {/* Roll Number */}
      {(!hasFilters || visibility.includes('Roll Number')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>Roll Number</h3>::<p>{data.roll_number}</p>
        </div>
      )}

      {/* Is Success */}
      {(!hasFilters || visibility.includes('Success Status')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>Success Status</h3>::<p>{data.is_success ? 'Success' : 'Failure'}</p>
        </div>
      )}

      {/* Characters */}
      {(!hasFilters || visibility.includes('Characters')) && data.alphabets.length > 0 && (
        <div className='flex flex-row gap-x-2'>
          <h3>Characters</h3>::<ul>
            {data.alphabets.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Numbers */}
      {(!hasFilters || visibility.includes('Numbers')) && data.numbers.length > 0 && (
        <div className='flex flex-row gap-x-2'>
          <h3>Numbers</h3>::<ul>
            {data.numbers.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Highest Alphabet */}
      {(!hasFilters || visibility.includes('Highest Alphabet')) && data.highest_lowercase_alphabet.length > 0 && (
        <div className='flex flex-row gap-x-2'>
          <h3>Highest lowercase alphabet</h3>::<ul>
            {data.highest_lowercase_alphabet.map((alpha, index) => (
              <li key={index}>{alpha}</li>
            ))}
          </ul>
        </div>
      )}

      {/* File Validity */}
      {(!hasFilters || visibility.includes('File Validity')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>File Validity</h3>::<p>{data.file_valid ? 'Valid' : 'Invalid'}</p>
        </div>
      )}

      {/* File MIME Type */}
      {(!hasFilters || visibility.includes('File MIME Type')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>File MIME Type</h3>::<p>{data.file_mime_type || 'N/A'}</p>
        </div>
      )}

      {/* File Size */}
      {(!hasFilters || visibility.includes('File Size')) && (
        <div className='flex flex-row gap-x-2'>
          <h3>File Size (KB)</h3>::<p>{data.file_size_kb || '0'}</p>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
