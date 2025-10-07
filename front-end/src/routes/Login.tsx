import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Usuario } from "../types/usuario";
import { useAuth } from "../contexts/AuthContext";


type FormValues = {
nomeUsuario: string;
email: string;
lembrar?: boolean;
};

export default function Login() {
const {
register,
handleSubmit,
formState: { errors, isSubmitting },
} = useForm<FormValues>({ mode: "onTouched", defaultValues: { lembrar: false } });

const { login } = useAuth();
const navigate = useNavigate();
const [formError, setFormError] = useState<string | null>(null);
const nameRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
nameRef.current?.focus();
}, []);


async function onSubmit(data: FormValues) {
setFormError(null);
try {
const resp = await api.get<Usuario[]>("/usuarios", {
params: { nomeUsuario: data.nomeUsuario },
});

const found = resp.data.find(
(u) => u.nomeUsuario === data.nomeUsuario && u.email === data.email
);

if (!found) {
setFormError("Usuário não encontrado. Verifique nome de usuário e email.");
return;
}



login(found, !!data.lembrar);
navigate("/home");
} catch (err) {
console.error(err);
setFormError("Erro ao tentar autenticar. Confira o console para detalhes.");
}
}

return (
<div className="min-h-[70vh] flex items-center justify-center px-4">
<div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
<header className="mb-6 text-center">
<div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mb-3">


</div>

<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Bem-vindo</h2>
<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Entre na sua conta para continuar</p>
</header>


<form onSubmit={handleSubmit(onSubmit)} noValidate>
{formError && (
<div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700" role="alert">
{formError}
</div>
)}

<div className="mb-4">
<label htmlFor="nomeUsuario" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
Nome de usuário
</label>
<input
id="nomeUsuario"
type="text"
aria-invalid={!!errors.nomeUsuario}
{...register("nomeUsuario", {
required: "O nome de usuário é obrigatório",
minLength: { value: 3, message: "Mínimo 3 caracteres" },
})}
ref={(e) => {
register("nomeUsuario");
nameRef.current = e;
}}
className={`mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
errors.nomeUsuario ? "border-red-300" : "border-gray-200 dark:border-gray-700"
} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
placeholder="seuusuario"
autoComplete="username"
/>
{errors.nomeUsuario && (
<p className="mt-1 text-sm text-red-600" role="alert">
{errors.nomeUsuario.message}
</p>
)}
</div>
<div className="mb-4">
<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
Email
</label>
<input
id="email"
type="email"
aria-invalid={!!errors.email}
{...register("email", {
required: "O email é obrigatório",
pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de email inválido" },
})}
className={`mt-1 block w-full rounded-lg border px-4 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
errors.email ? "border-red-300" : "border-gray-200 dark:border-gray-700"
} bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
placeholder="seu@exemplo.com"
autoComplete="email"
/>
{errors.email && (
<p className="mt-1 text-sm text-red-600" role="alert">
{errors.email.message}
</p>
)}
</div>


<div className="mb-6 flex items-center gap-3">
<label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
<input {...register("lembrar")} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
Lembrar-me
</label>


<div className="ml-auto text-sm">
<Link to="/recuperar" className="text-blue-600 dark:text-blue-400 hover:underline">
Esqueci minha senha
</Link>
</div>
</div>


<div className="flex items-center gap-3">
<button
type="submit"
disabled={isSubmitting}
className={`flex h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-white shadow-sm transition disabled:opacity-60 ${
isSubmitting ? "bg-blue-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"
}`}
aria-busy={isSubmitting}
>
  {isSubmitting && (
<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
<circle cx="12" cy="12" r="10" strokeOpacity="0.25" strokeWidth="4" stroke="currentColor" />
<path d="M22 12a10 10 0 00-10-10" strokeWidth="4" strokeLinecap="round" stroke="currentColor" />
</svg>
)}
<span>{isSubmitting ? "Entrando..." : "Entrar"}</span>
</button>


<Link
to="/cadastro"
className="flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 dark:border-gray-700 dark:text-gray-200"
>
Criar conta
</Link>
</div>
</form>


<p className="mt-6 text-center text-xs text-gray-400">Ao continuar, você concorda com os termos de uso.</p>
</div>
</div>
);
}