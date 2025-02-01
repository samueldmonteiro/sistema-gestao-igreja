import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Box, Paper } from '@mui/material';
import { Logo } from '../../../styles/globals';
import IconLogo from '../../../assets/icone.png'
import { loginAdmin, setAdminToken } from '../../../services/admin';
import useMessageAlert from '../../../hooks/useMessageAlert';
import useFetchData from '../../../hooks/useFetchData';
import Button from '../../../components/button';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { message, showMessage } = useMessageAlert();
  const { data, error, loading, request } = useFetchData();

  const handleSubmit = (e) => {
    e.preventDefault();
    request(loginAdmin, [email, password]);
  }

  useEffect(() => {
    if (error) {
      showMessage('Login Incorreto. Tente novamente!', 'warning');
    }

    if (data && !error) {
      showMessage('Login Efetuado com Sucesso!', 'success');
      setAdminToken(data.token);
      setTimeout(() => window.location.href = '/', 700);
    }

  }, [error, data]);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, flexDirection: 'column' }}>
          <Logo src={IconLogo} />

          <Typography component="h1" variant="h6" mt={2} mb={-3}>
            A. D. Campo da Ponte
          </Typography>
        </Box>

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          {message}

          <TextField
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            value='Entrar'
          />

        </Box>
      </Paper>
    </Container>
  );
};

export default Login;