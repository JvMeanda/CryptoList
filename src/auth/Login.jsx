import React, { useState } from "react";
import { ButtonLogin } from "../Layout/Button";
import Alert from "../Layout/Alert";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setAlert({ type: "error", message: "Os campos devem ser preenchidos." });
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        await updateProfile(user, {
          displayName: email,
        });

        setAlert({
          type: "success",
          message: `Login bem sucedido. Bem Vindo ${user.displayName}`,
        });
        closeModal();
      } catch (error) {
        setAlert({
          type: "error",
          message: "Erro ao efetuar login. Verifique suas credenciais.",
        });
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
        <div className="flex justify-center items-center pt-5 w-full">
          <ButtonLogin
            text="Login"
            onClick={handleSubmit}
            onKeyDown={handleKeyPress}
          />
        </div>
      </form>
      <div className="space-y-2">
      <hr className="flex-grow bg-primary h-0.5 my-5" />
        <p>
          <span className="font-semibold mr-1">Login:</span>adm@gmail.com
        </p>
        <p>
          <span className="font-semibold mr-1">Senha:</span>adm123
        </p>
      </div>
      <Alert alert={alert} setAlert={setAlert} />
    </div>
  );
};

export default Login;
