import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as diaryService from '../../services/diaryService';

const DiaryEntryForm = (props) => {
  const { entryId } = useParams;
  console.log( entryId)
  const [formData, setFormData] = useState({
      title: "", 
      reflection: "", 
      isEntryPublic: false, 
      isEntryUsernamePublic: false, 
      mood: "happy", 
      moodLvl: 5
  }); 

  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target; 
    setFormData({ ...formData, [name]: type === "checkbox" ? checked: value 
    });  
  }; 

  const handleSubmit = (evt) => {
    evt.preventDefault(); 
    if (entryId) {
      props.handleUpdateEntry(formData.isEntryPublic, entryId, formData);
    } else {
      props.handleAddEntry(formData.isEntryPublic, formData);
    }
  };

  useEffect(() => {
    const fetchEntry = async () => {
      const entryData = await diaryService.show(entryId);
      setFormData(entryData);
    };
    if (entryId) fetchEntry();

    return () => setFormData({
      title: "", 
      reflection: "", 
      isEntryPublic: false, 
      isEntryUsernamePublic: false, 
      mood: "happy", 
      moodLvl: 5
    });
  }, [entryId]);

 return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{entryId ? 'Edit Entry' :' New Diary Entry' }</h1>

        <label htmlFor="title-input">Title</label>
        <input
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="reflection-input">Reflections</label> 
        <input
          type="text"
          name="reflection"
          id="reflection-input"
          value={formData.reflection}
          onChange={handleChange}
        />

        <label htmlFor="mood">What is your current mood?</label>
        <select
          required
          name="mood"
          id="mood-input"
          value={formData.mood}
          onChange={handleChange}
        >
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="bored">Bored</option>
        </select>

        <label htmlFor="moodLvl">What is the intensity of your current mood?</label>
        <input 
            type="number"
            name="moodLvl"
            id="moodLvl"
            min="1"
            max="10"
            value = {formData.moodLvl} 
            onChange={handleChange} 
        />

        <div>
            <label>
                <input type="checkbox" 
                name="isEntryPublic" 
                checked={formData.isEntryPublic}
                onChange={handleChange}
                />
                Make entry public? 
            </label>  
        </div>

        <div>
            <label>
                <input type="checkbox" 
                name="isEntryUsernamePublic" 
                checked={formData.isEntryUsernamePublic}
                onChange={handleChange}
                />
                Display username publicly? 
            </label>  
        </div>

        <button type="submit">Create Entry</button>
    
      </form>
    </main>
  );
};

export default DiaryEntryForm; 