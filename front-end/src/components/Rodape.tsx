import React from "react";

type Contributor = {
name: string;
rm: string;
};

const contributors: Contributor[] = [
{ name: "Paulo Estalise", rm: "563811" },
{ name: "Emanuel Italo", rm: "561337" },
];

export default function Rodape(): JSX.Element {
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
<svg
xmlns="http://www.w3.org/2000/svg"
className="w-4 h-4 opacity-80"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth={2}
strokeLinecap="round"
strokeLinejoin="round"
aria-hidden
>


</svg>
</li>
</footer>
