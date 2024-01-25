import React, { useState } from "react";
import CustomInputLabel from "../components/CustomInputLabel";
import {
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { doAjax } from "../Utility/service";

function Signin() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onSignIn = () => {
    doAjax(
      null,
      `http://localhost:5000/users/signin`,
      "POST",
      user
    )
      .then((data) => {
        localStorage.setItem("tm_token", data?.token);
        navigate("/")
      })
      .catch((err) => {});
  };

  return (
    <div
      //   className="w-full flex items-center justify-center text-center"
      style={{
        height: "calc(100% - 32px - 16px)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        // className="border p-6 rounded-lg"
        style={{
          border: "1px solid transparent",
          padding: 24,
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background: "rgb(246 246 246)",
        }}
      >
        <div className="">
          <CustomInputLabel required={true}>
            Email
          </CustomInputLabel>

          <TextField
            size="small"
            variant="outlined"
            value={user?.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
        </div>

        <div className="">
          <CustomInputLabel required={true}>
            Passowrd
          </CustomInputLabel>

          <TextField
            size="small"
            variant="outlined"
            type="password"
            value={user?.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </div>

        <Button
          variant="contained"
          style={{
            textTransform: "capitalize",
            marginTop: 30,
          }}
          onClick={onSignIn}
          disabled={
            user?.email?.length === 0 ||
            user?.password?.length === 0
          }
        >
          Login
        </Button>

        <Typography
          style={{ fontSize: 12, textAlign: "center" }}
        >
          Don't have account{" "}
          <Link to="/signup">Sign up</Link>
        </Typography>
      </div>
    </div>
  );
}

export default Signin;
