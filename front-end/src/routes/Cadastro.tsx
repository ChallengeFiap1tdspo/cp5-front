import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
// import type { Usuario } from "../types/usuario";

type FormValues = { nome: string; nomeUsuario: string; email: string; };

function getErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  try { return String(err); } 
  catch { return "Erro desconhecido"; }
}

export default function Cadastro() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ mode: "onTouched" });
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState<string | null>(null);
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);

  async function onSubmit(data: FormValues) {
    setFormError(null); setSuccessMsg(null);
    try {
      const base = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

      const resUser = await fetch(`${base}/usuarios?nomeUsuario=${encodeURIComponent(data.nomeUsuario)}`);
      if (!resUser.ok) throw new Error(`Erro na verificação: ${resUser.status}`);
      if ((await resUser.json()).length > 0) { setFormError("Nome de usuário já existe."); return; }

      const resEmail = await fetch(`${base}/usuarios?email=${encodeURIComponent(data.email)}`);
      if (!resEmail.ok) throw new Error(`Erro na verificação: ${resEmail.status}`);
      if ((await resEmail.json()).length > 0) { setFormError("Email já cadastrado."); return; }

      const createRes = await fetch(`${base}/usuarios`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!createRes.ok) throw new Error(`Erro ao criar usuário: ${createRes.status}`);

      setSuccessMsg("Cadastro realizado com sucesso. Redirecionando...");
      reset(); setTimeout(() => navigate("/login"), 1200);
    } catch (err: unknown) {
      console.error(getErrorMessage(err));
      setFormError("Erro ao cadastrar.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="background-effect bg-blue-effect"></div>
      <div className="background-effect bg-purple-effect"></div>

      <div className="glass-container">
        <h2 className="text-2xl font-bold mb-2">Cadastro</h2>
        <p className="opacity-70 text-sm mb-6">Crie sua conta</p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          {formError && <div className="alert-error">{formError}</div>}
          {successMsg && <div className="alert-success">{successMsg}</div>}

          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input {...register("nome", { required: "O nome é obrigatório" })} className="input-field" placeholder="Seu nome completo" />
            {errors.nome && <p className="text-red-300 text-sm mt-2">{errors.nome.message}</p>}
          </div>

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

          <div className="flex items-center gap-3 pt-4">
            <button type="submit" disabled={isSubmitting} className="button-success">{isSubmitting ? "Cadastrando..." : "Cadastrar"}</button>
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Voltar ao login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
