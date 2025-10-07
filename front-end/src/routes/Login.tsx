import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { Usuario } from "../types/usuario";

type FormValues = {
  nomeUsuario: string;
  email: string;
  lembrar?: boolean;
};

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Erro desconhecido";
  }
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<FormValues>({ mode: "onTouched", defaultValues: { lembrar: false } });

  const { login } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);

  useEffect(() => {
    setFocus("nomeUsuario");
  }, [setFocus]);

  async function onSubmit(data: FormValues) {
    setFormError(null);
    try {
      const base = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
      const url = `${base}/usuarios?nomeUsuario=${encodeURIComponent(data.nomeUsuario)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);
      const usuarios = (await res.json()) as Usuario[];

      const found = usuarios.find((u) => u.nomeUsuario === data.nomeUsuario && u.email === data.email);

      if (!found) {
        setFormError("Usuário não encontrado. Verifique nome de usuário e email.");
        return;
      }

      login(found, !!data.lembrar);
      navigate("/home");
    } catch (err: unknown) {
      console.error("Erro no login:", getErrorMessage(err));
      setFormError("Erro ao tentar autenticar. Verifique o servidor ou o console.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-2">Bem-vindo</h2>
        <p className="text-sm text-gray-500 mb-6">Entre na sua conta</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {formError && <div className="text-red-600 text-sm">{formError}</div>}

          <div>
            <label className="block text-sm">Nome de usuário</label>
            <input
              {...register("nomeUsuario", {
                required: "O nome de usuário é obrigatório",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              })}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="seuusuario"
              autoComplete="username"
            />
            {errors.nomeUsuario && <p className="text-red-600 text-sm mt-1">{errors.nomeUsuario.message}</p>}
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              {...register("email", {
                required: "O email é obrigatório",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" },
              })}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="seu@exemplo.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input {...register("lembrar")} type="checkbox" className="h-4 w-4" />
              Lembrar-me
            </label>

            <Link to="/cadastro" className="text-blue-600 text-sm">Criar conta</Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded bg-blue-600 text-white disabled:opacity-60"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
