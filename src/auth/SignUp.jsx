import React, { useState } from "react";
import { ButtonLogin } from "../Layout/Button";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Alert from "../Layout/Alert";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setAlert({ type: "error", message: "Todos os campos são obrigatórios!" });
    } else if (password !== confirmPassword) {
      setAlert({ type: "error", message: "As senhas estão diferentes!" });
    } else if (password.length < 6 || confirmPassword.length < 6) {
      setAlert({ type: "error", message: "Mínimo de 6 dígitos!" });
    } else {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);

        if (methods && methods.length > 0) {
          setAlert({ type: "error", message: "Este email já está em uso." });
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          await updateProfile(user, {
            displayName: name,
          });

          setAlert({
            type: "success",
            message: `Conta criada! Bem-vindo ${user.displayName}!`,
          });
        }
      } catch (error) {
        setAlert({ type: "error", message: "Erro ao criar a conta. Verifique suas credenciais." });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="xxs:text-[15px] ss:text-[18px]">
      <form className="flex flex-col space-y-2">
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none py-1 pl-2 rounded-md border border-slate-500"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none py-1 pl-2 rounded-md border border-slate-500"
        />
        <label htmlFor="password">Senha:</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full outline-none py-1 pl-2 rounded-md border border-slate-500"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {showPassword ? <BsEye /> : <BsEyeSlash />}
          </span>
        </div>
        <label htmlFor="confirmPassword">Confirmar Senha:</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full outline-none py-1 pl-2 rounded-md border border-slate-500"
          />
          <span
            onClick={toggleShowConfirmPassword}
            className="absolute top-2 right-2 cursor-pointer"
          >
            {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
          </span>
        </div>
        <div className="flex justify-center items-center pt-5 w-full">
          <ButtonLogin
            text="Cadastrar"
            onClick={handleSubmit}
            onKeyDown={handleKeyPress}
          />
        </div>
      </form>
      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
};

export default SignUp;
