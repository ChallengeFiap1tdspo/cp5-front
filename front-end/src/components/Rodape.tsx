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
<p className="text-sm text-gray-600 dark:text-gray-300"></p>


export default function Rodape() {
  return (
    <footer className="py-4 text-center text-sm text-gray-600 border-t mt-6">
      <p>Desenvolvido por: Paulo Estalise - RM: 563811</p>
      <p>Desenvolvido por: Emanuel Italo - RM: 561337</p>
      <p>&copy  direitos Reservados</p>
    </footer>
  );
}
</footer>
