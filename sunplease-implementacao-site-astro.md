# SunPlease — Guia Completo de Implementação do Site em Astro

## 1. Objetivo

Este documento descreve a implementação completa do site institucional da **SunPlease** utilizando **Astro**, assumindo que o projeto já foi criado.

A proposta é construir um site:

- institucional;
- responsivo;
- rápido;
- otimizado para SEO;
- focado em geração de leads;
- com forte CTA para simulação de economia;
- preparado para publicação em hospedagem estática.

O site deve apresentar os principais pilares da empresa:

- Energia Solar Residencial e Comercial;
- Mobilidade Elétrica Inteligente;
- História da empresa;
- Visão, Missão e Valores;
- Como funciona;
- Contato / WhatsApp / Simulação.

---

# 2. Stack recomendada

## Frontend

- Astro
- TypeScript
- SCSS
- Lucide Icons
- HTML semântico
- JavaScript apenas onde realmente necessário

## Hospedagem

Recomendado:

- Azure Static Web Apps

Alternativas:

- Cloudflare Pages
- Netlify
- Vercel

## Integrações futuras

- WhatsApp
- Google Analytics
- Google Search Console
- Meta Pixel
- Google Ads
- CRM
- Formulário de leads
- API serverless

---

# 3. Estrutura do projeto

Organizar o projeto da seguinte maneira:

```text
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── SolarSection.astro
│   ├── MobilitySection.astro
│   ├── AboutSection.astro
│   ├── HowItWorks.astro
│   ├── BenefitsSection.astro
│   ├── ContactCTA.astro
│   ├── ContactForm.astro
│   └── Footer.astro
│
├── layouts/
│   └── BaseLayout.astro
│
├── pages/
│   └── index.astro
│
├── styles/
│   ├── global.scss
│   ├── variables.scss
│   ├── typography.scss
│   └── utilities.scss
│
└── data/
    ├── navigation.ts
    ├── services.ts
    └── company.ts

public/
├── favicon.svg
├── robots.txt
├── images/
│   ├── logo.svg
│   ├── hero-solar.webp
│   ├── solar-house.webp
│   ├── electric-car.webp
│   ├── solar-installation.webp
│   └── og-image.webp
```

---

# 4. Dependências

Instalar SCSS:

```bash
npm install sass
```

Instalar Lucide:

```bash
npm install lucide-astro
```

Opcionalmente, caso seja necessário algum formulário mais complexo no futuro:

```bash
npm install zod
```

---

# 5. Identidade visual

Criar variáveis globais.

Arquivo:

```text
src/styles/variables.scss
```

Exemplo:

```scss
:root {
  --color-primary: #0b2d5c;
  --color-primary-dark: #071d3d;

  --color-secondary: #f5a000;
  --color-accent: #f8c300;

  --color-green: #3f983d;
  --color-green-dark: #2e7a2d;

  --color-background: #ffffff;
  --color-background-soft: #f7f8fa;

  --color-text: #152238;
  --color-text-muted: #667085;

  --color-border: #e5e7eb;

  --container-width: 1200px;

  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  --shadow-sm:
    0 4px 14px rgba(0, 0, 0, 0.06);

  --shadow-md:
    0 10px 30px rgba(0, 0, 0, 0.10);
}
```

Os tons devem ser ajustados posteriormente conforme a versão final do logotipo.

---

# 6. CSS global

Arquivo:

```text
src/styles/global.scss
```

```scss
@use "./variables";

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;

  font-family:
    Inter,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  color: var(--color-text);
  background: var(--color-background);

  line-height: 1.6;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

.container {
  width: min(var(--container-width), 90%);
  margin-inline: auto;
}

.section {
  padding: 100px 0;
}

.section-soft {
  background: var(--color-background-soft);
}

.section-label {
  display: inline-block;

  margin-bottom: 12px;

  color: var(--color-green);

  font-size: 0.875rem;
  font-weight: 700;

  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.section-title {
  margin: 0 0 24px;

  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.1;
}

.section-description {
  max-width: 680px;

  color: var(--color-text-muted);

  font-size: 1.125rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 52px;

  padding: 0 28px;

  border: 0;
  border-radius: var(--radius-sm);

  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: var(--color-green);
  color: #fff;
}

.button-primary:hover {
  background: var(--color-green-dark);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 768px) {
  .section {
    padding: 72px 0;
  }
}
```

