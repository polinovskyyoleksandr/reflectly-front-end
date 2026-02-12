import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import DiaryEntryList from '../DiaryEntryList/DiaryEntryList';
import { UserContext } from '../../contexts/UserContext';

const DiaryEntryForm = (props) => {
    const [formData, setFormData] = useState({
        title: "", 
        reflection: "", 
        isEntryPublic: false, 
        isEntryUsernamePublic: false, 
        mood: "happy", 
        moodLvl: 5
    }); 
  
  const { user } = useContext(UserContext);

const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target; 

    setFormData({ ...formData, [name]: type === "checkbox" ? checked: value 
    });  
}; 

const handleSubmit = (evt) => {
    evt.preventDefault(); 
    console.log('form data', formData)
}; 

 return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1> New Diary Entry </h1>

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
