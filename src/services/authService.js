const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
    const newUserData = formData; 
    if (!newUserData.email) { delete newUserData.email }
    if (!newUserData.displayName) { delete newUserData.displayName }
    try {
        const res = await fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData),
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
            return JSON.parse(atob(data.token.split('.')[1])).payload;
        }

        throw new Error('Invalid response from server');
    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const signIn = async (formData) => {
    try {
        const res = await fetch(`${BASE_URL}/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.error){
            throw new Error(data.error);
        }

        if (data.token){
            localStorage.setItem('token', data.token);
            return JSON.parse(atob(data.token.split('.')[1])).payload;
        }
    } catch (error) {
        console.log(err);
        throw new Error(err);
    }
}

export {
    signUp,
    signIn,
};