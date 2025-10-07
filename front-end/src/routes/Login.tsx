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