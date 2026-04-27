import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  requestPasswordReset,
  resetPassword,
} from "../redux/actions/userActions";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const askCode = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Ingresá tu email.");
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        requestPasswordReset({
          email: email.trim(),
        })
      );

      if (requestPasswordReset.rejected.match(result)) {
        setError(result.payload?.error || "No se pudo enviar código");
        return;
      }

      setSuccess("Te enviamos un código.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !code.trim() || !password.trim()) {
      setError("Completá todos los campos.");
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        resetPassword({
          email: email.trim(),
          code: code.trim(),
          password,
        })
      );

      if (resetPassword.rejected.match(result)) {
        setError(result.payload?.error || "No se pudo cambiar contraseña");
        return;
      }

      setSuccess("Contraseña actualizada correctamente.");
      setCode("");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 460, margin: "0 auto" }}>
      <h2>Recuperar contraseña</h2>

      {error && (
        <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
      )}

      {success && (
        <div style={{ color: "green", marginBottom: 12 }}>{success}</div>
      )}

      {step === 1 && (
        <form onSubmit={askCode} style={{ display: "grid", gap: 12 }}>
          <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar código"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={changePassword} style={{ display: "grid", gap: 12 }}>
          
          
           <input
  type="email"
  name="reset-email"
  value={email}
  readOnly
  autoComplete="off"
/>

          <input
  type="text"
  name="verification-code"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Código recibido"
  value={code}
  onChange={(e) => setCode(e.target.value)}
  autoComplete="one-time-code"
/>

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Cambiar contraseña"}
          </button>
        </form>
      )}

      <div style={{ marginTop: 16 }}>
        <Link to="/signin">Volver a login</Link>
      </div>
    </div>
  );
}