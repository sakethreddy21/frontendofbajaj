import React, { useState } from 'react';

interface VisibilitySelectorProps {
  onChange: (selected: string[]) => void;
}

const VisibilitySelector: React.FC<VisibilitySelectorProps> = ({ onChange }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelected(prev => {
      const updated = prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value];

      onChange(updated);

      return updated;
    });
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          value="Characters"
          checked={selected.includes('Characters')}
          onChange={handleChange}
        />
        Characters
      </label>
      <label>
        <input
          type="checkbox"
          value="Numbers"
          checked={selected.includes('Numbers')}
          onChange={handleChange}
        />
        Numbers
      </label>
      <label>
        <input
          type="checkbox"
          value="highest_lowercase_alphabet"
          checked={selected.includes('highest_lowercase_alphabet')}
          onChange={handleChange}
        />
        Highest Alphabet
      </label>
    </div>
  );
};

export default VisibilitySelector;