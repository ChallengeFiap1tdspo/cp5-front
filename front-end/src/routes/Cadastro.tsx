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