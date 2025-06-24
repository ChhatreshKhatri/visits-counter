import { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Visits Counter",
    short_name: "Visits",
    start_url: ".",
    display: "standalone",
    background_color: "#111111",
    description: "A simple visits counter with a customizable badge",
    theme_color: "#111111",
    lang: "en-IN",
    icons: [
      {
        src: "https://cdn.chhatreshkhatri.com/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "https://cdn.chhatreshkhatri.com/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://cdn.chhatreshkhatri.com/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