---

# 7. Layout principal

Arquivo:

```text
src/layouts/BaseLayout.astro
```

```astro
---
import "../styles/global.scss";

interface Props {
  title: string;
  description?: string;
  canonical?: string;
}

const {
  title,
  description = "Energia solar e mobilidade elétrica",
  canonical
} = Astro.props;
---

<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />

    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
    />

    <title>{title}</title>

    <meta
      name="description"
      content={description}
    />

    <meta
      name="robots"
      content="index, follow"
    />

    {canonical && (
      <link
        rel="canonical"
        href={canonical}
      />
    )}

    <meta
      property="og:title"
      content={title}
    />

    <meta
      property="og:description"
      content={description}
    />

    <meta
      property="og:type"
      content="website"
    />

    <meta
      property="og:image"
      content="/images/og-image.webp"
    />

    <link
      rel="icon"
      href="/favicon.svg"
    />
  </head>

  <body>
    <slot />
  </body>
</html>
```

---

# 8. Página inicial

Arquivo:

```text
src/pages/index.astro
```

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import SolarSection from "../components/SolarSection.astro";
import MobilitySection from "../components/MobilitySection.astro";
import AboutSection from "../components/AboutSection.astro";
import HowItWorks from "../components/HowItWorks.astro";
import BenefitsSection from "../components/BenefitsSection.astro";
import ContactCTA from "../components/ContactCTA.astro";
import Footer from "../components/Footer.astro";
---

<BaseLayout
  title="SunPlease | Energia Solar e Mobilidade Elétrica"
  description="Energia solar residencial e comercial, instalação de carregadores para veículos elétricos e soluções completas em energia limpa."
>

  <Header />

  <main>
    <Hero />

    <SolarSection />

    <MobilitySection />

    <BenefitsSection />

    <AboutSection />

    <HowItWorks />

    <ContactCTA />
  </main>

  <Footer />

</BaseLayout>
```

---

# 9. Header

Arquivo:

```text
src/components/Header.astro
```

Estrutura recomendada:

```astro
<header class="header">
  <div class="container header-content">

    <a href="/" class="logo">
      <img
        src="/images/logo.svg"
        alt="SunPlease"
      />
    </a>

    <nav class="navigation">
      <a href="#servicos">Serviços</a>
      <a href="#como-funciona">Como funciona</a>
      <a href="#sobre">Sobre nós</a>
      <a href="#contato">Contato</a>
    </nav>

    <a
      href="#simulacao"
      class="button button-primary"
    >
      Simular economia
    </a>

  </div>
</header>
```

## Requisitos

- header fixo opcional;
- logo à esquerda;
- navegação central;
- CTA à direita;
- menu responsivo em telas pequenas;
- altura aproximada entre 72px e 84px.

---

# 10. Hero

O hero deve destacar a principal mensagem comercial:

**Da placa no telhado ao carregador do seu carro.**

Título:

**O SOL PARA TODOS!**

CTA principal:

**Simular minha Economia**

Texto auxiliar:

**Gratuitamente**

Arquivo:

```text
src/components/Hero.astro
```

```astro
<section class="hero">

  <div class="hero-background"></div>

  <div class="container hero-content">

    <p class="hero-eyebrow">
      Da placa no telhado ao carregador do seu carro
    </p>

    <h1>
      O SOL PARA TODOS!
    </h1>

    <p class="hero-description">
      Energia limpa, economia e mobilidade elétrica
      em uma solução completa.
    </p>

    <div class="hero-actions">

      <a
        href="#simulacao"
        class="button button-primary"
      >
        Simular minha Economia
      </a>

      <span>
        Gratuitamente
      </span>

    </div>

  </div>

</section>
```

## Diretrizes visuais

Usar:

- imagem de residência com painéis solares;
- carro elétrico;
- carregador residencial;
- bastante espaço em branco;
- gradiente sobre a imagem para legibilidade;
- CTA em verde;
- elementos de apoio em laranja/amarelo.

---

# 11. Energia Solar Residencial e Comercial

Arquivo:

```text
src/components/SolarSection.astro
```

Conteúdo principal:

```astro
<section
  id="servicos"
  class="section"
