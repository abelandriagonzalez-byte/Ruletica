// Lista oficial configurada con las rutas de las imágenes locales .png
const animalitos = [
    { num: "0", nombre: "Delfín", imagen: "imagenes/0.png" },
    { num: "00", nombre: "Ballena", imagen: "imagenes/00.png" },
    { num: "1", nombre: "Carnero", imagen: "imagenes/1.png" },
    { num: "2", nombre: "Toro", imagen: "imagenes/2.png" },
    { num: "3", nombre: "Ciempiés", imagen: "imagenes/3.png" },
    { num: "4", nombre: "Alacrán", imagen: "imagenes/4.png" },
    { num: "5", nombre: "León", imagen: "imagenes/5.png" },
    { num: "6", nombre: "Rana", imagen: "imagenes/6.png" },
    { num: "7", nombre: "Perico", imagen: "imagenes/7.png" },
    { num: "8", nombre: "Ratón", imagen: "imagenes/8.png" },
    { num: "9", nombre: "Águila", imagen: "imagenes/9.png" },
    { num: "10", nombre: "Tigre", imagen: "imagenes/10.png" },
    { num: "11", nombre: "Gato", imagen: "imagenes/11.png" },
    { num: "12", nombre: "Caballo", imagen: "imagenes/12.png" },
    { num: "13", nombre: "Mono", imagen: "imagenes/13.png" },
    { num: "14", nombre: "Paloma", imagen: "imagenes/14.png" },
    { num: "15", nombre: "Zorro", imagen: "imagenes/15.png" },
    { num: "16", nombre: "Oso", imagen: "imagenes/16.png" },
    { num: "17", nombre: "Pavo", imagen: "imagenes/17.png" },
    { num: "18", nombre: "Burro", imagen: "imagenes/18.png" },
    { num: "19", nombre: "Chivo", imagen: "imagenes/19.png" },
    { num: "20", nombre: "Cochino", imagen: "imagenes/20.png" },
    { num: "21", nombre: "Gallo", emoji: "🐓", imagen: "imagenes/21.png" },
    { num: "22", nombre: "Camello", imagen: "imagenes/22.png" },
    { num: "23", nombre: "Cebra", imagen: "imagenes/23.png" },
    { num: "24", nombre: "Iguana", imagen: "imagenes/24.png" },
    { num: "25", nombre: "Gallina", imagen: "imagenes/25.png" },
    { num: "26", nombre: "Vaca", imagen: "imagenes/26.png" },
    { num: "27", nombre: "Perro", imagen: "imagenes/27.png" },
    { num: "28", nombre: "Zamuro", imagen: "imagenes/28.png" },
    { num: "29", nombre: "Elefante", imagen: "imagenes/29.png" },
    { num: "30", nombre: "Caimán", imagen: "imagenes/30.png" },
    { num: "31", nombre: "Lapa", imagen: "imagenes/31.png" },
    { num: "32", nombre: "Ardilla", imagen: "imagenes/32.png" },
    { num: "33", nombre: "Pescado", imagen: "imagenes/33.png" },
    { num: "34", nombre: "Venado", imagen: "imagenes/34.png" },
    { num: "35", nombre: "Jirafa", imagen: "imagenes/35.png" },
    { num: "36", nombre: "Culebra", imagen: "imagenes/36.png" }
];

let congelarTemporizador = false;
let historialLocalMemoria = JSON.parse(localStorage.getItem("historial_memoria_ruleta")) || [];

// Al cargar el documento, arrancar los componentes de la PC
document.addEventListener("DOMContentLoaded", () => {
    generarPanelAnimalitos();
    actualizarVistaHistorial(); 
    iniciarTemporizadorSorteo();

    const btnGirar = document.getElementById("btn-girar");
    if (btnGirar) {
        btnGirar.onclick = realizarSorteo;
    }
});

