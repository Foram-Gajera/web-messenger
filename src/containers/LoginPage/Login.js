import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/UI/Card/Card";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = (e) => {
    e.preventDefault();

    if (email == "") {
      alert("Email is required");
      return;
    }
    if (password == "") {
      alert("Password is required");
      return;
    }

    // dispatch(signin({ email, password }));
  };

  // if(auth.authenticated){
  //   return <Redirect to={`/`} />
  // }

  return (
    <Layout>
      <div className="loginContainer">
        <Card>
          <form onSubmit={userLogin}>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <br />
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <div>
              <button>Login</button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;