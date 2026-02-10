const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_UTL}/diaryEntry`;

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
const create = async (FormData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(FormData)
        }); 
        return res.json(); 
    } catch (err) {
        console.log(err); 
    }
}

// update an entry 
const updateDiaryEntry = async (diaryEntryId, FormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${diaryEntryId}`, {
            method: 'PUT', 
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(FormData), 
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