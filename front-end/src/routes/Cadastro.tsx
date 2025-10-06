import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
};

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>();
  const navigate = useNavigate();

  async function onSubmit(data: FormValues) {
    try {
      
      const respUsuario = await api.get("/usuarios", { params: { nomeUsuario: data.nomeUsuario } });
      if (respUsuario.data.length > 0) {
        setError("nomeUsuario", { message: "Nome de usuário já está em uso" });
        return;
      }


      const respEmail = await api.get("/usuarios", { params: { email: data.email } });
      if (respEmail.data.length > 0) {
        setError("email", { message: "Email já cadastrado" });
        return;
      }

    
      await api.post("/usuarios", {
        nome: data.nome,
        nomeUsuario: data.nomeUsuario,
        email: data.email
      });

      alert("Cadastro realizado com sucesso. Faça login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erro no cadastro. Verifique o servidor.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cadastro</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label className="block text-sm">Nome completo</label>
          <input
            {...register("nome", { required: "Nome é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="Seu nome"
          />
          {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm">Nome de usuário</label>
          <input
            {...register("nomeUsuario", { required: "Nome de usuário é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="nomeUsuario"
          />
          {errors.nomeUsuario && <p className="text-red-600 text-sm mt-1">{errors.nomeUsuario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            {...register("email", { required: "Email é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="seu@exemplo.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-green-600 text-white rounded">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
