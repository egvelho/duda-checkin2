import "./globals.css";
import Button from "@/components/button";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header className="bg-white text-black w-full p-4">
          sou o cabeçalho
          <Button>Criar conta</Button>
          <Button>Entrar</Button>
        </header>
        <div className="bg-amber-600">{children}</div>
        <footer>sou o rodapé</footer>
      </body>
    </html>
  );
}