function generarPanelAnimalitos() {
    const panel = document.getElementById("panel-animalitos");
    if (!panel) return;
    panel.innerHTML = "";
    animalitos.forEach(animal => {
        const btn = document.createElement("button");
        btn.className = "animal-btn";
        btn.innerHTML = `
            <span class="animal-num-badge">${animal.num}</span>
            <img src="${animal.imagen}" alt="${animal.nombre}" class="animal-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://w3.org\' width=\'50\' height=\'50\'><rect width=\'50\' height=\'50\' fill=\'%23ccc\'/><text x=\'50%\' y=\'50%\' text-anchor=\'middle\' dy=\'.3em\' font-size=\'12\' fill=\'%23333\'>${animal.num}</text></svg>'">
            <small>${animal.nombre}</small>
        `;
        btn.onclick = () => alert(`Seleccionaste el ${animal.num} - ${animal.nombre}`);
        panel.appendChild(btn);
    });
}

function iniciarTemporizadorSorteo() {
    const resultadoTexto = document.getElementById("resultado-texto");
    if (!resultadoTexto) return;

    setInterval(() => {
        if (congelarTemporizador) return;

        const ahora = new Date();
        const minutos = ahora.getMinutes();
        const segundos = ahora.getSeconds();

        // Cuenta regresiva matemática de 10 minutos
        const minutosRestantes = 9 - (minutos % 10);
        const segundosRestantes = 59 - segundos;

        resultadoTexto.innerText = `Próximo sorteo en: ${minutosRestantes}m ${segundosRestantes}s`;

        if (minutos % 10 === 0 && segundos === 0) {
            realizarSorteo();
        }
    }, 1000);
}

function realizarSorteo() {
    const btnGirar = document.getElementById("btn-girar");
    const ruletaVisual = document.getElementById("ruleta-visual");
    const resultadoTexto = document.getElementById("resultado-texto");

    if (btnGirar) btnGirar.disabled = true;

    let giros = 0;
    const intervaloAnimation = setInterval(() => {
        const indexAleatorio = Math.floor(Math.random() * animalitos.length);
        ruletaVisual.innerHTML = `<img src="${animalitos[indexAleatorio].imagen}" alt="girando" style="max-width:100%; max-height:100%; object-fit:contain;">`;
        giros++;

        if (giros > 30) {
            clearInterval(intervaloAnimation);
            
            const ganador = animalitos[Math.floor(Math.random() * animalitos.length)];
            ruletaVisual.innerHTML = `<img src="${ganador.imagen}" alt="${ganador.nombre}" style="max-width:100%; max-height:100%; object-fit:contain;">`;
            
            resultadoTexto.innerText = `🎉 ¡GANÓ EL ${ganador.num} - ${ganador.nombre.toUpperCase()}! 🎉`;
            congelarTemporizador = true;
            
            guardarHistorialLocal(ganador);

            setTimeout(() => {
                congelarTemporizador = false; 
                if (btnGirar) btnGirar.disabled = false;
            }, 4000);
        }
    }, 100);
}

function guardarHistorialLocal(animal) {
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const nuevoSorteo = {
        hora: horaFormateada,
        num: animal.num,
        nombre: animal.nombre,
        imagen: animal.imagen
    };

    historialLocalMemoria.unshift(nuevoSorteo);
    localStorage.setItem("historial_memoria_ruleta", JSON.stringify(historialLocalMemoria));

    actualizarVistaHistorial();
}

function actualizarVistaHistorial() {
    const contenedorHistorial = document.getElementById("historial-lista");
    if (!contenedorHistorial) return;
    contenedorHistorial.innerHTML = "";

    const ultimosCinco = historialLocalMemoria.slice(0, 5);

    if (ultimosCinco.length === 0) {
        contenedorHistorial.innerHTML = "<p style='color:#666;'>Esperando el primer sorteo locales...</p>";
        return;
    }

    ultimosCinco.forEach(sorteo => {
        const item = document.createElement("div");
        item.className = "historial-item";
        item.innerHTML = `
            <img src="${sorteo.imagen}" alt="${sorteo.nombre}" style="width:35px; height:35px; object-fit:contain;">
            <small>${sorteo.hora}</small>
        `;
        contenedorHistorial.appendChild(item);
    });
}