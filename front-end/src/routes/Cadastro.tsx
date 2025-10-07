import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Cadastro
          </h2>
          <p className="text-gray-300 text-sm">Crie sua conta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          {formError && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
              {formError}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-200 px-4 py-3 rounded-xl text-sm">
              {successMsg}
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-medium mb-2">Nome Completo</label>
            <input 
              {...register("nome", { required: "O nome é obrigatório" })} 
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-cyan-400"
              placeholder="Seu nome completo"
            />
            {errors.nome && (
              <p className="text-red-300 text-xs mt-1">
                {errors.nome.message}
              </p>
            )}
          </div>

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

          <div className="flex items-center justify-between gap-4 pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Cadastrando..." : "Criar Conta"}
            </button>
            
            <Link 
              to="/login" 
              className="text-cyan-400 text-sm font-medium hover:text-cyan-300"
            >
              Voltar ao login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}