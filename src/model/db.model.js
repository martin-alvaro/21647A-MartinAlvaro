// Importacion de Sequelize y configuracion inicial
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

// Creacion de Sequelize para la conexion a la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Definicion del modelo 'Post' que representa las publicaciones en la base de datos
const Post = sequelize.define('post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // El título no puede ser nulo
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // El contenido no puede ser nulo
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // La URL de la imagen puede ser nula
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false, // La fecha de creación no puede ser nula
  },
});

export { sequelize, Post }; // Exportacion de la instancia de Sequelize y el modelo 'Post'
