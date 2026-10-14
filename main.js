/*
    Cargar comidas en memoria desde el JSON
*/
/*
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    //comidas = data;                   // Asignar el JSON a la variable comidas
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });
*/
let comidas = [
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
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroProvincia = document.getElementById("filtroProvincia");

function mostrarComidasConForEach(listaComidas) {
  container.innerHTML = "";
  
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

function filtrar(){
  const comidasfiltradas = comidas.filter(comida => {
    return comida.categoria.includes(filtroCategoria.value)
      && comida.provincia.includes(filtroProvincia.value)
  });
  mostrarComidasConForEach(comidasfiltradas);
}

function buscar(){
  const texto = buscador.value.toLowerCase(); 
  const comidasfiltradas = comidas.filter(comida => {
    return comida.nombre.toLowerCase().includes(texto)
      && comida.categoria.includes(filtroCategoria.value)
      && comida.provincia.includes(filtroProvincia.value);
  });
  mostrarComidasConForEach(comidasfiltradas);
}

filtroCategoria.addEventListener("change", filtrar);
filtroProvincia.addEventListener("change", filtrar);
buscador.addEventListener("input", buscar);

mostrarComidasConForEach(comidas);

formcomidanueva.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoNombre = e.target.nombre.value.trim();
  const nuevaCategoria = e.target.categoria.value.trim();
  const nuevaProvincia = e.target.provincia.value.trim();
  const ingredientesInput = e.target.ingredientes.value;

  if (!nuevoNombre || !nuevaCategoria || !nuevaProvincia) {
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

  mostrarComidasConForEach(comidas);
  
  e.target.reset();
});