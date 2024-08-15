module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
  darkMode: "class",
  // darkMode: ['selector', '[data-mode="dark"]'],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif']
    },

    extend: {
      colors: {
        primaryBgColor: '#F5F3F7', // Ana arka plan rengi
        secondaryBgColor: '#E5DFEA', // Sekonder arka plan rengi
        primaryTextColor: '#6B21A8', // Ana metin rengi (mor ton)
        secondaryTextColor: '#4B5563', // Sekonder metin rengi (gri ton)
        accentColor: '#7C3AED', // Vurgulanan mor rengi
        buttonBgColor: '#7C3AED', // Buton arka plan rengi (mor)
        buttonTextColor: '#ffffff', // Buton metin rengi (beyaz)
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
