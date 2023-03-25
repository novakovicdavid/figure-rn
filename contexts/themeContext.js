import {createContext, useCallback, useContext, useMemo, useState} from "react";
import {storage} from "../services/storage";

const ThemeContext = createContext(undefined);



export function ThemeProvider(props) {
    const [theme, setTheme] = useState("#2196f3");

    useMemo(() => {
        storage.loadTheme().then((savedTheme) => {
            if (savedTheme) setTheme(savedTheme);
        });
    }, []);

    const saveTheme = useCallback((themeToSave) => {
        setTheme(themeToSave);
        storage.saveTheme(themeToSave);
    }, []);

    const api = useMemo(() => ({
        theme, saveTheme
    }), [theme]);

    return <ThemeContext.Provider value={api}>
        {props.children}
    </ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext);