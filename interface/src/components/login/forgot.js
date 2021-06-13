import React, { useState, useContext, useEffect } from "react";
import { useHttp } from "../../Hooks/http.hook.js";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";
import { Loader } from "../items/loader";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LoopIcon from '@material-ui/icons/Loop';
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

function Forgot() {
  const messageError = useMessageError();
  const messageSuccess = useMessageSuccess();
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();
  const classes = useStyles();
    const [form, setForm] = useState({
        email: "",
      });

      useEffect(() => {
        messageError(error);
        clearError();
      }, [error, messageError, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
      };
    
      const ForgotHandelr = async () => {
        try {
          const data = await request("/api/auth/forgot", "POST", { ...form });
          console.log('ZZZZZZZZZZZZZZZ')
          console.log(data)
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
    <div>
       <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LoopIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Вспомнить пароль
        </Typography>
        <Box mt={8} className = "text-center">
        <Typography>
            Для востановления пароля, введите адрес электронной почты, на который прийдет ссылка для востановления пароля
        </Typography>
        </Box>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {ForgotHandelr}
          >
            Отправить
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                 Вход в систему
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
  </div>
  );
}

export default Forgot;
