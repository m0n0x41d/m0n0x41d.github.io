import React, { useState, useEffect } from 'react';
import { StyledLanguageSwitcher } from './styled';

interface LanguageSwitcherProps {
    currentLang: string;
    targetLang?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    currentLang,
    targetLang
}) => {
    // Default values if not specified
    const currLang = currentLang || 'en';
    const tgtLang = targetLang || (currLang === 'en' ? 'ru' : 'en');

    // Use state to store the target URL
    const [targetUrl, setTargetUrl] = useState(`/${tgtLang}`);

    // Only run on client-side after component mounts
    useEffect(() => {
        // Get current URL path and replace language parameter
        const getTargetUrl = () => {
            const path = window.location.pathname;

            // If we're already on a language route, replace the language part
            if (path.startsWith('/en/') || path.startsWith('/ru/')) {
                return path.replace(/^\/(en|ru)\//, `/${tgtLang}/`);
            }
            // If we're on a lang-only route like /en or /ru
            else if (path === '/en' || path === '/ru') {
                return `/${tgtLang}`;
            }
            // Handle legacy blog specific URLs (for backward compatibility)
            else if (path.startsWith('/blog/en/') || path.startsWith('/blog/ru/')) {
                const blogPath = path.replace(/^\/blog\/(en|ru)\//, '/');
                return `/${tgtLang}/blog/${blogPath}`;
            }
            // For legacy language root like /blog/en or /blog/ru (for backward compatibility)
            else if (path === '/blog/en' || path === '/blog/ru') {
                return `/${tgtLang}/blog`;
            }
            // For root path or other paths not yet migrated
            else if (path === '/') {
                return `/${tgtLang}`;
            }
            // For other paths not yet structured with language
            else {
                return `/${tgtLang}${path}`;
            }
        };

        // Set the target URL after component mounts
        setTargetUrl(getTargetUrl());
    }, [tgtLang]); // Re-run if target language changes

    const handleLanguageSwitch = (e: React.MouseEvent<HTMLAnchorElement>) => {
        localStorage.setItem('preferredLanguage', tgtLang);
    };

    return (
        <StyledLanguageSwitcher
            href={targetUrl}
            onClick={handleLanguageSwitch}
        >
            {tgtLang.toUpperCase()}
        </StyledLanguageSwitcher>
    );
}; 