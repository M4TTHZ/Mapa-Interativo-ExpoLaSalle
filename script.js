// ===== Dados =====
const CENTRO = [-13.070893, -55.943891];

const iconesCategoria = {
  "Acesso": "🚪",
  "Educação": "📚",
  "Sustentabilidade": "🌿",
  "Agricultura": "🌱",
};

const pontosDeInteresse = [
  {
    nome: "Entrada Principal",
    categoria: "Acesso",
    localizacao: "Bloco A",
    descricao: "Ponto de recepção e credenciamento dos visitantes do ExpoLaSalle.",
    horario: "08:00 - 22:00",
    foto: "assets/logo.png",
    coordenadas: [-13.071252, -55.943881],
  },
  {
    nome: "Senac",
    categoria: "Educação",
    localizacao: "Ao lado da barraca de Saúde e Lazer do Projeto Faça Acontecer",
    descricao: "Focado em apresentar o instituto com seus cursos ofertados e proporcionar uma breve experiência com óculos de realidade virtual (VR).",
    horario: "16:00 - 23:00",
    foto: "assets/senac.png",
    coordenadas: [-13.070779, -55.943606],
  },
  {
    nome: "IFMT",
    categoria: "Educação",
    localizacao: "Entre as barracas do Rotary Club e do Senai – conjunto de 3 barracas",
    descricao: "Apresentam os cursos ofertados, incluindo amostras científicas produzidas pelos alunos, demonstrando de forma prática o funcionamento de cada amostra.",
    horario: "16:00 - 22:00",
    foto: "assets/ifmt.png",
    coordenadas: [-13.070677, -55.943225],
  },
  {
    nome: "Massey Ferguson / Guimarães",
    categoria: "Agricultura",
    localizacao: "Ao final do bloco 4, ao lado da barraca do curso de Medicina Veterinária",
    descricao: "Trouxeram uma exposição de maquinários, explicando suas funções e mostrando seu impacto no campo.",
    horario: "16:00 - 23:00",
    foto: "assets/guimaraes.png",
    coordenadas: [-13.070971, -55.942844],
  },
  {
    nome: "Senai",
    categoria: "Educação",
    localizacao: "Ao lado da barraca da IFMT, perto da praça de alimentação, entre a barraca da Fiat",
    descricao: "Duas barracas apresentando um pouco sobre equipamentos de EPI e os eventos produzidos pelo Sebrae, como o Circuito Gastronômico.",
    horario: "16:00 - 20:00",
    foto: "assets/senai.jpg",
    coordenadas: [-13.07033, -55.943737],
  },
  {
    nome: "Geotop",
    categoria: "Sustentabilidade",
    localizacao: "Empresa fabricante de geomembranas, lonas plásticas, tanques escavados, bolsões para criação de peixes e lagos ornamentais.",
    descricao: "Soluções voltadas para armazenamento de água, piscicultura e paisagismo ornamental.",
    horario: "16:00 - 23:00",
    foto: "assets/geotop.png",
    coordenadas: [-13.070715, -55.944236],
  },
  {
    nome: "Fênix Aero Agro / XAG",
    categoria: "Agricultura",
    localizacao: "Ao lado da Fiagril – estande de drones",
    descricao: "Empresa voltada para venda, manutenção e prestação de serviços com drones agrícolas da marca XAG. Demonstraram aplicações em pulverização, adubação líquida e sólida.",
    horario: "08:00 - 20:00",
    foto: "assets/fenix.png",
    coordenadas: [-13.070293, -55.943415],
  },
  {
    nome: "Centro de Soluções Conectadas John Deere",
    categoria: "Agricultura",
    localizacao: "Área de exposição de máquinas agrícolas e construção",
    descricao: "Tecnologias da John Deere para agricultura e construção, incluindo tratores e a nova colheitadeira automatizada, com sistemas inteligentes de automação.",
    horario: "16:00 - 22:00",
    foto: "assets/johnDeere.png",
    coordenadas: [-13.070756, -55.942939],
  },
  {
    nome: "Rotary Club",
    categoria: "Sustentabilidade",
    localizacao: "Próximo aos estandes de vacinação e banco ortopédico",
    descricao: "Organização internacional com mais de 120 anos de atuação, destacando projetos sociais e ambientais como erradicação da poliomielite, banco ortopédico, banco de leite humano e o projeto Uma Vida, Uma Árvore.",
    horario: "16:00 - 22:00",
    foto: "assets/rotary.png",
    coordenadas: [-13.071056, -55.943326],
  },
];