>

  <div class="container split-layout">

    <div class="section-content">

      <span class="section-label">
        Nossos serviços
      </span>

      <h2 class="section-title">
        Energia Solar Residencial e Comercial
      </h2>

      <p>
        Economize de verdade. Cuidamos de absolutamente tudo:
        estudo de viabilidade, engenharia, burocracia com a
        distribuidora e instalação segura das placas.
      </p>

      <p>
        Nossa equipe realiza uma avaliação detalhada da
        viabilidade e das condições de instalação do seu
        sistema com total transparência.
      </p>

      <p>
        Praticamos um preço justo para entregar a melhor
        solução de custo-benefício para residência,
        comércio, indústria ou área rural.
      </p>

      <p>
        Depois do projeto, cuidamos das tratativas com
        a concessionária até a homologação e realizamos
        a instalação com segurança e rapidez.
      </p>

      <a
        href="#simulacao"
        class="button button-primary"
      >
        Quero economizar
      </a>

    </div>

    <div>
      <img
        src="/images/solar-house.webp"
        alt="Residência utilizando painéis solares"
        loading="lazy"
      />
    </div>

  </div>

</section>
```

## Layout

Desktop:

```text
Texto | Imagem
```

Mobile:

```text
Texto
Imagem
```

---

# 12. Mobilidade Elétrica Inteligente

Arquivo:

```text
src/components/MobilitySection.astro
```

```astro
<section class="section section-soft">

  <div class="container split-layout">

    <div class="section-image">
      <img
        src="/images/electric-car.webp"
        alt="Veículo elétrico conectado a um carregador"
        loading="lazy"
      />
    </div>

    <div class="section-content">

      <span class="section-label">
        Mobilidade elétrica
      </span>

      <h2 class="section-title">
        Mobilidade Elétrica Inteligente
      </h2>

      <p>
        Abasteça seu carro em casa ou valorize seu negócio.
      </p>

      <p>
        Instalamos pontos de recarga rápidos e seguros
        para garagens, condomínios e comércios,
        compatíveis com modelos eletrificados disponíveis
        no mercado.
      </p>

      <p>
        Trabalhamos com soluções atualizadas e eficientes,
        proporcionando retorno financeiro para residências
        e empresas.
      </p>

      <p>
        A SunPlease acompanha o projeto desde a definição
        técnica até a instalação.
      </p>

    </div>

  </div>

</section>
```

---

# 13. Componente de layout em duas colunas

Adicionar no `global.scss`:

```scss
.split-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);

  gap: 80px;

  align-items: center;
}

.split-layout img {
  width: 100%;

  border-radius: var(--radius-lg);

  box-shadow: var(--shadow-md);
}

@media (max-width: 900px) {
  .split-layout {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
```

---

# 14. Benefícios

Criar uma seção visual de benefícios para aumentar a conversão.

Arquivo:

```text
src/components/BenefitsSection.astro
```

Sugestões:

- Economia;
- Segurança;
- Sustentabilidade;
- Projeto completo;
- Menos burocracia;
- Engenharia especializada.

Exemplo:

```astro
---
import {
  TrendingDown,
  ShieldCheck,
  Leaf,
  Wrench
} from "lucide-astro";

const items = [
  {
    icon: TrendingDown,
    title: "Economia",
    description:
      "Reduza sua conta de energia com uma solução dimensionada para o seu consumo."
  },
  {
    icon: ShieldCheck,
    title: "Segurança",
    description:
      "Projeto e instalação seguindo boas práticas técnicas."
  },
  {
    icon: Leaf,
    title: "Energia limpa",
    description:
      "Produza energia renovável e reduza seu impacto ambiental."
  },
  {
    icon: Wrench,
    title: "Solução completa",
    description:
      "Da análise inicial à instalação e homologação."
  }
];
---

<section class="section">

  <div class="container">

    <div class="benefits-grid">

      {
        items.map(({ icon: Icon, title, description }) => (

          <article class="benefit-card">

            <Icon size={32} />

            <h3>
              {title}
            </h3>

            <p>
              {description}
            </p>

          </article>

        ))
      }

    </div>

  </div>

</section>
```

---

# 15. Nossa História

Arquivo:

```text
src/components/AboutSection.astro
```

Utilizar um fundo azul escuro para diferenciar visualmente a seção.

```astro
<section
  id="sobre"
  class="about"
>

  <div class="container">

    <div class="about-intro">

      <span class="about-label">
        Sobre a SunPlease
      </span>

      <h2>
        Nossa História
      </h2>

      <p>
        Desde 2016, quando a energia solar ainda era
        uma novidade no Brasil, a SunPlease já estava
        em campo.
      </p>

      <p>
        Fomos pioneiros em democratizar o acesso à
        energia limpa e hoje unimos essa experiência
        à infraestrutura para mobilidade elétrica.
      </p>

      <p>
        Entregamos engenharia séria, preço justo e
        suporte para quem deseja investir no futuro
        com segurança.
      </p>

    </div>

    <div class="about-grid">

      <article>
        <h3>
          Visão
        </h3>

        <p>
          Liderar a transição energética do país,
          tornando o ecossistema de energia solar
          e carros elétricos parte natural do consumo.
        </p>
      </article>

      <article>
        <h3>
          Missão
        </h3>

        <p>
          Reduzir burocracia e custos para que pessoas
          e empresas possam gerar sua própria energia
          e utilizar mobilidade limpa.
        </p>
      </article>

      <article>
        <h3>
          Valores
        </h3>

        <p>
          Transparência, engenharia segura,
          responsabilidade técnica e tecnologia
          que gera retorno para o cliente.
        </p>
      </article>

    </div>

  </div>

</section>
```

---

# 16. Como Funciona

Arquivo:

```text
src/components/HowItWorks.astro
```

Passos:

1. Diagnóstico gratuito;
2. Instalação e burocracia zero;
3. Economia imediata.

```astro
---
const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description:
      "Analisamos seu consumo atual e projetamos o sistema ideal."
  },
  {
    number: "02",
    title: "Instalação e burocracia zero",
    description:
      "Nossa equipe cuida da documentação e realiza a instalação."
  },
  {
    number: "03",
    title: "Economia imediata",
    description:
      "Seu sistema começa a gerar energia limpa e reduzir seus custos."
  }
];
---

