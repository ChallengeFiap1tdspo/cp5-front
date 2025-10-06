import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Usuario } from "../types/usuario";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

type FormValues = {
  nomeUsuario: string;
  email: string;
  lembrar?: boolean;
};

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function onSubmit(data: FormValues) {
    try {
      const resp = await api.get<Usuario[]>("/usuarios", {
        params: { nomeUsuario: data.nomeUsuario }
      });

      const found = resp.data.find(u => u.nomeUsuario === data.nomeUsuario && u.email === data.email);
      if (!found) {
        // mensagem de erro personalizada
        alert("Usuário não encontrado. Verifique nome de usuário e email.");
        return;
      }

      login(found, !!data.lembrar);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar autenticar. Verifique o servidor.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label className="block text-sm">Nome de usuário</label>
          <input
            {...register("nomeUsuario", { required: "O nome de usuário é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="nomeUsuario"
          />
          {errors.nomeUsuario && <p className="text-red-600 text-sm mt-1">{errors.nomeUsuario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            {...register("email", { required: "O email é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" } })}
            className="w-full mt-1 p-2 border rounded"
            placeholder="seu@exemplo.com"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input {...register("lembrar")} type="checkbox" id="lembrar" />
          <label htmlFor="lembrar" className="text-sm">Lembrar-me (localStorage)</label>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded">Entrar</button>
          <Link to="/cadastro" className="px-4 py-2 border rounded self-center">Criar conta</Link>
        </div>
      </form>
    </div>
  );
}
