import { getCollection } from 'astro:content';

// Функция для добавления ведущего нуля
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

// Функция для форматирования даты в формат ISO
function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}

export async function get() {
    const site = 'https://ivanzakutnii.com';

    // Соберем все страницы
    const staticPages = [
        { url: '/en', lastmod: formatDate(new Date()), changefreq: 'weekly', priority: '1.0' },
        { url: '/ru', lastmod: formatDate(new Date()), changefreq: 'weekly', priority: '1.0' },
        { url: '/en/about', lastmod: formatDate(new Date()), changefreq: 'monthly', priority: '0.8' },
        { url: '/ru/about', lastmod: formatDate(new Date()), changefreq: 'monthly', priority: '0.8' },
        { url: '/en/contact', lastmod: formatDate(new Date()), changefreq: 'monthly', priority: '0.7' },
        { url: '/ru/contact', lastmod: formatDate(new Date()), changefreq: 'monthly', priority: '0.7' },
        { url: '/en/blog', lastmod: formatDate(new Date()), changefreq: 'daily', priority: '0.9' },
        { url: '/ru/blog', lastmod: formatDate(new Date()), changefreq: 'daily', priority: '0.9' },
    ];

    // Соберем посты блога
    const blogEntries = await getCollection('blog');
    const blogPages = blogEntries.map(entry => {
        const lang = entry.data.language;
        const slug = entry.slug.split('/').pop();

        return {
            url: `/${lang}/blog/${slug}`,
            lastmod: formatDate(entry.data.pubDate),
            changefreq: 'monthly',
            priority: '0.7'
        };
    });

    const pages = [...staticPages, ...blogPages];

    // Сгенерируем XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${pages.map(page => `
  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.url.startsWith('/en') ?
            `<xhtml:link rel="alternate" hreflang="en" href="${site}${page.url}" />
      <xhtml:link rel="alternate" hreflang="ru" href="${site}${page.url.replace('/en/', '/ru/')}" />` :
            `<xhtml:link rel="alternate" hreflang="ru" href="${site}${page.url}" />
      <xhtml:link rel="alternate" hreflang="en" href="${site}${page.url.replace('/ru/', '/en/')}" />`}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}${page.url.startsWith('/ru/') ? page.url.replace('/ru/', '/en/') : page.url}" />
  </url>`).join('')}
</urlset>`.trim();

    return {
        body: sitemap,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600'
        }
    };
} 