<section
  id="como-funciona"
  class="section section-soft"
>

  <div class="container">

    <div class="section-heading">

      <span class="section-label">
        Processo simples
      </span>

      <h2 class="section-title">
        Como funciona
      </h2>

    </div>

    <div class="steps-grid">

      {
        steps.map(step => (

          <article class="step-card">

            <strong class="step-number">
              {step.number}
            </strong>

            <h3>
              {step.title}
            </h3>

            <p>
              {step.description}
            </p>

          </article>

        ))
      }

    </div>

  </div>

</section>
```

---

# 17. CTA final

Arquivo:

```text
src/components/ContactCTA.astro
```

```astro
<section
  id="simulacao"
  class="contact-cta"
>

  <div class="container">

    <div class="cta-content">

      <span>
        Simulação gratuita
      </span>

      <h2>
        Descubra quanto você pode economizar
      </h2>

      <p>
        Envie seus dados e nossa equipe analisará
        a melhor solução para você.
      </p>

      <a
        href="https://wa.me/55SEUNUMERO"
        target="_blank"
        rel="noopener noreferrer"
        class="button button-primary"
      >
        Falar com um especialista
      </a>

    </div>

  </div>

</section>
```

---

# 18. Formulário de simulação

Opcionalmente, substituir ou complementar o WhatsApp por um formulário.

Campos recomendados:

```text
Nome
Telefone / WhatsApp
E-mail
Cidade
Estado
Valor médio da conta de energia
Tipo de instalação
Mensagem
```

Tipo de instalação:

```text
Residencial
Comercial
Industrial
Rural
Condomínio
Carregador veicular
```

## Validações

- Nome obrigatório;
- WhatsApp obrigatório;
- e-mail válido, se informado;
- valor de conta somente numérico;
- consentimento LGPD.

Exemplo:

```astro
<form class="lead-form">

  <div>
    <label for="name">
      Nome
    </label>

    <input
      id="name"
      name="name"
      required
    />
  </div>

  <div>
    <label for="phone">
      WhatsApp
    </label>

    <input
      id="phone"
      name="phone"
      required
    />
  </div>

  <div>
    <label for="email">
      E-mail
    </label>

    <input
      id="email"
      name="email"
      type="email"
    />
  </div>

  <button
    type="submit"
    class="button button-primary"
  >
    Solicitar simulação
  </button>

