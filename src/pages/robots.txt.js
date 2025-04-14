export function get() {
    return {
        body: `
User-agent: *
Allow: /

Sitemap: https://ivanzakutnii.com/sitemap.xml

Host: https://ivanzakutnii.com
`.trim(),
        headers: {
            'Content-Type': 'text/plain'
        }
    };
} 