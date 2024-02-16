import { Link, useRouteError } from "react-router-dom";

export const Error = () => {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">
        Whoops, algo de errado não está certo...
      </h1>
      <p>Detalhes:</p>
      <pre>{error?.message || JSON.stringify(error)}</pre>
      <p className="text-accent-foreground">
        Voltar para o{" "}
        <Link to="/" className="text-sky-600 dark:text-sky-400">
          Dashboard
        </Link>
      </p>
    </div>
  );
};
