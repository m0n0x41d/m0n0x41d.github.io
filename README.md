# 🚀 Bloobers Template Page astro + react

![bloobers](/src/static/images/preview.webp)

## 🚀 Static Media

There are 3 folders

-   fonts
-   images
-   icons

every of those folders have index.ts where you can find import / export files + for images and icons, we create special components

## 🚀 Images

```http
  <Image src="logo" alt="logo" width="50px" height="50px" />
```

## 🚀 Icons

```http
  <Icon iconData="home" alt="home" />
```

use those componets for media to keep best performance or in astro files use images from astro - also good!

## 🚀 Styles

All global styles like, colors, fonts, normalize or things like mediaQuery are stored in styles folder,

## 🚀 Theme colors

Folder colors > index.ts - you will find enum Colors, DarkTheme, LightTheme, ThemeVar & Theme

to keep code consisted use only enum Theme, to have very easy switch between light and dark colors

## 🧞 Commands

#### All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

# 🚀 Sitemap & robots.tsx

## IMPORTANT

Change links & add all your pages into sitemap.cjs to have better SEO optimization!

search for bloobers in files & replace all instances

## 🧞 Contact & Support

If you have any problems or questions, please let us know here: [Contact Form](https://www.codexcode.store/pages/contact)

## Authors

-   [@codexcode](https://www.codexcode.pl)
