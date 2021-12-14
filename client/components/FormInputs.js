import { useState, useRef, useEffect } from "react";
import styles from "../styles/FormInputs.module.css";
import {
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  LocalizationProvider,
  DesktopDatePicker,
  MobileDatePicker,
} from "@mui/lab";

import { isMobile } from "react-device-detect";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

import LetterModal from "./modals/Letter";

const FormInputs = () => {
  const theme = useTheme().palette.mode;

  const [msg, setMsg] = useState(`Dear FutureMe, \n`);
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [isPublic, setIspublic] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState("");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.getElementById("msg").focus();
  }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };
  const handleDate = (newValue) => {
    setDate(newValue);
  };
  const handleEmail = (e) => {
    const mail = e.target.value.toLowerCase();
    if (mail === "") {
      setEmailError(false);
      setEmailErrorText("please enter an email");
      return setEmail(e.target.value);
    }
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
    if (!isValid) {
      setEmailError(true);
      setEmailErrorText("please enter a valid email");
      setEmail(e.target.value);
    } else {
      setEmailError(false);
      setEmailErrorText("");
      setEmail(e.target.value);
    }
  };

  const handlePublicSwitch = (e) => {
    setIspublic(!isPublic);
  };

  const resetForm = () => {
    setMsg(`Dear FutureMe, \n`);
    setDate(new Date());
    setEmail("");
    setIspublic(false);
    document.getElementById("msg").focus();
  };

  // handle form submission
  const handleSubmit = async () => {
    // if email is empty or invalid
    if (
      email === "" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())
    ) {
      return enqueueSnackbar("Please enter a valid email!", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }

    // construct data and send request
    setLoading(true);
    const data = {
      msg,
      date,
      email,
      isPublic,
    };
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "COntent-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    setLoading(false);

    // handle response
    if (res.status === "success") {
      enqueueSnackbar("Congrats, message in its way to ur future self!", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      resetForm();
    } else if (
      res.status === "failure" &&
      res.error.name === "ValidationError"
    ) {
      enqueueSnackbar("Please enter a valid email!", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    } else {
      enqueueSnackbar("Something went wrong, please try again!", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };

  return (
    <Stack
      className={styles.formContainer}
      component="form"
      noValidate
      autoComplete="off"
      spacing={2}
    >
      <TextField
        id="msg"
        label="Letter"
        multiline
        rows={2}
        value={msg}
        onChange={handleMsg}
        onClick={handleOpen}
        style={{ width: "350px" }}
        // inputRef={(input) => input && input.focus()}
      />
      {/* <TextField
        id="date"
        label="Deliver On"
        type="date"
        // defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ width: "350px" }}
      /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {isMobile ? (
          <MobileDatePicker
            label="Deliver On"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        ) : (
          <DesktopDatePicker
            label="Deliver On"
            inputFormat="MM/dd/yyyy"
            value={date}
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        )}
      </LocalizationProvider>

      <TextField
        id="email"
        type="email"
        value={email}
        onChange={handleEmail}
        label="E-mail"
        style={{ width: "350px" }}
        error={emailError}
        helperText={emailErrorText}
      />
      <FormControlLabel
        control={<Switch checked={isPublic} onChange={handlePublicSwitch} />}
        label="Public"
      />
      <LoadingButton
        style={{ fontWeight: 500 }}
        variant={theme === "dark" ? "outlined" : "contained"}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        onClick={handleSubmit}
      >
        Send to your future self
      </LoadingButton>
      <LetterModal open={open} setOpen={setOpen} handleClose={handleClose} msg={msg} handleMsg={handleMsg} />
    </Stack>
  );
};

export default FormInputs;
