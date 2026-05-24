const pontosDeInteresse = [
  {
    nome: "Entrada Principal",
    categoria: "Acesso",
    localizacao: "Bloco A",
    descricao: "Ponto de recepção e credenciamento dos visitantes do ExpoLaSalle.",
    horario: "08:00 - 22:00",
    foto: "",
    coordenadas: [-13.071252, -55.943881]
  },
  {
    nome: "Senac",
    categoria: "Educação",
    localizacao: "Ao lado da barraca de Saúde e Lazer do Projeto Faça Acontecer",
    descricao: "Focado em apresentar o instituto com seus cursos ofertados e proporcionar uma breve experiência com óculos de realidade virtual (VR).",
    horario: "16:00 -  23:00",
    foto: "",
    coordenadas: [-13.070779, -55.943606]
  },
  {
    nome: "IFMT",
    categoria: "Educação",
    localizacao: "Entre as barracas do Rotary Club e do Senai – conjunto de 3 barracas",
    descricao: "Apresentam os cursos ofertados, incluindo amostras científicas produzidas pelos alunos, demonstrando de forma prática o funcionamento de cada amostra.",
    horario: "16:00 - 22:00",
    foto: "",
    coordenadas: [-13.070677, -55.943225]
  },
  {
    nome: " Massey Ferguson / Guimarães",
    categoria: "Agricultura",
    localizacao: "Ao final do bloco 4, ao lado da barraca do curso de Medicina Veterinária",
    descricao: "Trouxeram uma exposição de maquinários, explicando suas funções e mostrando seu impacto no campo.",
    horario: "16:00 - 23:00",
    foto: "",
    coordenadas: [-13.070971, -55.942844]
  },
  {
    nome: "Senai",
    categoria: "Educação",
    localizacao: "Ao lado da barraca da IFMT, perto da praça de alimentação, entre a barraca da Fiat",
    descricao: "Duas barracas apresentando um pouco sobre equipamentos de EPI e os eventos produzidos pelo Sebrae, como o Circuito Gastronômico.",
    horario: "16:00 - 20:00",
    foto: "",
    coordenadas: [-13.070300, -55.943737]
  },
  {
    nome: "Geotop",
    categoria: "Sustentabilidade",
    localizacao: "Empresa fabricante de geomembranas, lonas plásticas, tanques escavados, bolsões para criação de peixes e lagos ornamentais. O estande apresentou soluções voltadas para armazenamento de água, piscicultura e paisagismo ornamental.",
    descricao: "Competições robóticas e demonstrações de drones.",
    horario: "16:00 - 23:00",
    foto: "",
    coordenadas: [-13.070715, -55.944236]
  },
  {
    nome: " Fênix Aero Agro / XAG",
    categoria: "Agricultura",
    localizacao: "Ao lado da Fiagril – estande de drones",
    descricao: "Empresa voltada para venda, manutenção e prestação de serviços com drones agrícolas da marca XAG. Demonstraram aplicações em pulverização, adubação líquida e sólida, destacando o auxílio da tecnologia em áreas de difícil acesso no campo.",
    horario: "08:00 - 20:00",
    foto: "",
    coordenadas: [-13.070293, -55.943415]
  },
  {
    nome: "Centro de Soluções Conectadas John Deere",
    categoria: "Agricultura",
    localizacao: "Área de exposição de máquinas agrícolas e construção",
    descricao: "Apresentaram tecnologias da John Deere voltadas para agricultura e construção, incluindo tratores de pequeno, médio e grande porte, como o modelo 9R540 fabricado nos Estados Unidos. Também demonstraram a nova colheitadeira automatizada, com sistemas inteligentes de configuração e automação de colheita.",
    horario: "16:00 - 22:00",
    foto: "",
    coordenadas: [-13.070756, -55.942939]
  },
  {
    nome: "Rotary Club",
    categoria: "Sustentabilidade",
    localizacao: "Próximo aos estandes de vacinação e banco ortopédico",
    descricao: "Organização internacional com mais de 120 anos de atuação, destacando projetos sociais e ambientais como erradicação da poliomielite, campanhas de vacinação, banco ortopédico, empréstimo de aparelhos ortopédicos, banco de leite humano, coleta de lixo eletrônico e ações de preservação ambiental, como o projeto “Uma Vida, Uma Árvore”.",
    horario: "16:00 - 22:00",
    foto: "",
    coordenadas: [-13.071056, -55.943326]
  },
];

const estado = {
  mapa: null,
  marcadores: [],
  categoriasAtivas: new Set(),
  searchTerm: '',
  pontoSelecionado: null,
  todasAsCategorias: new Set()
};

const iconesCategoria = {
  'Acesso': 'fa-door-open',
  'Educação': 'fa-book',
  'Sustentabilidade': 'fa-leaf',
  'Agricultura': 'fa-seedling'
};


function inicializar() {
  inicializarMapa();
  
  extrairCategorias();
  
  renderizarFiltros();
  
  adicionarMarcadores();
  
  configurarEventListeners();
  
  centralizarMapa();
}


function inicializarMapa() {

  const coordenadasCentro = [-13.070893, -55.943891];
  
  // Criar mapa
  estado.mapa = L.map('map').setView(coordenadasCentro, 24);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Expolasalle 2026 - Mapa Interativo',
    maxZoom: 24,
    minZoom: 14
  }).addTo(estado.mapa);
}


function extrairCategorias() {
  pontosDeInteresse.forEach(ponto => {
    estado.todasAsCategorias.add(ponto.categoria);
  });
}

