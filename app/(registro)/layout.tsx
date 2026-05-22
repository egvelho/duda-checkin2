import { Card, CardContent } from "@/components/card";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl shadow-secondary-200/40 border-secondary-100">
          <CardContent className="p-8 md:p-10">{children}</CardContent>
        </Card>
      </div>
    </main>
  );
}
