import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/material/LockOutlined";
import Typography from "@mui/material/Typography";
import users from "./users";
// import image from "./Images/image.jpg";
// import authService from "./../service/authService";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide(props) {

  // if(authService.isLoggedIn()){

  //   props.history.push("./home");

  // }

  // const classes = useStyles();

  console.log(typeof "root");

  const [account, setAccount] = React.useState({username:"",password:""});

  const handelAccount = (property,event)=>{

    const accountCopy = {...account};
    accountCopy[property] = event.target.value;

    setAccount(accountCopy);

  }

  const isVarifiedUser=(username, password)=>{

    return users.find((user)=> user.username === username && user.password === password);

  };


  const handelLogin = ()=>{
      if(isVarifiedUser(account.username,account.password)){
        // authService.doLogIn(account.username);
        setAccount({username:"",password:""});
        props.history.push("/home");

      }
  };

  return (
    <Grid container component="main" className={"root"}>
      <CssBaseline />
      {/* <Grid item xs={false} sm={4} md={7} className={"image"} /> */}
      <Grid
        className={"size"}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={"paper"}>
          <Avatar className={"avatar"}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={"form"} noValidate>
            <TextField
            onChange={(event)=>handelAccount("username",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
            onChange={(event)=>handelAccount("password",event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={"submit"}
              onClick = {handelLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
