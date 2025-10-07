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