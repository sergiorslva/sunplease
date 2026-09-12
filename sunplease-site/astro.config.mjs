// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const siteUrl = process.env.PUBLIC_SITE_URL;

export default defineConfig({
	// Set PUBLIC_SITE_URL in Cloudflare Pages once the production domain is known.
	...(siteUrl ? { site: siteUrl } : {}),
	integrations: siteUrl ? [sitemap()] : [],
});