function renderizarFiltros() {
  const filterContainer = document.getElementById('filterContainer');
  filterContainer.innerHTML = '';
  
  const categoriasOrdenadas = Array.from(estado.todasAsCategorias).sort();
  
  categoriasOrdenadas.forEach(categoria => {
    const div = document.createElement('div');
    div.className = 'filter-checkbox';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `filter-${categoria}`;
    checkbox.value = categoria;
    checkbox.checked = true;
    
    estado.categoriasAtivas.add(categoria);
    
    checkbox.addEventListener('change', (e) => {
      if (e.target.checked) {
        estado.categoriasAtivas.add(categoria);
      } else {
        estado.categoriasAtivas.delete(categoria);
      }
      atualizarMarcadores();
    });
    
    const label = document.createElement('label');
    label.htmlFor = `filter-${categoria}`;
    label.textContent = categoria;
    
    div.appendChild(checkbox);
    div.appendChild(label);
    filterContainer.appendChild(div);
  });
}

function adicionarMarcadores() {

  estado.marcadores.forEach(marcador => {
    estado.mapa.removeLayer(marcador.marker);
  });
  estado.marcadores = [];
  
  const pontosFiltrados = filtrarPontos();
  
  pontosFiltrados.forEach(ponto => {
    
    const icone = criarIconeCustomizado(ponto.categoria);
    
    const marcador = L.marker(ponto.coordenadas, {
      icon: icone,
      title: ponto.nome
    }).addTo(estado.mapa);
    
    // Criar popup
    const popupContent = criarPopupContent(ponto);
    marcador.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'popup-customizado'
    });
    
    marcador.on('click', () => {
      selecionarPonto(ponto);
    });
    
    marcador.on('mouseover', () => {
      marcador.openPopup();
    });
    
    marcador.on('mouseout', () => {
      if (estado.pontoSelecionado !== ponto) {
        marcador.closePopup();
      }
    });
    
    estado.marcadores.push({
      ponto,
      marker: marcador
    });
  });
}

function criarIconeCustomizado(categoria) {
  const iconeSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24" height="24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  `;
  
  return L.divIcon({
    html: `
      <div class="marker-icon" style="background-color: #6366f1;">
        <i class="fas ${iconesCategoria[categoria] || 'fa-map-pin'}"></i>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
    className: 'custom-marker'
  });
}

function criarPopupContent(ponto) {
  return `
    <div class="popup-content">
      <div class="popup-header">
        <div>
          <h3 class="popup-title">${ponto.nome}</h3>
          <span class="popup-category">${ponto.categoria}</span>
        </div>
      </div>
      
      <img src="${ponto.foto}" alt="${ponto.nome}" class="popup-image" onerror="this.src='https://via.placeholder.com/280x180?text=Sem+Imagem'">
      
      <div class="popup-info">
        <div class="popup-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <span class="popup-info-label">Localização:</span>
            <span class="popup-info-value">${ponto.localizacao}</span>
          </div>
        </div>
        
        <div class="popup-info-item">
          <i class="fas fa-clock"></i>
          <div>
            <span class="popup-info-label">Horário:</span>
            <span class="popup-info-value">${ponto.horario}</span>
          </div>
        </div>
        
        <div class="popup-info-item">
          <i class="fas fa-info-circle"></i>
          <div>
            <span class="popup-info-label">Descrição:</span>
            <span class="popup-info-value">${ponto.descricao}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function filtrarPontos() {
  return pontosDeInteresse.filter(ponto => {
    const categoriaAtiva = estado.categoriasAtivas.has(ponto.categoria);
    const matchBusca = ponto.nome.toLowerCase().includes(estado.searchTerm.toLowerCase());
    
    return categoriaAtiva && matchBusca;
  });
}

function atualizarMarcadores() {
  adicionarMarcadores();
  renderizarListaPontos();
}

function selecionarPonto(ponto) {
  estado.pontoSelecionado = ponto;
  
  // Atualizar destaque na lista
  document.querySelectorAll('.ponto-item').forEach(item => {
    item.classList.remove('active');
  });
  
  const itemAtivo = Array.from(document.querySelectorAll('.ponto-item')).find(item => {
    return item.querySelector('.ponto-item-name').textContent === ponto.nome;
  });
  
  if (itemAtivo) {
    itemAtivo.classList.add('active');
  }
  
  // Atualizar destaque no mapa
  estado.marcadores.forEach(m => {
    if (m.ponto === ponto) {
      m.marker.openPopup();
      estado.mapa.panTo(m.marker.getLatLng());
    }
  });
  
  // Fechar sidebar em mobile
  const sidebar = document.querySelector('.sidebar');
  if (sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
  }
}


function centralizarMapa() {
  if (estado.marcadores.length === 0) return;
  
  const group = new L.featureGroup(estado.marcadores.map(m => m.marker));
  estado.mapa.fitBounds(group.getBounds().pad(0.1));
}

function configurarEventListeners() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    estado.searchTerm = e.target.value;
    atualizarMarcadores();
  });
  
  
  // Toggle sidebar em mobile
  const btnToggleSidebar = document.querySelector('.btn-toggle-sidebar');
  const btnCloseSidebar = document.querySelector('.btn-close-sidebar');
  const sidebar = document.querySelector('.sidebar');
  
  btnToggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
  
  btnCloseSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
  
  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !btnToggleSidebar.contains(e.target)) {
      sidebar.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', inicializar);

// Ajustar tamanho do mapa
window.addEventListener('resize', () => {
  if (estado.mapa) {
    estado.mapa.invalidateSize();
  }
});







