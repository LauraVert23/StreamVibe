import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"), 
    route ("principal","routes/Principal.tsx"),
    route("detalhes/:id", "routes/Detalhes.tsx"),
    route("busca", "routes/Busca.tsx")
] satisfies RouteConfig;
