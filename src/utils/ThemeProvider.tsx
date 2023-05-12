import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface IThemeContext {
    theme: 'dark' | 'light';
    mode: 'auto' | 'daynight';
    toggleTheme: () => void;
    toggleMode: () => void;
}

const ThemeContext = createContext<IThemeContext>({
    theme: 'dark',
    mode: 'auto',
    toggleTheme: () => console.log('Not implemented!'),
    toggleMode: () => console.log('Not implemented!'),
});

export const ThemeProvider: React.FC<PropsWithChildren<Record<string, unknown>>> = ({
    children,
}: PropsWithChildren<Record<string, unknown>>) => {
    const [mode, setMode] = useState<'auto' | 'daynight'>('auto');

    const [theme, setTheme] = useState<'dark' | 'light'>(getTheme(mode));

    function getTheme(mode: IThemeContext['mode']) {
        const hours = new Date().getHours();
        if (mode === 'daynight') {
            return hours > 6 && hours < 18 ? 'light' : 'dark';
        } else {
            return (
                (window.location.search && (new URLSearchParams(window.location.search).get('theme') as 'dark' | 'light')) ||
                (window.localStorage && (window.localStorage.getItem('theme') as 'dark' | 'light')) ||
                (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') ||
                'light'
            );
        }
    }

    const toggleMode = () => {
        setMode((value) => (value === 'auto' ? 'daynight' : 'auto'));
    };

    const toggleTheme = () => {
        setTheme((value) => (value === 'dark' ? 'light' : 'dark'));
    };

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }, [theme]);

    useEffect(() => {
        let themeFromQuery: string | null = null;
        if (window.location.search && (themeFromQuery = new URLSearchParams(window.location.search).get('theme'))) {
            window.localStorage.setItem('theme', themeFromQuery);
        }
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme, mode, toggleMode }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
