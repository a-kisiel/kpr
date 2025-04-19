import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('portfolio', 'routes/portfolio.tsx'),
    route("portfolio/:hash", 'routes/exhibit.tsx')
] satisfies RouteConfig;
