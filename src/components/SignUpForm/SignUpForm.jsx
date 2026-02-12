import styles from './AuthForm.module.css'; 
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    displayName: '',
    email: '',
  });

  const { username, password, passwordConf, displayName, email } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        const newUser = await signUp(formData);
        setUser(newUser);
        navigate('/');
    } catch (error) {
        setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.authCard}>
      <h1 className={styles.title}>Sign Up</h1>
      <p className={styles.message}>{message}</p>

        <div className={styles.inputGroup}>
          <label htmlFor='username' className={styles.label}>Username:</label>
          <input
            className={styles.inputField}
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='password' className={styles.label}>Password:</label>
          <input
            className={styles.inputField}
            type='password'
            id='password'
            value={password}
            name='password'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='confirm' className={styles.label}>Confirm Password:</label>
          <input
            className={styles.inputGroup}
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="displayName" className={styles.label}>Display Name:</label>
            <input 
            className={styles.inputField}
            type="text" 
            name="displayName" 
            id="displayName"
            value={displayName}
            onChange={handleChange}
            />
        </div>

        <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input 
            className={styles.inputField}
            type="email"
            name='email'
            id='email'
            value={email}
            onChange={handleChange} 
            />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.submitBtn} disabled={isFormInvalid()}>
            Sign Up
            </button>
          <button 
          type="button"
          className={styles.cancelBtn}
          onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
