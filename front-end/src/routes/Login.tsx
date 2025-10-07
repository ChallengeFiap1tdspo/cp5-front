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
{/* Logo/Inicial */}
<span>SI</span>
</div>

<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Bem-vindo de volta</h2>
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