import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

type FormValues = {
  nome: string;
  nomeUsuario: string;
  email: string;
};

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: "onTouched", defaultValues: { nome: "", nomeUsuario: "", email: "" } });

  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    setFocus("nome");
  }, [setFocus]);

  async function onSubmit(data: FormValues) {
    setFormError(null);

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
        email: data.email,
      });


      alert("Cadastro realizado com sucesso. Faça login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setFormError("Erro no cadastro. Verifique o servidor ou tente novamente mais tarde.");
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Criar conta</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preencha os dados para criar sua conta</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {formError && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                {...register("nome", { required: "Nome é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.nome ? "border-red-300" : "border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                aria-invalid={!!errors.nome}
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nome de usuário
              </label>
              <input
                id="nomeUsuario"
                type="text"
                placeholder="nomedeusuario"
                autoComplete="username"
                {...register("nomeUsuario", { required: "Nome de usuário é obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } })}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.nomeUsuario ? "border-red-300" : "border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                aria-invalid={!!errors.nomeUsuario}
              />
              {errors.nomeUsuario && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.nomeUsuario.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@exemplo.com"
                autoComplete="email"
                {...register("email", { required: "Email é obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } })}
                className={`mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.email ? "border-red-300" : "border-gray-200 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-white shadow-sm transition disabled:opacity-60 ${
                isSubmitting ? "bg-green-500" : "bg-gradient-to-r from-green-600 to-emerald-600"
              }`}
              aria-busy={isSubmitting}
            >
              {isSubmitting && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" stroke="currentColor" />
                  <path d="M22 12a10 10 0 00-10-10" strokeWidth="4" strokeLinecap="round" stroke="currentColor" />
                </svg>
              )}
              <span>{isSubmitting ? "Cadastrando..." : "Cadastrar"}</span>
            </button>

            <button type="button" onClick={() => navigate("/login")} className="h-10 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-200">
              Voltar ao login
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-gray-400">Protegemos seus dados. Ao se cadastrar, concorda com nossos termos.</p>
        </form>
      </div>
    </div>
  );
}
