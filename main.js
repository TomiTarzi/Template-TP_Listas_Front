let comidas = JSON.parse(localStorage.getItem("comidas")) || [
  {
    "nombre": "Asado",
    "categoria": "Parrilla",
    "provincia": "Buenos Aires",
    "ingredientes": ["Carne vacuna", "Sal", "Chimichurri"]
  },
  {
    "nombre": "Empanadas",
    "categoria": "Horno",
    "provincia": "Tucumán",
    "ingredientes": ["Carne", "Cebolla", "Aceitunas", "Huevo"]
  },
  {
    "nombre": "Locro",
    "categoria": "Guiso",
    "provincia": "Salta",
    "ingredientes": ["Maíz", "Porotos", "Chorizo", "Panceta", "Zapallo"]
  },
  {
    "nombre": "Milanesa",
    "categoria": "Frito",
    "provincia": "Buenos Aires",
    "ingredientes": ["Carne", "Huevo", "Pan rallado", "Aceite"]
  },
  {
    "nombre": "Humita en Chala",
    "categoria": "Horno",
    "provincia": "Jujuy",
    "ingredientes": ["Maíz", "Queso", "Cebolla", "Ají molido"]
  },
  {
    "nombre": "Choripán",
    "categoria": "Parrilla",
    "provincia": "Córdoba",
    "ingredientes": ["Chorizo", "Pan", "Chimichurri"]
  },
  {
    "nombre": "Provoleta",
    "categoria": "Parrilla",
    "provincia": "Buenos Aires",
    "ingredientes": ["Queso provolone", "Orégano", "Aceite de oliva"]
  },
  {
    "nombre": "Milanesas a la napolitana",
    "categoria": "Frito",
    "provincia": "Santa Fe",
    "ingredientes": ["Carne", "Tomate", "Queso", "Jamón", "Orégano"]
  },
  {
    "nombre": "Matambre a la pizza",
    "categoria": "Parrilla",
    "provincia": "Buenos Aires",
    "ingredientes": ["Matambre", "Queso", "Tomate", "Orégano"]
  },
  {
    "nombre": "Torta Frita",
    "categoria": "Frito",
    "provincia": "Entre Ríos",
    "ingredientes": ["Harina", "Agua", "Sal", "Grasa"]
  }
];

const container = document.getElementById('comidaContainer');
const formcomidanueva = document.getElementById('agregarComida');
const buscador = document.getElementById("buscador");
const buscadorIngrediente = document.getElementById("buscadorIngrediente"); 
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroProvincia = document.getElementById("filtroProvincia");

function mostrarComidasConForEach(listaComidas) {
  container.innerHTML = "";

  if (listaComidas.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #777;">No se encontraron comidas que coincidan con la búsqueda.</p>`;
    return;
  }
  
  listaComidas.forEach(tarjeta => {
    container.innerHTML += `
      <article class="card">
        <span class="categoria">${tarjeta.categoria}</span>
        <h2>${tarjeta.nombre}</h2>
        <p>${tarjeta.provincia}</p>
        <ul>
          ${tarjeta.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join("")}
        </ul>
      </article>
    `;
  });
}

function filtrar() {
  const textoNombre = buscador.value.toLowerCase().trim(); 
  const textoIngrediente = buscadorIngrediente.value.toLowerCase().trim(); 
  const cat = filtroCategoria.value;
  const prov = filtroProvincia.value;

  const comidasfiltradas = comidas.filter(comida => {
    const coincideNombre = comida.nombre.toLowerCase().includes(textoNombre);
    
    const coincideIngrediente = comida.ingredientes.some(ing => 
      ing.toLowerCase().includes(textoIngrediente)
    );

    const coincideCat = cat === "" || comida.categoria === cat;
    const coincideProv = prov === "" || comida.provincia === prov;
    
    return coincideNombre && coincideIngrediente && coincideCat && coincideProv;
  });
  
  mostrarComidasConForEach(comidasfiltradas);
}

buscador.addEventListener("input", filtrar);
buscadorIngrediente.addEventListener("input", filtrar); 
filtroCategoria.addEventListener("change", filtrar);
filtroProvincia.addEventListener("change", filtrar);

mostrarComidasConForEach(comidas);

formcomidanueva.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoNombre = e.target.nombre.value.trim();
  const nuevaCategoria = e.target.categoria.value.trim();
  const nuevaProvincia = e.target.provincia.value.trim();
  const ingredientesInput = e.target.ingredientes.value;

  if (!nuevoNombre || !nuevaCategoria || !nuevaProvincia || !ingredientesInput) {
    alert("Por favor, completá todos los campos.");
    return;
  }

  const listaIngredientes = ingredientesInput
    .split(",")
    .map(ing => ing.trim())
    .filter(ing => ing !== "");

  const nuevaComida = {
    nombre: nuevoNombre,
    categoria: nuevaCategoria,
    provincia: nuevaProvincia,
    ingredientes: listaIngredientes
  };

  comidas.push(nuevaComida);
  localStorage.setItem("comidas", JSON.stringify(comidas));

  filtrar();
  e.target.reset();
});