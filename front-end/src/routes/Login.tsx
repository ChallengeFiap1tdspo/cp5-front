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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Login
          </h2>
          <p className="text-gray-300 text-sm">Entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {formError && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-medium mb-2">Nome de Usuário</label>
            <input 
              {...register("nomeUsuario", { 
                required: "O nome de usuário é obrigatório", 
                minLength: { value: 3, message: "Mínimo 3 caracteres" } 
              })} 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
              placeholder="seuusuario" 
              autoComplete="username"
            />
            {errors.nomeUsuario && (
              <p className="text-red-300 text-xs mt-1">
                {errors.nomeUsuario.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">Email</label>
            <input 
              {...register("email", { 
                required: "O email é obrigatório", 
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato inválido" } 
              })} 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
              placeholder="seu@exemplo.com" 
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-white text-sm">
              <input 
                {...register("lembrar")} 
                type="checkbox" 
                className="w-4 h-4"
              />
              Lembrar-me
            </label>
            <Link to="/cadastro" className="text-cyan-400 text-sm font-medium hover:text-cyan-300">
              Criar conta
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-medium disabled:opacity-50 mt-6"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}