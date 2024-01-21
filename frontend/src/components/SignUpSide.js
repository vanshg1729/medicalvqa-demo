import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material'
import './signup.css'
import config from './config';
import subpath from './subpath';

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Medical VQA App
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('Inside handleSubmit', event.currentTarget)
        // event.currentTarget is the button, not the form

        // console.log({
        //     email: email,
        //     password: password,
        //     fname: fname,
        //     lname: lname,
        // });

        const data = {
            email: email,
            password: password,
            fname: fname,
            lname: lname,
            age: 21,
            contact: 1234567890,
        };
        const signup = async () => {
            const url = `${config.backendUrl}/api/user/signup`;
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await response.json();
            console.log(res, "res");
            if (response.status === 200) {
                const token = res.token;
                console.log(token, "token");
                // store the token in localStorage

                localStorage.setItem('token', token);
                setEmail('');
                setPassword('');
                setFname('');
                setLname('');
                setErrMsg('');
                
                window.location.href = `${subpath}/home`

            } else {
                setEmail('');
                setPassword('');
                setErrMsg(res.error);
                console.log(errMsg, "errMsg");
            }
        }
        signup();
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          window.location.href = `${subpath}/home`
        }
      }, [])

    // const doSignUp = (event) => {
    //     event.preventDefault();

    //     // we need to send a backend post request here to signup the use`r
    //     const url = "/api/user/signup";


    //     window.location.href = `${subpath}/home`
    // }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(' + require('./background/dark.webp') + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={
                    {
                        backgroundColor: 'rgb(75 85 86 / 49%)',
                    }
                }>
                    <Box
                        sx={{
                            my: 9,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <CssBaseline />
                        <div className={"paper"} align='center'>
                            <Avatar className={"avatar"}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" align='center' marginTop={'12px'}>
                                Sign up
                            </Typography>
                            <form className={"form"} noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            value={fname}
                                            onChange={(e) => setFname(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                            value={lname}
                                            onChange={(e) => setLname(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid> */}
                                </Grid>
                                <Typography variant="body2" color="error" align="center">
                                    {errMsg}
                                </Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={"submit"}
                                    onClick={handleSubmit}
                                    style={
                                        {
                                            marginTop: '20px',
                                            marginBottom: '20px'
                                        }
                                    }
                                >
                                    Sign Up
                                </Button>
                                <Grid container justify="flex-end">
                                    <Grid item>
                                        <Link href={`/medical-vqa`} variant="body2" fontSize='1.1rem'>
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                        {/* <Box mt={5}>
                            <Copyright />
                        </Box> */}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}