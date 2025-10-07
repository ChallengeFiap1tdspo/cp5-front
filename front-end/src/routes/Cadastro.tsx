import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { Usuario } from "../types/usuario";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
};

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try {
    return String(err);
  } catch {
    return "Erro desconhecido";
  }
}

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ mode: "onTouched" });

  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  async function onSubmit(data: FormValues) {
    setFormError(null);
    setSuccessMsg(null);
    try {
      const base = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

      const resUser = await fetch(`${base}/usuarios?nomeUsuario=${encodeURIComponent(data.nomeUsuario)}`);
      if (!resUser.ok) throw new Error(`Erro na verificação: ${resUser.status}`);
      const usersByName = (await resUser.json()) as Usuario[];
      if (usersByName.length > 0) {
        setFormError("Nome de usuário já existe.");
        return;
      }

      const resEmail = await fetch(`${base}/usuarios?email=${encodeURIComponent(data.email)}`);
      if (!resEmail.ok) throw new Error(`Erro na verificação: ${resEmail.status}`);
      const usersByEmail = (await resEmail.json()) as Usuario[];
      if (usersByEmail.length > 0) {
        setFormError("Email já cadastrado.");
        return;
      }

      const createRes = await fetch(`${base}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: data.nome, nomeUsuario: data.nomeUsuario, email: data.email }),
      });

      if (!createRes.ok) throw new Error(`Erro ao criar usuário: ${createRes.status}`);

      setSuccessMsg("Cadastro realizado com sucesso. Redirecionando para login...");
      reset();
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: unknown) {
      console.error("Erro no cadastro:", getErrorMessage(err));
      setFormError("Erro ao cadastrar. Verifique o servidor ou o console.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-2">Cadastro</h2>
        <p className="text-sm text-gray-500 mb-6">Crie sua conta</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
          {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}

          <div>
            <label className="block text-sm">Nome</label>
            <input
              {...register("nome", { required: "O nome é obrigatório" })}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="Seu nome completo"
            />
            {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
          </div>

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
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato inválido" },
              })}
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="seu@exemplo.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={isSubmitting} className="py-2 px-4 rounded bg-green-600 text-white disabled:opacity-60">
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
            <Link to="/login" className="text-sm text-blue-600">Voltar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
