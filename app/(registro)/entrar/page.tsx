export default function SignInPage() {
  return (
    <div>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email"
          className="border rounded-md p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded-md p-2"
        />
        <button
          type="submit"
          className="bg-amber-600 text-white text-bold rounded-md p-2"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
