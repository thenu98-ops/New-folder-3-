export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        canvas: '#F4ECE9',
        cream: '#FBF6F3',
        ink: '#221A1E',
        blush: '#E26D8A',
        'blush-soft': '#FBE3E9',
        'sky-soft': '#E3F2FA',
        'sky-deep': '#2F6E9E',
        'peach-soft': '#FDEBD3',
        'peach-deep': '#A35A1C',
        'lavender-soft': '#EDE6FC',
        'lavender-deep': '#6A4FC2',
        muted: '#8A7A7F',
        line: '#EADFDB',
        gold: '#D4A84F',
        wood: '#6B4430',
        'wood-dark': '#4E301F',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(34,26,30,0.04), 0 30px 60px -30px rgba(34,26,30,0.22)',
        button: '0 1px 0 rgba(255,255,255,0.12) inset, 0 8px 20px -8px rgba(34,26,30,0.45)',
      },
    },
  },
};
