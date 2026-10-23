const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint Base
app.get('/', (req, res) => {
  res.json({
    mensaje: "API REST - Sistema de Auditorías UTSJR",
    estado: "Activo",
    version: "1.0.0"
  });
});

// 1. Autenticación (RF01)
app.post('/api/auth/login', (req, res) => {
  const { correo } = req.body;
  if (correo && correo.endsWith('@utsjr.edu.mx')) {
    res.status(200).json({
      token: "jwt_token_simulado_utsjr_2026",
      usuario: { id: 1, nombre: "Luis Felipe", rol: "Auditado", correo }
    });
  } else {
    res.status(401).json({ mensaje: "Correo debe pertenecer al dominio @utsjr.edu.mx" });
  }
});

// 2. Programación de Auditorías (RF02)
app.get('/api/auditorias', (req, res) => {
  res.status(200).json([
    { id_auditoria: 1, titulo: "Auditoría CACEI 2026", carrera: "Tecnologías de la Información", estado: "En Proceso" },
    { id_auditoria: 2, titulo: "Auditoría ISO 9001", carrera: "Mantenimiento Industrial", estado: "Programada" }
  ]);
});

// 3. Carga de Evidencias Digitales (RF03)
app.post('/api/evidencias', (req, res) => {
  res.status(201).json({
    id_evidencia: 101,
    mensaje: "Evidencia digital subida correctamente al servidor Linux UTSJR",
    estado_evaluacion: "Pendiente"
  });
});

// 4. Registro de Hallazgos y No Conformidades (RF04)
app.post('/api/hallazgos', (req, res) => {
  res.status(201).json({
    id_hallazgo: 501,
    tipo: "No Conformidad",
    descripcion: "Evidencia incompleta en el punto de evaluación 3.2",
    fecha_compromiso: "2026-11-15"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});