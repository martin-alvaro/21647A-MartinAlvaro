import { Post } from './model/db.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.render('index', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener las publicaciones');
  }
};

export const getCreatePost = (req, res) => {
  res.render('create');
};

export const postCreatePost = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  try {
    await Post.create({
      title,
      content,
      imageUrl
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear la publicación');
  }
};

export const getUpdatePost = async (req, res) => {
  const postId = parseInt(req.params.postId, 10);

  try {
    const post = await Post.findByPk(postId);

    if (post) {
      res.render('update', { post });
    } else {
      console.log('La publicación no existe');
      res.status(404).send('La publicación no existe');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la publicación para actualizar');
  }
};

export const postUpdatePost = async (req, res) => {
  const postId = parseInt(req.body.postId, 10);
  const { title, content, imageUrl } = req.body;

  try {
    const post = await Post.findByPk(postId);

    if (post) {
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;

      await post.save();

      console.log('Publicación actualizada:', post);

      res.redirect('/');
    } else {
      console.log('La publicación no existe');
      res.status(404).send('La publicación no existe');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar la publicación');
  }
};

export const postDeletePost = async (req, res) => {
  const postId = parseInt(req.body.postId, 10);

  try {
    const post = await Post.findByPk(postId);

    if (post) {
      await post.destroy();
      console.log('Publicación eliminada:', post);

      res.redirect('/');
    } else {
      console.log('La publicación no existe');
      res.status(404).send('La publicación no existe');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar la publicación');
  }
};

