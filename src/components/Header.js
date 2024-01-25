import { Button, Typography } from "@mui/material";
import React from "react";
import CustomAvatar from "./CustomAvatar";
import { parseJwt } from "../Utility/auth";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("tm_token");
  const navigate = useNavigate();
  const user = parseJwt(token);

  return (
    <div
      // className="h-[32px]"
      style={{
        height: 32,
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "97%",
        background: "#fff",
      }}
    >
      <Typography style={{ fontSize: 16 }}>
        Task Management
      </Typography>

      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {token && <CustomAvatar name={user?.name} />}

        {token ? (
          <Button
            variant="text"
            style={{ textTransform: "capitalize" }}
            onClick={() => {
              localStorage.removeItem("tm_token");
              navigate("/signin");
            }}
          >
            Logout
          </Button>
        ) : (
          <Link to="/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
