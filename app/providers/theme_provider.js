
import { createContext, useContext, useState } from "react";
import { LIGHT, DARK } from "../constants";

const ThemeContext = createContext(LIGHT);

export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState(LIGHT);

    const toggleTheme = () => {
        setTheme(theme == LIGHT? DARK : LIGHT)
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

