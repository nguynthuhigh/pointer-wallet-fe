/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/flowbite/**/*.js",
     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background-default': "url('assets/images/bg_home.png')",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors:{
        'color-default':'#3BADFF',
        'white':'#FFFFFF',
        'grayy':'#CECECE',
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('daisyui'),
    require("@material-tailwind/react/utils/withMT")
  ],
}

