import { useState } from 'react';

const CommentsForm = ({ props }) => {
    const [formData, setFormData] = useState({ comment: '' }); 

    const handleChange = (evt) => {
        setFormData({...formData, [evt.target.name]: evt.target.value }); 
    }; 

    const handleSubmit = (evt) => {
        evt.preventDefault(); 
        setFormData({ text: '' }); 
    }; 

    const commentData = {
        comment: formData.text, 
        diaryEntry: props.diaryEntryId
    }; // is this the right way to link the comment to the diary? 

    props.handleAddComment(commentData); 


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="text-input">Your Comment: </label>
            <textarea
            required
            type="text"
            name="text"
            id="text-input"
            value={formData.text}
            onChange={handleChange}
            />

            <button type="submit">Submit Comment</button>
        </form>
    )
}; 

export default CommentsForm; 