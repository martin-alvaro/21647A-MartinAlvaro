import { Post } from './model/db.model.js'; 

export const validateCreatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).send('Los campos "title" y "content" son obligatorios.');
  } else {
    next();
  }
};

//para que no se dupliquen 
export const checkDuplicatePost = async (req, res, next) => {
  try {
    const { title } = req.body;

    const existingPost = await Post.findOne({
      where: { title },
    });

    if (existingPost) {
      return res.status(409).send('Ya existe una publicación con el mismo título.');
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el middleware de comprobación de duplicados');
  }
};
