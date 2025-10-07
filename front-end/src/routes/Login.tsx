import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { Usuario } from "../types/usuario";

type FormValues = { nomeUsuario: string; email: string; lembrar?: boolean; };

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try { return String(err); } 
  catch { return "Erro desconhecido"; }
}

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setFocus } = useForm<FormValues>({ mode: "onTouched" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);

  useEffect(() => { setFocus("nomeUsuario"); }, [setFocus]);

  async function onSubmit(data: FormValues) {
    setFormError(null);
    try {
      const base = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
      const res = await fetch(`${base}/usuarios?nomeUsuario=${encodeURIComponent(data.nomeUsuario)}`);
      if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
      const usuarios = (await res.json()) as Usuario[];
      const found = usuarios.find(u => u.nomeUsuario === data.nomeUsuario && u.email === data.email);
      if (!found) { setFormError("Usuário não encontrado."); return; }
      login(found, !!data.lembrar);
      navigate("/home");
    } catch (err: unknown) {
      console.error(getErrorMessage(err));
      setFormError("Erro ao autenticar.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="background-effect bg-blue-effect"></div>
      <div className="background-effect bg-purple-effect"></div>

      <div className="glass-container">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo</h2>
        <p className="opacity-70 text-sm mb-6">Entre na sua conta</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {formError && <div className="alert-error">{formError}</div>}

          <div>
            <label className="block text-sm font-medium">Nome de usuário</label>
            <input {...register("nomeUsuario", { required: "O nome de usuário é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })} className="input-field" placeholder="seuusuario" autoComplete="username" />
            {errors.nomeUsuario && <p className="text-red-300 text-sm mt-2">{errors.nomeUsuario.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input {...register("email", { required: "O email é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato inválido" } })} className="input-field" placeholder="seu@exemplo.com" autoComplete="email" />
            {errors.email && <p className="text-red-300 text-sm mt-2">{errors.email.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input {...register("lembrar")} type="checkbox" className="checkbox-custom" />
              Lembrar-me
            </label>
            <Link to="/cadastro" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Criar conta</Link>
          </div>

          <button type="submit" disabled={isSubmitting} className="button-primary">{isSubmitting ? "Entrando..." : "Entrar"}</button>
        </form>
      </div>
    </div>
  );
}
