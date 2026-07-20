# Cosmas Technologies Portfolio

Production portfolio for Cosmas Ogbonna and Cosmas Technologies. It presents verified web, Android, backend, and AI engineering work, project case studies, and engineering articles.

The canonical production URL is **https://cosmas.dev**. `cajazi.github.io` is the GitHub Pages repository identity, not the canonical public URL.

## Stack

- React 19, TypeScript, React Router, Vite, and Tailwind CSS
- Framer Motion for focused reveal animation
- Vitest, React Testing Library, jsdom, and ESLint
- GitHub Actions and GitHub Pages

## Local development

Prerequisites: a current Node.js 20 release and npm.

```powershell
npm ci
npm run dev
```

Available commands:

```powershell
npm run lint
npm run lint:fix
npm run test
npm run test:watch
npm run build
npm run preview
```

## Configuration

The portfolio works without environment variables. Remote Aviora content is optional and the checked-in local portfolio content is the production-safe fallback.

```text
VITE_AVIORA_BASE_URL=https://api.aviora.dev/api/v1
```

Only configure a public content endpoint. Do not put private Aviora credentials or other secrets in `VITE_*` variables because Vite exposes them to the browser. The current integration does not require or ship an authorization token.

Central public identity, URL, email, and social configuration lives in `src/config/site.ts`.

## Content updates

- Projects: `src/data/projects.ts`
- Blog posts: `src/data/blog.ts`
- Profile: `src/data/profile.ts`
- Skills: `src/data/skills.ts`
- Project architecture media: `public/projects/`

Project and blog records are typed in `src/types/content.ts` and validated at the remote-content boundary in `src/data/validators.ts`. Do not add metrics, clients, adoption numbers, or performance claims unless they can be independently verified.

## Remote content behaviour

The application requests the Aviora content API first. A successful, valid response is used as-is, including a deliberately empty collection. HTTP errors, network failures, timeouts, invalid JSON, and invalid payloads switch deterministically to the checked-in local content. The UI reports this as a non-blocking degraded state instead of hiding projects.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`. The workflow uses the committed lockfile and must pass linting, tests, and the production build before the GitHub Pages artifact is deployed.

`public/CNAME` is copied to `dist/CNAME`. The Vite base remains `/`, which is correct for the `cosmas.dev` custom domain.

In GitHub repository settings:

1. Select **GitHub Actions** as the Pages source.
2. Set the custom domain to `cosmas.dev`.
3. Enable **Enforce HTTPS** after GitHub provisions the certificate.

## External DNS checklist

Repository configuration cannot change or prove control of DNS. The live domain must be updated at its DNS provider before this portfolio can own `cosmas.dev`.

Create these apex `A` records:

```text
@  A  185.199.108.153
@  A  185.199.109.153
@  A  185.199.110.153
@  A  185.199.111.153
```

Optional IPv6 records:

```text
@  AAAA  2606:50c0:8000::153
@  AAAA  2606:50c0:8001::153
@  AAAA  2606:50c0:8002::153
@  AAAA  2606:50c0:8003::153
```

For `www`, create `www CNAME cajazi.github.io`. Remove conflicting apex `A`, `AAAA`, `ALIAS`, or `ANAME` records that point to the existing Square Sales deployment, and remove wildcard DNS records unless they are intentionally required and secured. Confirm the current values against [GitHub's custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) before changing DNS.

After propagation, verify:

```powershell
Resolve-DnsName cosmas.dev -Type A
curl.exe -I https://cosmas.dev
```

The response should serve this portfolio, its canonical link should be `https://cosmas.dev/`, and HTTPS should be enforced. At the time of repository hardening, the live domain still served a different Square Sales application; DNS completion remains an external action.

## Static production files

- `public/og-image.png`: 1200 × 630 social-sharing image
- `public/robots.txt` and `public/sitemap.xml`: crawler configuration
- `public/app-ads.txt`: canonical AdMob publisher declaration copied to the site root
- `public/404.html`: GitHub Pages SPA deep-link recovery

The obsolete duplicate root `app-ads.txt` is intentionally removed; only the Vite `public/` copy is deployed.
