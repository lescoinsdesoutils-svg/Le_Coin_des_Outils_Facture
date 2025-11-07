import React, { useEffect, useState } from "react";

export default function App() {
  const [params, setParams] = useState({
    nom_entreprise: "Le Coin des Outils",
    adresse: "",
    telephone: "",
    tva: 19.25
  });

  useEffect(() => {
    if (window.api) {
      window.api.getParametres().then((data) => {
        if (data) setParams(data);
      });
    }
  }, []);

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const saveParams = () => {
    if (window.api) {
      window.api.setParametres(params).then(() => alert("Paramètres enregistrés ✅"));
    }
  };

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      padding: 20,
      backgroundColor: "#f5f5f5",
      height: "100vh"
    }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        {params.nom_entreprise} – Tableau de bord
      </h1>

      <div style={{
        margin: "30px auto",
        maxWidth: 600,
        background: "#fff",
        borderRadius: 10,
        padding: 20,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Paramètres de l’entreprise</h2>

        <label>Nom de l’entreprise :</label>
        <input
          name="nom_entreprise"
          value={params.nom_entreprise}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Adresse :</label>
        <input
          name="adresse"
          value={params.adresse}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>Téléphone :</label>
        <input
          name="telephone"
          value={params.telephone}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <label>TVA (%) :</label>
        <input
          name="tva"
          type="number"
          value={params.tva}
          onChange={handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <button
          onClick={saveParams}
          style={{
            background: "#0078D7",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
}
