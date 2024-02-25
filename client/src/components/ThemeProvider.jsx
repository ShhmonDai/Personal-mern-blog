import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state.theme);
  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-200 min-h-screen dark:bg-gradient-to-tl from-cyan-700 to-gray-700 transition-colors duration-500'>
            {children}
        </div>
    </div>
  );
}