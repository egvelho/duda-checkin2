// 1) Pra importar, precisa exportar
// 2) Componentes precisam ser nomeados em PascalCase
// 3) Componentes recebem props e retornam JSX
// 4) Props são um objeto
// 5) Componentes recebem SOMENTE UM PARÂMETRO (as props)
// 6) JSX NÃO É HTML, É SABOR HTML!

export default function Button({ children }) {
  return (
    <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-pink-500 cursor-pointer">
      {children}
    </button>
  );
}
