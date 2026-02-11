import { useState } from 'react';

// Destructure props 
const CommentsForm = ({ diaryEntryId, handleAddComment }) => {
    
    const [formData, setFormData] = useState({ text: '' }); 

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value }); 
    }; 

    const handleSubmit = (evt) => {
        evt.preventDefault(); 
        
       
        const commentData = {
            text: formData.text, 
            diaryEntry: diaryEntryId 
        }; 

        handleAddComment(commentData); 

       
        setFormData({ text: '' });
    }; 

    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your Comment: </label>
            <textarea
                required
                name="text" 
                id="text-input"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit">Submit Comment</button>
        </form>
    );
}; 

export default CommentsForm;