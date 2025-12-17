// routes/proprietarioroutes.js
import Usuario from "#models/Usuario.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

/* ------------------------------
   CREATE - novo Usuario
   POST /api/Usuarios
------------------------------ */
export async function create(req, res) {
  console.log("POST /api/usuario body:", req.body);
  const { nome, email, senha } = req.body ?? {};

  // validações básicas
  if (!nome || !email || !senha) {
    return res.status(400).json({
      error: "Campos obrigatórios: nome, email e senha.",
    });
  }

  try {
    // Verifica se já existe um usuário com o mesmo email
    const existing = await Usuario.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email já está em uso." });
    }

    // Cria novo registro no banco
    const novoUsuario = await Usuario.create({ nome, email, senha });

    // Remove o campo senha do retorno
    const safeUser = { ...novoUsuario.toJSON() };
    delete safeUser.senha;

    res.status(201).json({
      message: "Proprietário criado com sucesso!",
      user: safeUser,
    });
  } catch (error) {
    console.error("Erro ao criar proprietário:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao criar proprietário", message: error.message });
  }
};


/* ------------------------------
   LOGIN
------------------------------ */
const SECRET_KEY = process.env.JWT_SECRET; // Chave secreta para assinar o token

console.log("SECRET_KEY:", SECRET_KEY);
export async function login(req, res) {
  console.log("POST /api/login body:", req.body);
  const { email, senha } = req.body ?? {};

  if (!email || !senha) {
    return res
      .status(400)
      .json({ error: "Por favor envie 'email' e 'senha' no body (JSON)." });
  }

  try {
    const user = await Usuario.findOne({ where: { email } });
    console.log("Resultado findOne:", user && user.toJSON ? user.toJSON() : user);

    if (!user) return res.status(401).json({ error: "Email ou senha inválidos" });

    if (user.senha !== senha) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const safeUser = { ...user.toJSON() };
    delete safeUser.senha;

    // Gerar token JWT
    const token = jwt.sign(
      { id: safeUser.id_usuario, email: safeUser.email }, // payload
      SECRET_KEY, // chave secreta
      { expiresIn: '1h' } // expira em 1 hora
    );

    // Enviar token junto com a resposta
    res.json({
      message: "Login bem-sucedido!",
      user: safeUser,
      token: token
    });

  } catch (error) {
    console.error("Erro na rota /login:", error);
    return res.status(500).json({ error: "Erro interno no servidor", message: error.message });
  }
};

/* ------------------------------
   GET - listar todos
   GET /api/usuarios
------------------------------ */
export async function getAll(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
    res.status(500).json({ error: "Erro ao buscar usuarios" });
  }
};

/* ------------------------------
   GET - buscar por ID
   GET /api/usuario/:id
------------------------------ */
export async function getById(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }
    
    res.json({
      id: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (error) {
    console.error("Erro ao buscar usuario:", error);
    res.status(500).json({ error: "Erro ao buscar usuario" });
  }
};

/* ------------------------------
   PUT - atualizar por ID
   PUT /api/usuario/:id
------------------------------ */
export async function updatebyId(req, res) {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    // Atualiza apenas os campos enviados
    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = senha;

    await usuario.save();
    const safeUser = { ...usuario.toJSON() };
    delete safeUser.senha;

    res.json({ message: "Usuario atualizado com sucesso!", user: safeUser });
  } catch (error) {
    console.error("Erro ao atualizar usuario:", error);
    res.status(500).json({ error: "Erro ao atualizar usuario" });
  }
};

/* ------------------------------
   DELETE - remover por ID
   DELETE /api/usuario/:id
------------------------------ */
export async function deleteById(req, res) {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario não encontrado" });
    }

    await usuario.destroy();
    res.json({ message: "Usuario removido com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover usuario:", error);
    res.status(500).json({ error: "Erro ao remover usuario" });
  }
};

