import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import './login.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMessageError, useMessageSuccess } from "../../Hooks/message.hook";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const messageError = useMessageError();
  const messageSuccess = useMessageSuccess();
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();
  const classes = useStyles();
    const [form, setForm] = useState({
        email: "",
        password: "",
      });

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const loginHandelr = async () => {
        try {
          const data = await request("/api/auth/login", "POST", { ...form });
          auth.login(data.token, data.id);
          messageSuccess("Привет " + data.name + " 😃 ");
        } catch (e) {
            console.log(e)
            messageError(e);
        }
      };
    if (loading) {
      return (
        <>
          <Loader></Loader>
        </>
      );
    }


  return (
    <div className = "wrapper">
       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange = {changeHandler}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange = {changeHandler}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {loginHandelr}
          >
            Вход
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgot" variant="body2">
                Забыли пароль?
              </Link>
            </Grid>
            <Grid item>
              <Link to ="/registration" variant="body2">
                {"Нету аккаунта? Зарегестироваться"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8} className = "text-center">
      <label>Created by Lytvynskyi T.V.</label>
      </Box>
    </Container>
    {/* <div id="main-login-div" className = "container text-center ">
          <div className="col mt-5 need-hide">
          </div>
          <div className="col p-3">
            <div id="login-form" className="container text-dark">
              <div>
                <div className="d-flex justify-content-center">
                </div>
              </div>
              <div className = "shadow-lg p-3 mb-5 mt-5 bg-white rounded">
              <div className = "mb-5">
                  <h1>Вход в систему Classroom</h1>
                  <hr></hr>
                </div>
                <div className="form-group mt-3 mb-3">
                  <label>Ваш email</label>
                  <input
                    onChange = {changeHandler}
                    type="email"
                    className="form-control border border-warning"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                  >
                  </input>
                </div>
                <div className="form-group">
                  <label>Ваш пароль</label>
                  <input
                    onChange = {changeHandler}
                    type="password"
                    className="form-control border border-warning"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                  ></input>
                </div>
                <div className="form-check"></div>
                <button onClick = {loginHandelr} className="btn btn-warning" type="submit" value="Вход">Войти</button>
                <hr></hr>
                <label className="mt-2">Нету аккаунта?</label>
                <br/>
                <Link to="/registration">Зарегестрироваться</Link>
                <Link to = "/test">TEST LINK!</Link>
                <p>
                </p>
              </div>
            </div>
        </div>
      </div> */}
  </div>
  );
}

export default Login;