</form>
```

Inicialmente, o formulário pode ser substituído por um link direto ao WhatsApp.

---

# 19. WhatsApp

O botão deve estar presente em:

- Header;
- Hero;
- CTA final;
- botão flutuante opcional.

Formato:

```text
https://wa.me/55DDDNÚMERO
```

Com mensagem:

```text
https://wa.me/55DDDNÚMERO?text=Olá,%20gostaria%20de%20fazer%20uma%20simulação%20de%20energia%20solar.
```

---

# 20. Footer

Arquivo:

```text
src/components/Footer.astro
```

Conteúdo recomendado:

```text
Logo

Energia Solar
Mobilidade Elétrica
Como Funciona
Sobre Nós
Contato

Telefone
WhatsApp
E-mail
Endereço

Instagram
Facebook
LinkedIn

Política de Privacidade
Termos de Uso
```

Exemplo:

```astro
<footer class="footer">

  <div class="container footer-grid">

    <div>
      <img
        src="/images/logo.svg"
        alt="SunPlease"
      />

      <p>
        Energia limpa, economia e mobilidade elétrica.
      </p>
    </div>

    <nav>
      <a href="#servicos">
        Serviços
      </a>

      <a href="#como-funciona">
        Como funciona
      </a>

      <a href="#sobre">
        Sobre nós
      </a>

      <a href="#contato">
        Contato
      </a>
    </nav>

  </div>

  <div class="footer-bottom">

    <div class="container">

      © {new Date().getFullYear()} SunPlease.
      Todos os direitos reservados.

    </div>

  </div>

</footer>
```

---

# 21. Responsividade

Breakpoints sugeridos:

```text
Desktop grande: > 1200px
Desktop:       992px – 1200px
Tablet:        768px – 991px
Mobile:        < 768px
```

## Mobile

No mobile:

- menu deve virar hamburger;
- hero deve ter menos altura;
- títulos devem utilizar `clamp()`;
- layouts com duas colunas devem virar uma coluna;
- botões principais devem ocupar largura maior;
- imagens devem ser redimensionadas;
- padding das seções deve reduzir.

---

# 22. Imagens

Preferir:

```text
WebP
AVIF
SVG
```

Evitar JPEG ou PNG pesados quando não forem necessários.

Utilizar:

```html
loading="lazy"
```

nas imagens abaixo da primeira dobra.

Não utilizar `loading="lazy"` na imagem principal do hero caso ela seja essencial ao carregamento inicial.

---

# 23. SEO

Cada página deve possuir:

```html
<title>
<meta name="description">
<meta name="robots">
<link rel="canonical">
```

## Homepage

Sugestão de título:

```text
SunPlease | Energia Solar e Mobilidade Elétrica
```

Descrição:

```text
Soluções completas em energia solar residencial e comercial e instalação de carregadores para veículos elétricos.
```

---

# 24. SEO local

Criar conteúdo direcionado para as regiões atendidas.

Exemplos:

```text
Energia solar em Campinas
Energia solar residencial em Campinas
Instalação de painel solar em Campinas
Carregador para carro elétrico em Campinas
Wallbox residencial em Campinas
Energia solar para empresas
```

Caso a empresa atenda outras cidades, criar páginas específicas posteriormente:

```text
/energia-solar/campinas
/energia-solar/valinhos
/energia-solar/vinhedo
/energia-solar/paulinia
```

Somente criar páginas quando houver conteúdo real e relevante para cada localidade.

---

# 25. Sitemap

Instalar:

```bash
npx astro add sitemap
```

Configurar no `astro.config.mjs`.

Exemplo:

```ts
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.sunplease.com.br",

  integrations: [
    sitemap()
  ]
});
```

---

# 26. robots.txt

Criar:

```text
public/robots.txt
```

Conteúdo:

```text
User-agent: *
Allow: /

Sitemap: https://www.sunplease.com.br/sitemap-index.xml
```

---

# 27. Dados estruturados

Adicionar JSON-LD para empresa local.

Exemplo:

```astro
<script
  type="application/ld+json"
  set:html={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SunPlease",
    "url": "https://www.sunplease.com.br",
    "description":
      "Energia solar e mobilidade elétrica",
    "telephone": "+55..."
  })}
