import type { Credentials } from "../type";
import { api } from "./client";

// Auth Service
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);
