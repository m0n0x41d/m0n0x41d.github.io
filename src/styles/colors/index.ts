import { css } from "@emotion/react";

/**
 * Default color palette
 */
export enum Colors {
    white = "#f0f2f5",
    black = "#000000",
    codGray = "#101118",
    pastelGreen = "#61DF61",
}

/**
 * default light mode colors
 * why is done like this?
 * because if you want add dark mode, you can just add enum DarkMode and use :root for dark mode easily^^
 * like we made for light mode
 */
enum LightMode {
    // theme primary colors
    primary = Colors.white,
    secondary = Colors.codGray,
    tertiary = Colors.pastelGreen,

    // theme global colors
    bgElement = Colors.white,
    bgElementSecondary = Colors.codGray,
    // for text
    textDefault = Colors.white,
    textSecondary = Colors.codGray,
}

// Use this in normalize css
export const ThemeVar = css`
    :root {
        --primary: ${LightMode.primary};
        --secondary: ${LightMode.secondary};
        --tertiary: ${LightMode.tertiary};

        --bg-element: ${LightMode.bgElement};
        --bg-element-secondary: ${LightMode.bgElementSecondary};
        --text-default: ${LightMode.textDefault};
        --text-secondary: ${LightMode.textSecondary};
    }
`;

/**
 * @important USE THIS FOR COLORS!
 */
export const Theme = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    tertiary: "var(--tertiary)",

    bgElement: "var(--bg-element)",
    bgElementSecondary: "var(--bg-element-secondary)",
    textDefault: "var(--text-default)",
    textSecondary: "var(--text-secondary)",
};