/>
```

Completar posteriormente com:

- endereço;
- CNPJ quando adequado;
- telefone;
- redes sociais;
- horário de atendimento.

---

# 28. Google Analytics

Após publicação, adicionar Google Analytics 4.

Preferencialmente via Google Tag Manager.

Inserir o GTM no layout principal.

Também configurar eventos como:

```text
click_whatsapp
click_simulacao
form_submit
click_phone
click_email
```

---

# 29. Google Search Console

Após publicação:

1. adicionar domínio;
2. validar propriedade;
3. enviar sitemap;
4. acompanhar indexação;
5. acompanhar Core Web Vitals;
6. analisar termos de pesquisa.

---

# 30. Performance

Objetivos:

```text
Performance:     > 90
Accessibility:   > 90
Best Practices:  > 90
SEO:             > 95
```

Executar Lighthouse após o deploy.

Evitar:

- bibliotecas JS desnecessárias;
- imagens grandes;
- vídeos carregados automaticamente;
- fontes externas em excesso;
- carrosséis pesados;
- animações excessivas.

---

# 31. Fontes

Recomendado:

```text
Inter
Manrope
Plus Jakarta Sans
```

Preferência:

```text
Manrope
```

ou:

```text
Inter
```

É recomendável hospedar a fonte localmente para reduzir dependências externas.

---

# 32. Acessibilidade

Garantir:

- contraste adequado;
- `alt` em todas as imagens relevantes;
- botões com descrição;
- labels em inputs;
- foco visível;
- navegação por teclado;
- headings em ordem correta;
- não depender apenas de cor para transmitir informação.

Estrutura correta:

```text
H1
 ├── H2
 │    ├── H3
 │    └── H3
 └── H2
```

A página deve possuir somente um `h1`.

---

# 33. LGPD

Caso haja formulário:

Adicionar checkbox:

```text
Autorizo o uso dos meus dados para contato relacionado à minha solicitação.
```

Também criar posteriormente:

```text
/politica-de-privacidade
```

Evitar coletar dados desnecessários.

---

# 34. Publicação

## Build

Executar:

```bash
npm run build
```

Resultado:

```text
dist/
```

Testar localmente:

```bash
npm run preview
```

---

# 35. Azure Static Web Apps

Configuração:

```text
App location:
/

Output location:
dist
```

Pipeline:

```text
npm install
npm run build
```

Arquitetura:

```text
Git Repository
     ↓
CI/CD
     ↓
npm install
     ↓
npm run build
     ↓
dist/
     ↓
Azure Static Web Apps
     ↓
CDN
     ↓
Usuário
```

---

# 36. Domínio

Após publicação:

Adicionar domínio personalizado:

```text
www.sunplease.com.br
```

Redirecionar:

```text
sunplease.com.br
```

para:

```text
www.sunplease.com.br
```

ou o inverso.

Escolher uma versão canônica e manter a mesma em todo o site.

---

# 37. Fluxo comercial

A estrutura do site deve conduzir o visitante neste fluxo:

```text
Visitante
   ↓
Entende a proposta da SunPlease
   ↓
Conhece os serviços
   ↓
Entende os benefícios
   ↓
Conhece a empresa
   ↓
Entende como funciona
   ↓
Solicita uma simulação
   ↓
WhatsApp / formulário
   ↓
Lead comercial
```

---

# 38. Ordem recomendada da homepage

```text
HEADER

HERO
O SOL PARA TODOS!
CTA SIMULAR ECONOMIA

ENERGIA SOLAR
Residencial e Comercial

MOBILIDADE ELÉTRICA

BENEFÍCIOS

NOSSA HISTÓRIA

VISÃO
MISSÃO
VALORES

COMO FUNCIONA

CTA
Descubra quanto você pode economizar

CONTATO

FOOTER
```

---

# 39. Estratégia de CTA

O CTA principal deve ser:

```text
Simular minha Economia
```

Repetir em pelo menos:

```text
Header
Hero
Após Energia Solar
Final da página
```

CTA secundário:

```text
Falar pelo WhatsApp
```

---

# 40. Evoluções futuras

Após o MVP, podem ser adicionados:

## Simulador

Entrada:

```text
Valor da conta de energia
Cidade
Tipo de imóvel
```

Saída aproximada:

```text
Consumo estimado
Tamanho do sistema
Quantidade de painéis
Economia mensal
Economia anual
Payback estimado
```

---

# 41. Blog

Estrutura futura:

```text
/blog
```

Conteúdos:

```text
Como funciona energia solar?
Quanto custa instalar energia solar?
Energia solar vale a pena?
Como funciona um carregador veicular?
Quanto custa carregar um carro elétrico?
O que é wallbox?
Energia solar para empresas
```

Astro é especialmente adequado para esse tipo de conteúdo.

---

# 42. Página de Energia Solar

Futura rota:

```text
/energia-solar
```

Conteúdo:

```text
Benefícios
Como funciona
Tipos de instalação
Economia
Financiamento
FAQ
CTA
```

---

# 43. Página de Mobilidade Elétrica

Futura rota:

```text
/mobilidade-eletrica
```

Conteúdo:

```text
Wallbox
Residências
Condomínios
Empresas
Compatibilidade
Instalação
Segurança
FAQ
CTA
```

---

# 44. FAQ

Criar posteriormente perguntas como:

```text
Quanto custa instalar energia solar?

