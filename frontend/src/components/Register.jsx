import React, { useState } from "react";
import Input from "./Input";
import InfoTooltip from "./InfoTooltip";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register({ title, nameBtn }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const [error, setError] = useState(false);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleCloseInfo = () => {
    setOpen(true);
  };

  const onRegister = async (evt) => {
    evt.preventDefault();
  
    try {
      const res = await auth.register(credentials.password, credentials.email);
      localStorage.setItem("token", res.token);
      navigate("/signin", { state: "success" });
    } catch (err) {
      console.error({
        message: "Error creando el usuario",
        detail: err.message,
      });
      setError(true);
      setOpen(false);
    }
  };

  return (
    <>
      <section className="authenticate" id="register" onSubmit={onRegister}>
        <h3 className="title">{title}</h3>
        <form className="authenticate__form" noValidate>
          <Input
            className={"authenticate__input"}
            type={"email"}
            placeholder={"Correo electrónico"}
            id={"email"}
            onChange={handleChange}
          />
          <Input
            className={"authenticate__input"}
            type={"password"}
            placeholder={"Contraseña"}
            id={"password"}
            maxLength={"200"}
            onChange={handleChange}
          />
          <button className="authenticate__btn" type="submit">
            {nameBtn}
          </button>
        </form>
        <p className="authenticate__register">
          ¿Ya eres miembro? Inicia{" "}
          <Link to="/signin" className="link">
            sesión aquí
          </Link>
        </p>
      </section>
      <InfoTooltip error={error} onClose={handleCloseInfo} open={open} />
    </>
  );
}

export default Register;
