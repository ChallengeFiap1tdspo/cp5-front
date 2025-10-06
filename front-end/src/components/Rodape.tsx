import React from "react";

type Contributor = {
  name: string;
  rm: string;
};

const contributors: Contributor[] = [
  { name: "Paulo Estalise", rm: "563811" },
  { name: "Emanuel Italo", rm: "561337" },
];

export default function Rodape() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Rodapé da página"
      className="py-6 mt-6 border-t bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Desenvolvido por:
          </p>
          <ul className="mt-1 space-y-1">
            {contributors.map((c) => (
              <li
                key={c.rm}
                className="text-sm text-gray-700 dark:text-gray-200/90 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 inline-block" aria-hidden />
                <span>
                  {c.name} <span className="text-xs text-gray-500">- RM: {c.rm}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {year} - Direitos reservados</p>
          <p className="text-xs text-gray-400 mt-1">Feito com atenção aos detalhes</p>
        </div>
      </div>
    </footer>
  );
}
