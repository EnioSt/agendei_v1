import serviceUser from "../services/service.user.js";

async function Inserir(req, res) {
  const { name, email, password } = req.body;

  try {
      // Verificar se o e-mail já existe no banco de dados
      const existingUser = await serviceUser.findByEmail(email);
      if (existingUser) {
          return res.status(400).json({ error: "E-mail já existe" });
      }

      // Inserir novo usuário caso o e-mail não exista
      const user = await serviceUser.Inserir(name, email, password);
      res.status(201).json(user);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

async function Login (req, res) {

    const {email, password } = req.body;

    const user = await serviceUser.Login(email, password);

    if(user.length == 0)
        res.status(401).json({error: "E-mail ou senha invalida"});
    else
    res.status(200).json(user);
}

async function Profile(req, res) {
    
    const id_user = req.id_user;
    const user = await serviceUser.Profile(id_user);

    res.status(200).json(user)
}

async function InserirAdmin(req, res) {
  const { name, email, password } = req.body;

  try {
      // Verificar se o e-mail já existe no banco de dados
      const existingAdmin = await serviceUser.findByEmail(email);
      if (existingAdmin) {
          return res.status(400).json({ error: "E-mail já existe" });
      }

      // Inserir novo administrador caso o e-mail não exista
      const admin = await serviceUser.InserirAdmin(name, email, password);
      res.status(201).json(admin);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar administrador" });
  }
}

async function LoginAdmin (req, res) {

    const {email, password } = req.body;

    const user = await serviceUser.LoginAdmin(email, password);

    if(user.length == 0)
        res.status(401).json({error: "E-mail ou senha invalida"});
    else
    res.status(200).json(user);
}

/*async function Validar(req, res) {
    const { email } = req.query;

  try {
    const user = await findUserByEmail(email);

    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar o e-mail' });
  }
}*/

async function Listar (req, res) {

  const user = await serviceUser.Listar();

  res.status(200).json(user);
}

export default { Inserir, Login, Profile, InserirAdmin, LoginAdmin, Listar }; 