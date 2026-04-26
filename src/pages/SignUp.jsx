import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../redux/actions/userActions";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const initialForm = {
  name: "",
  email: "",
  password: "",
  image: "",
  country: "",
};

const SignUp = () => {
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all?fields=name").then(({ data }) => {
      const countryNames = data.map((country) => country.name.common).sort();
      setCountries(countryNames);

      if (countryNames.length > 0) {
        setForm((prev) => ({
          ...prev,
          country: prev.country || countryNames[0],
        }));
      }
    });
  }, []);

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (payload) => {
    if (!payload) return "No se pudo crear el usuario";

    if (Array.isArray(payload.errors)) {
      return payload.errors.join(" · ");
    }

    return payload.error || payload.message || "No se pudo crear el usuario";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.image || !form.country) {
      setError("Completá todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        signUp({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
          image: form.image.trim(),
          country: form.country,
        })
      );

      if (signUp.rejected.match(result)) {
        setError(getErrorMessage(result.payload));
        return;
      }

      setSuccess("Usuario creado correctamente. Redirigiendo...");
      setForm(initialForm);

      setTimeout(() => {
        navigate("/devices");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitGoogle = async (data) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const body = {
        name: `${data.given_name || ""} ${data.family_name || ""}`.trim(),
        email: data.email,
        password: data.sub + import.meta.env.VITE_GG_KEY,
        image: data.picture,
        country: "Argentina",
      };

      const result = await dispatch(signUp(body));

      if (signUp.rejected.match(result)) {
        setError(getErrorMessage(result.payload));
        return;
      }

      setSuccess("Usuario creado correctamente. Redirigiendo...");

      setTimeout(() => {
        navigate("/devices");
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: "crimson", marginBottom: 12, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: "green", marginBottom: 12, fontWeight: 600 }}>
            {success}
          </div>
        )}

        <label className="signup-label">
          Name
          <input
            type="text"
            name="name"
            className="signup-input"
            value={form.name}
            onChange={updateField}
          />
        </label>

        <label className="signup-label">
          Email
          <input
            type="email"
            name="email"
            className="signup-input"
            value={form.email}
            onChange={updateField}
          />
        </label>

        <label className="signup-label">
          Password
          <input
            type="password"
            name="password"
            className="signup-input"
            value={form.password}
            onChange={updateField}
          />
        </label>

        <label className="signup-label">
          Image
          <input
            type="url"
            name="image"
            className="signup-input"
            value={form.image}
            onChange={updateField}
          />
        </label>

        <label className="signup-label">
          Country
          <select
            name="country"
            className="signup-input"
            value={form.country}
            onChange={updateField}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>

        <button className="bt btn-secondary" type="submit" disabled={loading}>
          {loading ? "Creando usuario..." : "Registrarse"}
        </button>

        <GoogleOAuthProvider clientId="445761792247-dbcpi8hmi2o5mv47rjaam9l30eqq4uku.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const infoUser = jwtDecode(credentialResponse.credential);
              handleSubmitGoogle(infoUser);
            }}
            onError={() => {
              setError("No se pudo registrar con Google");
            }}
          />
        </GoogleOAuthProvider>

        <div className="button-wrapper">
          <p className="cta-text">Already registered?</p>
          <Link className="button cta-signup-button" to="/signin">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;