// ===== Estado =====
const categoriasDisponiveis = [...new Set(pontosDeInteresse.map(p => p.categoria))].sort();
const ativas = new Set(categoriasDisponiveis);
let termoBusca = "";
const markers = {};

// ===== Mapa =====
const map = L.map("map", { center: CENTRO, zoom: 18, maxZoom: 22, minZoom: 14, scrollWheelZoom: true });
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "ExpoLaSalle 2026 · © OpenStreetMap",
  maxZoom: 22,
}).addTo(map);

function makeIcon(categoria) {
  const emoji = iconesCategoria[categoria] || "📍";
  return L.divIcon({
    className: "expo-marker",
    html: `<div class="pin"><span>${emoji}</span></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -34],
  });
}

function popupHTML(p) {
  return `
    <div class="popup">
      <img src="${p.foto}" alt="${p.nome}" />
      <div class="popup__body">
        <span class="popup__badge">${p.categoria}</span>
        <h4>${p.nome}</h4>
        <p>${p.descricao}</p>
        <p><strong>📍</strong> ${p.localizacao}</p>
        <p><strong>🕐</strong> ${p.horario}</p>
      </div>
    </div>
  `;
}

pontosDeInteresse.forEach(p => {
  const m = L.marker(p.coordenadas, { icon: makeIcon(p.categoria) })
    .bindPopup(popupHTML(p), { maxWidth: 280 });
  markers[p.nome] = m;
});

// ===== Render filtros + lista =====
const $cats = document.getElementById("categorias");
const $lista = document.getElementById("listaPontos");
const $count = document.getElementById("countPontos");
const $search = document.getElementById("search");
const $sidebar = document.getElementById("sidebar");
const $overlay = document.getElementById("overlay");

function renderCategorias() {
  $cats.innerHTML = "";
  categoriasDisponiveis.forEach(c => {
    const active = ativas.has(c);
    const label = document.createElement("label");
    label.className = "cat" + (active ? " is-active" : "");
    label.innerHTML = `
      <input type="checkbox" ${active ? "checked" : ""} />
      <span>${iconesCategoria[c] || "📍"}</span>
      <span style="font-weight:500">${c}</span>
    `;
    label.querySelector("input").addEventListener("change", () => {
      ativas.has(c) ? ativas.delete(c) : ativas.add(c);
      atualizar();
    });
    $cats.appendChild(label);
  });
}

function pontosVisiveis() {
  const t = termoBusca.toLowerCase();
  return pontosDeInteresse.filter(p =>
    ativas.has(p.categoria) && p.nome.toLowerCase().includes(t)
  );
}

function renderLista() {
  const v = pontosVisiveis();
  $count.textContent = v.length;
  $lista.innerHTML = "";
  if (v.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Nenhum ponto encontrado.";
    $lista.appendChild(empty);
    return;
  }
  v.forEach(p => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ponto";
    btn.innerHTML = `
      <img src="${p.foto}" alt="" />
      <div style="min-width:0;flex:1">
        <div class="ponto__nome">${p.nome}</div>
        <div class="ponto__cat">${p.categoria}</div>
      </div>
    `;
    btn.addEventListener("click", () => focar(p));
    $lista.appendChild(btn);
  });
}

function atualizarMarcadores() {
  const visiveis = new Set(pontosVisiveis().map(p => p.nome));
  pontosDeInteresse.forEach(p => {
    const m = markers[p.nome];
    if (visiveis.has(p.nome)) { if (!map.hasLayer(m)) m.addTo(map); }
    else if (map.hasLayer(m)) map.removeLayer(m);
  });
}

function atualizar() {
  renderCategorias();
  renderLista();
  atualizarMarcadores();
}

function focar(p) {
  fecharSidebar();
  map.flyTo(p.coordenadas, 20, { duration: 0.8 });
  setTimeout(() => markers[p.nome]?.openPopup(), 850);
}

function abrirSidebar() { $sidebar.classList.add("is-open"); $overlay.hidden = false; }
function fecharSidebar() { $sidebar.classList.remove("is-open"); $overlay.hidden = true; }

// ===== Eventos =====
$search.addEventListener("input", e => { termoBusca = e.target.value; renderLista(); atualizarMarcadores(); });
document.getElementById("sidebarToggle").addEventListener("click", abrirSidebar);
document.getElementById("sidebarClose").addEventListener("click", fecharSidebar);
$overlay.addEventListener("click", fecharSidebar);
document.getElementById("resetBtn").addEventListener("click", () => map.setView(CENTRO, 18));

// Smooth scroll para âncoras
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});

// Garantir tamanho correto após render
window.addEventListener("load", () => setTimeout(() => map.invalidateSize(), 200));

atualizar();
