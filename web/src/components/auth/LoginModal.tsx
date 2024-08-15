import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { loginSuccess, logoutSuccess } from '../../redux/slices/authSlice';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { login, register } from '../../services/authService';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { initLoginData, clearLoginData, getUserData } from '../../utils/authUtils';
import { useNavigate } from 'react-router-dom';

// Doğrulama şeması
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const LoginModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userName, avatarUrl } = useSelector((state: RootState) => state.auth);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde kullanıcı oturum bilgilerini yükle
    const userData = getUserData();
    if (userData) {
      dispatch(loginSuccess({ userName: userData.username, avatarUrl: userData.avatarUrl || 'https://avatar.iran.liara.run/public/job/designer/male'}));
    }
  }, [dispatch]);

  const handleLogin = async (values: { username: string; password: string }) => {
    try {
      const data = await login(values.username, values.password);
      dispatch(loginSuccess({ userName: data.user.username, avatarUrl: data.user.avatarUrl }));
      initLoginData(data);  // Login verilerini kaydediyoruz
      setIsLoginModalOpen(false);
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (values: { username: string; password: string }) => {
    try {
      await register(values.username, values.password);
      setIsRegistering(false);
      setIsLoginModalOpen(false);
      toast.success('Registration successful! You can now login.');
    } catch (error) {
      console.error('Registration failed', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    clearLoginData();  // Login verilerini temizliyoruz
    dispatch(logoutSuccess());  // Kullanıcıyı çıkış yaptırıyoruz
    toast.info('Logged out successfully.');
    navigate('/'); // Ana sayfaya yönlendirme
  };

  return (
    <>
      <Button variant="contained" color="primary" size='small' onClick={() => setIsLoginModalOpen(true)}>
        Login
      </Button>
      <Modal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '100%',
            position: 'relative',
            zIndex: 1000,
          }}
        >
          <h2 style={{ marginBottom: '16px' }}>{isRegistering ? 'Register' : 'Login'}</h2>

          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={isRegistering ? handleRegister : handleLogin}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  label="Username"
                  name="username"
                  fullWidth
                  className="mt-4"
                  style={{ marginBottom: '16px' }}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  InputLabelProps={{
                    style: { cursor: 'pointer' },
                  }}
                />
                <Field
                  as={TextField}
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  className="mt-4"
                  style={{ marginBottom: '16px' }}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{
                    style: { cursor: 'pointer' },
                  }}
                />
                <Button type="submit" variant="contained" color="primary" className="mt-4" style={{ cursor: 'pointer' }}>
                  {isRegistering ? 'Register' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col border-2">
            {isRegistering ? (
              <span className="text-blue-500 mt-8 cursor-pointer" onClick={() => setIsRegistering(false)}>Already have an account? Login</span>
            ) : (
              <span className="text-blue-500 mt-8 cursor-pointer" onClick={() => setIsRegistering(true)}>Don't have an account? Register</span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
