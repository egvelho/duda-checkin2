import Link from "next/link";
import Button from "@/components/button";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/card";
import { Timer, FileText, Users, ChevronRight } from "lucide-react";

const texts = {
  hero: {
    title: "Registro de presenças com QRCode",
    titleHighlight: "que é grátis e FOSS",
    description:
      "Criei essa parada porque não aguentava mais ver um monte de app lixoso tentando me arrancar dinheiro. Isso aqui é grátis e eu não tô nem aí se tu vai usar pra aula, evento ou sei-lá-mais-o-quê. Só quero que ninguém mais tenha que perder tempo procurando uma ferramenta pra resolver um problema estupidamente simples como este.",
    ctaPrimary: "Criar conta",
    ctaPrimaryHref: "/criar-conta",
    ctaSecondary: "Fazer um sanduíche",
    ctaSecondaryHref: "/criar-conta",
  },
  featuresSection: {
    title: "Por que tu precisaria usar esta parada?",
    items: [
      {
        title: "Serve pra fazer a chamada rapidinho",
        description:
          "Tu mostra o QRCode a galera escaneia e tá safe. Não vou encher teu saco tentando te vender um produto que você não precisa.",
        colorClass: "bg-blue-100 text-primary",
        icon: <Timer size={24} />,
      },
      {
        title: "Exportação de relatórios",
        description:
          "Tu consegue exportar faltas e presenças para os formatos .Pdf e Xlsx. Afinal, isso aqui pode sair do ar a qualquer momento, né... é brincadeira (ou não).",
        colorClass: "bg-green-100 text-green-600",
        icon: <FileText size={24} />,
      },
      {
        title: "Dá pra registrar todo mundo",
        description:
          "Pode criar quantas turmas/eventos quiser com a tranquilidade de que ninguém vai ficar atrás do seu rico dinheirinho. Talvez eu peça pra você doar pra ajudar a ONG aqui da minha cidade a salvar os gatinhos de rua, mas juro que mais nada além disso.",
        colorClass: "bg-purple-100 text-purple-600",
        icon: <Users size={24} />,
      },
    ] as Feature[],
  },
};

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white pt-16">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          <span className="text-primary">{texts.hero.title}</span>
          <br />
          {texts.hero.titleHighlight}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10">
          {texts.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={texts.hero.ctaPrimaryHref} passHref>
            <Button
              variant="primary"
              size="lg"
              className="gap-2 w-full sm:w-auto"
            >
              {texts.hero.ctaPrimary}
              <ChevronRight size={18} />
            </Button>
          </Link>
          <Link href={texts.hero.ctaSecondaryHref} passHref>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {texts.hero.ctaSecondary}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card>
      <CardHeader className="pb-0">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${feature.colorClass}`}
        >
          {feature.icon}
        </div>
        <CardTitle>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </CardContent>
    </Card>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {texts.featuresSection.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {texts.featuresSection.items.map((item, index) => (
            <FeatureCard key={index} feature={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
