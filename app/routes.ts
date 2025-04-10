import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route("Login", "routes/Login.tsx"),
    route ("PáginaPrincipal","routes/PaginaPrincipal.tsx"),
    route("DetalhesFilme/:id", "routes/PaginaDetalhes.tsx")
] satisfies RouteConfig;
