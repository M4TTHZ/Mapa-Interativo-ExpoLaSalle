# 📍 ExpoLaSalle · Mapa Interativo do Evento

> Aplicação web interativa para explorar os pontos de interesse da **ExpoLaSalle 2026** — desenvolvida por alunos do 3° Semestre de Gestão de TI da escola La Salle, Lucas do Rio Verde - MT.

---

## 🖥️ Demonstração

A página é composta por três seções principais:

- **Hero** — apresentação do projeto com botões de navegação
- **Mapa Interativo** — filtros por categoria, busca por nome e mapa com marcadores clicáveis
- **Sobre** — informações sobre o projeto e a equipe

---

## 🚀 Como Executar

Não é necessário instalar nada. O projeto roda diretamente no navegador.

1. Faça o download ou clone o repositório
2. Abra o arquivo `index.html` em qualquer navegador moderno

> ⚠️ **Atenção:** as fontes e o mapa requerem conexão com a internet para carregar corretamente (Google Fonts, Leaflet CDN e OpenStreetMap).

---

## 📁 Estrutura de Arquivos

```
expolasalle/
│
├── index.html        # Estrutura HTML da página
├── styles.css        # Estilos, layout e responsividade
├── script.js         # Lógica, dados e interatividade
│
└── assets/           # Imagens e logos dos expositores
    ├── logo.png
    ├── senac.png
    ├── ifmt.png
    ├── senai.jpg
    ├── rotary.png
    ├── geotop.png
    ├── fenix.png
    ├── guimaraes.png
    └── johnDeere.png
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| HTML5 | — | Estrutura semântica da página |
| CSS3 | — | Layout (Grid + Flex), responsividade, animações |
| JavaScript | ES6+ | Lógica, filtros, controle do mapa |
| [Leaflet.js](https://leafletjs.com/) | 1.9.4 | Biblioteca de mapas interativos |
| [OpenStreetMap](https://www.openstreetmap.org/) | — | Tiles (imagens) do mapa |
| [Google Fonts](https://fonts.google.com/) | — | Fontes Inter e Plus Jakarta Sans |

> Nenhum framework ou ferramenta de build foi utilizado — apenas HTML, CSS e JavaScript puros.

---

## 🗺️ Pontos de Interesse

| Nome | Categoria | Horário |
|---|---|---|
| Entrada Principal | Acesso | 08:00 - 22:00 |
| Senac | Educação | 16:00 - 23:00 |
| IFMT | Educação | 16:00 - 22:00 |
| Senai | Educação | 16:00 - 20:00 |
| Rotary Club | Sustentabilidade | 16:00 - 22:00 |
| Geotop | Sustentabilidade | 16:00 - 23:00 |
| Fênix Aero Agro / XAG | Agricultura | 08:00 - 20:00 |
| Massey Ferguson / Guimarães | Agricultura | 16:00 - 23:00 |
| John Deere | Agricultura | 16:00 - 22:00 |

---

## ✨ Funcionalidades

- **Mapa interativo** com zoom, arraste e marcadores clicáveis
- **Filtro por categoria** — Acesso, Educação, Sustentabilidade e Agricultura
- **Busca em tempo real** por nome do expositor
- **Popup informativo** ao clicar em um marcador (foto, descrição, horário e localização)
- **Lista lateral** de pontos com navegação rápida até o marcador
- **Animação flyTo** ao selecionar um ponto da lista
- **Sidebar responsiva** com overlay para dispositivos móveis
- **Smooth scroll** na navegação entre seções
- **Layout responsivo** mobile-first para qualquer tamanho de tela

---

## 📐 Arquitetura do Projeto

```
Usuário interage
       │
       ▼
  Event Listener (script.js)
       │
       ▼
  Atualiza Estado
  (ativas / termoBusca)
       │
       ▼
  atualizar()
  ┌────┴──────────────┐
  │                   │
  ▼                   ▼
renderLista()   atualizarMarcadores()
(sidebar)           (mapa)
```

---

## 👥 Equipe

Desenvolvido pelo **3° Semestre de Gestão de TI — La Salle Lucas do Rio Verde**

| Nome | Função |
|---|---|
| **Matheus Ramalho** | Dev Sênior 🖥️ |
| **Fabielle Virginio** | Anotadora & Dev 📝 |
| **Kevin Cristhian** | Fotógrafo & Dev 📸 |
| **André Zanquetin** | Anotador & Dev 📝 |

---

## 📄 Licença

Projeto educacional desenvolvido para a **ExpoLaSalle 2026**.  
Uso de dados do mapa sujeito aos termos do [OpenStreetMap](https://www.openstreetmap.org/copyright).

---

*© 2026 ExpoLaSalle · Mapa Interativo do Evento*
