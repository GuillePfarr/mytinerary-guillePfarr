import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  verifyEmail,
  resendVerification,
} from "../redux/actions/userActions";

export default function VerifyEmail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialEmail = location.state?.email || "";

  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (payload) => {
    if (!payload) return "No se pudo verificar el email";
    return payload.error || payload.message || "No se pudo verificar el email";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !code.trim()) {
      setError("Completá email y código.");
      return;
    }

    setLoading(true);

    try {
      const result = await dispatch(
        verifyEmail({
          email: email.trim(),
          code: code.trim(),
        })
      );

      if (verifyEmail.rejected.match(result)) {
        setError(getErrorMessage(result.payload));
        return;
      }

      setSuccess("Email verificado correctamente. Redirigiendo...");

      setTimeout(() => {
        navigate("/devices", { replace: true });
      }, 700);
    } finally {
      setLoading(false);
    }
  };

    const handleResend = async () => {
  setError("");
  setSuccess("");

  if (!email.trim()) {
    setError("Ingresá tu email.");
    return;
  }

  setLoading(true);

  try {
    const result = await dispatch(
      resendVerification({
        email: email.trim(),
      })
    );

    if (resendVerification.rejected.match(result)) {
      setError(
        result.payload?.error || "No se pudo reenviar el código"
      );
      return;
    }

    setSuccess(
      result.payload?.message ||
        "Te enviamos un nuevo código."
    );
  } finally {
    setLoading(false);
  }
};

  return (
  <div
    style={{
      minHeight: "100vh",
      padding: 24,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      background: "#f7f7f7",
      position: "relative",
      zIndex: 10,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 460,
        background: "white",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        color: "#222",
      }}
    >
      <h2>Verificar email</h2>

      <p>
        Ingresá el código que enviamos a tu email. En desarrollo, el código se
        muestra en la consola del backend.
      </p>

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

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            type="email"
            value={email}
            style={{ width: "100%", padding: 10, marginTop: 4 }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Código
          <input
            type="text"
            value={code}
            style={{ width: "100%", padding: 10, marginTop: 4 }}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ej: 123456"
          />
        </label>

        <button type="submit" disabled={loading} style={{ padding: 10 }}>
          {loading ? "Verificando..." : "Verificar email"}
        </button>

        <button
  type="button"
  onClick={handleResend}
  disabled={loading}
  style={{ padding: 10 }}
>
  {loading ? "Procesando..." : "Reenviar código"}
</button>
      </form>

      <div style={{ marginTop: 16 }}>
        <Link to="/signin">Volver a login</Link>
      </div>
    </div>
  </div>
);
}