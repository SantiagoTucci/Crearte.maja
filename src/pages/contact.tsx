import { Header } from "@/components/header";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import { instagramPosts } from "@/data/instagram-posts";
import { motion } from "framer-motion";

export default function contact() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-blush-50 to-dusty-rose-50">
        <Header />
        <main className="container mx-auto px-10 py-16 text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blush-400 to-dusty-rose-400">
            ¡Mirá nuestras publicaciones!
          </h1>
          <p className="text-muted-foreground mb-12 text-lg sm:text-xl max-w-2xl mx-auto">
            Descubrí nuestras velas artesanales y promociones exclusivas en Instagram.
          </p>

          <div className="flex justify-center mb-10">
            <Button
              onClick={() => window.open("https://www.instagram.com/crearte.maja/", "_blank")}
              className="flex items-center gap-3 bg-gradient-to-r from-blush-400 to-dusty-rose-400 
                         hover:from-blush-500 hover:to-dusty-rose-500 text-white px-6 py-3 rounded-full
                         shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer" 
            >
              {/* Icono de Instagram */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5c0 3.3-2.45 5.75-5.75 5.75h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.6 3.5 4 5.1 4 7.25v9.5C4 18.9 5.6 20.5 7.75 20.5h8.5c2.15 0 3.75-1.6 3.75-3.75v-9.5c0-2.15-1.6-3.75-3.75-3.75h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-.88a1.12 1.12 0 11-2.25 0 1.12 1.12 0 012.25 0z"/>
              </svg>

              Ir a Instagram
            </Button>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {instagramPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.description}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-800 font-medium">{post.description}</p>
                </div>
              </motion.div>
            ))}
          </div> */}
        </main>
      </div>
    </ThemeProvider>
  );
}