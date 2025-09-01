import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Emoji Hub",
  description: "Каталог эмодзи с поиском и фильтрацией",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        {/* Header */}
        <header className="bg-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Emoji Hub
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="hover:underline">
                Главная
              </Link>
              <Link href="/emojis" className="hover:underline">
                Эмодзи
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1 container mx-auto p-6">{children}</main>

        <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
          © {new Date().getFullYear()} Emoji Hub. Все права защищены.
        </footer>
      </body>
    </html>
  );
}
