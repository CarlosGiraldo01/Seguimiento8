
// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
const inputTarea = document.getElementById("ingresar-tarea");
const botonAgregar = document.getElementById("boton-agregar");
const listaTareas = document.getElementById("lista-tareas")

// Obtener tareas del localStorage

//Hecho con ChatGPT porque no pude solucionar un error, que no entendia.
function obtenerTareasLocalStorage() {
    const raw = localStorage.getItem("tareas");
    if (!raw || raw === "undefined") return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn("Error parseando tareas:", e);
      return [];
    }
  }

let tareas = obtenerTareasLocalStorage();

// Guardar tareas en localStorage

function guardarTareasLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM

function mostrarTareas() {
  listaTareas.innerHTML = "";
  tareas.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "tarea" + (t.completada ? " completada" : "");
    div.innerHTML = `
      <p class="texto-tarea">${t.texto}</p>
      <div>
        <button class="btn_ok">✔️</button>
        <button class="btn_eliminar">❌</button>
      </div>
    `;
    div.querySelector(".btn_ok").onclick = () => completarTarea(i);
    div.querySelector(".btn_eliminar").onclick = () => eliminarTarea(i);
    listaTareas.appendChild(div);
  });
}

// Marcar la Tarea como completada

function completarTarea(i) {
    tareas[i].completada = !tareas[i].completada;
    guardarTareasLocalStorage();
    mostrarTareas();
  }

// Eliminar la Tarea correspondiente

function eliminarTarea(i) {
    tareas.splice(i, 1);
    guardarTareasLocalStorage();
    mostrarTareas();
  }

// Crear una nueva Tarea

function nuevaTarea() {
    const texto = inputTarea.value.trim();
    if (!texto) return alert("Por favor, escribe una tarea");
    tareas.push({ texto, completada: false });
    guardarTareasLocalStorage();
    inputTarea.value = "";
    mostrarTareas();
  }
  
// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea

botonAgregar.addEventListener("click", nuevaTarea);

// Escuchar el inputTarea y en el evento keypress con la tecla Enter 
// llamar a nuevaTarea

inputTarea.addEventListener("keypress", e => {
    if (e.key === "Enter")  {nuevaTarea();
}
});


// Cargar tareas al iniciar con mostrarTareas

mostrarTareas();