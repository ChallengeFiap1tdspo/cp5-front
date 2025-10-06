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
