import styles from '../AuthForm.module.css'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate('/');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <main className={styles.authContainer}>
      <form autoComplete='off' onSubmit={handleSubmit} className={styles.authCard}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.message}>{message}</p>

        <div className={styles.inputGroup}>
          <label htmlFor='username' className={styles.label}>Username:</label>
          <input
            type='text'
            autoComplete='off'
            id='username'
            value={formData.username}
            name='username'
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor='password' className={styles.label}>Password:</label>
          <input
            type='password'
            autoComplete='off'
            id='password'
            value={formData.password}
            name='password'
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.submitBtn}>Sign In</button>
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

export default SignInForm;

