import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../redux/actions/userActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./SignIn.css";
import jwtDecode from "jwt-decode";

const initialForm = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/devices";

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (payload) => {
    return payload?.error || payload?.message || "No se pudo iniciar sesión";
  };

  const [pendingVerificationEmail, setPendingVerificationEmail] = useState("");
  
  const doLogin = async (body) => {
    setError("");
    setLoading(true);

    try {
      const result = await dispatch(signIn(body));

      if (signIn.rejected.match(result)) {
  const payload = result.payload;

  if (payload?.requiresEmailVerification && payload?.email) {
    setPendingVerificationEmail(payload.email);
  }

  setError(getErrorMessage(payload));
  return;
}

      const payload = result.payload;

      if (payload?.token) {
        localStorage.setItem("token", payload.token);
      }

      navigate(from, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      setError("Completá email y contraseña.");
      return;
    }

    doLogin({
      email: form.email.trim(),
      password: form.password,
    });
  };

  const handleSubmitGoogle = (data) => {
    const body = {
      email: data.email,
      password: data.sub + import.meta.env.VITE_GG_KEY,
    };

    doLogin(body);
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: "crimson", marginBottom: 12, fontWeight: 600 }}>
            {error}
            {pendingVerificationEmail && (
  <button
    type="button"
    className="bt btn-secondary"
    style={{ marginBottom: 12 }}
    onClick={() =>
      navigate("/verify-email", {
        state: { email: pendingVerificationEmail },
      })
    }
  >
    Verificar email
  </button>
)}
          </div>
        )}

        <label className="signin-label">
          Email
          <input
            type="email"
            name="email"
            className="signin-input"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
          />
        </label>

        <label className="signin-label">
          Password
          <input
            type="password"
            name="password"
            className="signin-input"
            value={form.password}
            onChange={updateField}
            autoComplete="current-password"
          />
        </label>

        <button className="bt btn-secondary" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Login"}
        </button>

        <div style={{ marginTop: 10, marginBottom: 10 }}>

        <Link to="/forgot-password">
               ¿Olvidaste tu contraseña?
        </Link>
</div>

        <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const infoUser = jwtDecode(credentialResponse.credential);
              handleSubmitGoogle(infoUser);
            }}
            onError={() => {
              setError("Google login failed");
            }}
          />
        </GoogleOAuthProvider>
      </form>

      <div className="button-wrapper">
        <p className="cta-text">Become a user</p>
        <Link className="button cta-signup-button" to="/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;