import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-32 overflow-hidden">
      {/* Фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 animate-gradient-x opacity-90"></div>

      {/* Эффект сетки/узора */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/memphis-mini.png')] opacity-10"></div>

      {/* Контент поверх */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-6xl font-extrabold mb-6 text-white drop-shadow-lg">
          Добро пожаловать в Emoji Hub 🎉
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Здесь вы найдёте тысячи эмодзи на любой вкус. <br />
          Ищите, сортируйте и сохраняйте свои любимые символы.
        </p>

        <Link
          href="/emojis"
          className="inline-block px-8 py-4 text-lg font-semibold text-purple-700 bg-white rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition"
        >
          Перейти к каталогу →
        </Link>
      </div>
    </section>
  );
}
