// Define available languages
export type Language = 'en' | 'ru';

// Default language
export const DEFAULT_LANGUAGE: Language = 'en';

// Map of language codes to their full names
export const LANGUAGE_NAMES: Record<Language, string> = {
    en: 'English',
    ru: 'Русский'
};

// Check if a language code is valid
export const isValidLanguage = (lang?: string): lang is Language => {
    return !!lang && Object.keys(LANGUAGE_NAMES).includes(lang);
};

// Get language from URL or default to English
export const getLanguageFromURL = (url: URL): Language => {
    const pathname = url.pathname;

    // Check for language paths like /en/ or /ru/
    const match = pathname.match(/^\/(en|ru)(\/|$)/);
    if (match && isValidLanguage(match[1])) {
        return match[1] as Language;
    }

    // Check for blog paths like /blog/en/ or /blog/ru/
    const blogMatch = pathname.match(/^\/blog\/(en|ru)(\/|$)/);
    if (blogMatch && isValidLanguage(blogMatch[1])) {
        return blogMatch[1] as Language;
    }

    return DEFAULT_LANGUAGE;
};

// Get translated content based on language
export const getTranslation = <T>(translations: Record<Language, T>, language: Language): T => {
    return translations[language] || translations[DEFAULT_LANGUAGE];
}; 