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