Quanto posso economizar?

Quanto tempo leva para instalar?

A SunPlease cuida da homologação?

Posso instalar energia solar em comércio?

É possível carregar carro elétrico usando energia solar?

Qual carregador é compatível com meu carro?
```

Usar Schema.org `FAQPage` quando o conteúdo estiver disponível na página.

---

# 45. Checklist de implementação

## Estrutura

- [ ] Criar componentes
- [ ] Criar layout principal
- [ ] Criar homepage
- [ ] Criar SCSS global
- [ ] Configurar variáveis
- [ ] Inserir logo
- [ ] Inserir favicon

## Homepage

- [ ] Header
- [ ] Hero
- [ ] Energia Solar
- [ ] Mobilidade Elétrica
- [ ] Benefícios
- [ ] Nossa História
- [ ] Visão
- [ ] Missão
- [ ] Valores
- [ ] Como Funciona
- [ ] CTA
- [ ] Footer

## Conversão

- [ ] WhatsApp
- [ ] CTA principal
- [ ] CTA final
- [ ] Formulário opcional
- [ ] Eventos de Analytics

## SEO

- [ ] Title
- [ ] Description
- [ ] Canonical
- [ ] Open Graph
- [ ] Sitemap
- [ ] robots.txt
- [ ] Schema.org
- [ ] Search Console

## Performance

- [ ] Imagens WebP/AVIF
- [ ] Lazy loading
- [ ] Fontes locais
- [ ] Lighthouse
- [ ] Mobile testing

## Publicação

- [ ] Build
- [ ] Preview
- [ ] Pipeline
- [ ] Azure Static Web Apps
- [ ] Domínio
- [ ] SSL

---

# 46. Critérios de aceite

A primeira versão estará pronta quando:

- o site estiver totalmente responsivo;
- todos os links do menu funcionarem;
- o CTA de simulação estiver acessível;
- o WhatsApp abrir corretamente;
- todas as seções estiverem implementadas;
- imagens estiverem otimizadas;
- SEO básico estiver configurado;
- Lighthouse apresentar bom desempenho;
- site estiver publicado com HTTPS;
- domínio personalizado estiver configurado.

---

# 47. Resultado esperado

A arquitetura final será:

```text
Astro
+
TypeScript
+
SCSS
+
Lucide
+
HTML estático
+
SEO
+
WhatsApp
+
Analytics
+
Azure Static Web Apps
```

Sem necessidade de backend na primeira versão.

Backend deverá ser considerado somente quando houver necessidade real de:

- armazenar leads;
- criar simulador mais avançado;
- integrar CRM;
- enviar e-mails;
- integrar WhatsApp via API;
- criar painel administrativo;
- autenticar usuários.

---

# 48. Prioridade de execução

## Fase 1 — Visual

```text
Header
Hero
Serviços
História
Como funciona
CTA
Footer
```

## Fase 2 — Responsividade

```text
Desktop
Tablet
Mobile
```

## Fase 3 — Conversão

```text
WhatsApp
Formulário
CTA
```

## Fase 4 — SEO

```text
Metadata
Sitemap
Schema
Search Console
```

## Fase 5 — Publicação

```text
Build
Azure Static Web Apps
Domínio
Analytics
```

---

# Conclusão

Para a SunPlease, a melhor abordagem é utilizar o Astro como gerador de site institucional estático, mantendo JavaScript apenas onde for necessário.

A aplicação deve ser construída com foco em:

1. performance;
2. SEO;
3. responsividade;
4. clareza da proposta comercial;
5. geração de leads;
6. facilidade de manutenção.

O primeiro objetivo não deve ser criar funcionalidades complexas, mas colocar no ar uma página rápida, profissional e orientada à conversão.
