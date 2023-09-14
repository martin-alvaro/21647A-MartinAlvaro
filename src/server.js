// Importacion de modulos y configuraciones iniciales del servidor
import express from 'express';
import postRoutes from './routes.js';
import { sequelize } from './model/db.model.js'; 
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';

// Creacion de Express y configuración inicial
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

// Configuracion de middleware y rutas
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use('/', postRoutes);
app.use(morgan('combined'));
app.use(cors());

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

// Conexion a la base de datos utilizando Sequelize
try {
  await sequelize.sync();
  console.log('Conexión a la base de datos establecida correctamente');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error);
}
