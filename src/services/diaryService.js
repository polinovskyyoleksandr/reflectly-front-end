const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/diaryEntry`;

// show list of diary entries
const index = async (isPrivate) => {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, 
        });

        // const data = await res.json();
        
        // return data;
        const diaryList = await res.json();
        
        const filteredDiaryList = diaryList.filter((entry) => {
            if (isPrivate === true) {
                return entry.isEntryPublic === false;
            } else {
                return entry.isEntryPublic === true;
            }
        })
        return filteredDiaryList; 
    } catch (err) {
        console.log(err) 
    }
}

// show individual diary entry 
const show = async (diaryEntryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${diaryEntryId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}, 
        }); 
        return res.json(); 
    } catch (err) {
        console.log(err)
    }
}

// create an entry 
const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(formData)
        }); 
        return res.json(); 
    } catch (err) {
        console.log(err); 
    }
}

// update an entry 
const updateDiaryEntry = async (diaryEntryId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${diaryEntryId}`, {
            method: 'PUT', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(formData), 
        }); 
        return res.json(); 
    } catch (err) {
        console.log(err); 
    }
}

// delete an entry 
const deleteDiaryEntry = async (diaryEntryId) => {
    try {
        const res = await fetch(`${BASE_URL}/${diaryEntryId}`, {
            method: 'DELETE', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
            }
        }); 
        return res.json(); 
    } catch (err) {
        console.log(err); 
    }
}

export {
    index, 
    show, 
    create, 
    updateDiaryEntry, 
    deleteDiaryEntry
}; 