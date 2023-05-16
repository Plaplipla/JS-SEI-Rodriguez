let rol;

do {
  rol = prompt("Ingrese su rol (empleado o cliente):");
} while (rol.toLowerCase() !== "empleado" && rol.toLowerCase() !== "cliente");

if (rol.toLowerCase() === "empleado") {
  // Lista de envíos de destino
  let enviosDestino = [];

  // Función para que el empleado modifique los destinos
  function gestionarDestinos() {
    let opcion = prompt("Ingrese una opción (si es la primera vez, ingrese el 1; de lo contrario, omita): \n1. Agregar destino \n2. Eliminar destino \n3. Modificar destino \n4. Finalizar");
    switch (opcion) {
      case "1":
        let cantidadDestinos = prompt("Ingrese la cantidad de destinos que desea agregar:");
        for (let i = 0; i < cantidadDestinos; i++) {
          let nuevoDestino = prompt(`Ingrese el destino número ${i + 1}:`);
          enviosDestino.push({ indice: i, destino: nuevoDestino });
        }
        gestionarDestinos();
        break;
      case "2":
        let indiceEliminar = prompt("Ingrese el índice del destino que desea eliminar:");
        enviosDestino = enviosDestino.filter(destino => destino.indice != indiceEliminar);
        gestionarDestinos();
        break;
      case "3":
        let indiceModificar = prompt("Ingrese el índice del destino que desea modificar:");
        let nuevoValor = prompt("Ingrese el nuevo destino:");
        enviosDestino[indiceModificar].destino = nuevoValor;
        gestionarDestinos();
        break;
      case "4":
        mostrarDestinos();
        break;
      default:
        alert("Opción inválida");
        gestionarDestinos(); // Volver a llamar a la función en caso de opción inválida
    }
  }

  // Función para mostrar la lista final de destinos
  function mostrarDestinos() {
    let ordenDestinos = enviosDestino.sort((a, b) => a.indice - b.indice);
    let destinos = ordenDestinos.map(destino => destino.destino);
    let confirmacion = confirm(`El orden de los destinos es: ${destinos.join(", ")}.\nSi ya verificó los destinos,\n¿Desea finalizar la gestión?`);
    if (confirmacion) {
      alert("Destinos listos!");
    } else {
      gestionarDestinos();
    }
  }

  // Llamada a la función de gestión de destinos para que el empleado modifique los destinos
  gestionarDestinos();

} else if (rol.toLowerCase() === "cliente") {
    const precioBase = 100;
    const precioPorKg = 50;
    const constanteG = 6.67;
    const factorVelocidadEscape = 0.01; // Factor de ajuste x la velocidad de escape

    const planetas = [
      { nombre: "Sol", gravedadSuperficie: 274, radio: 696340, masa: 1.989 },
      { nombre: "Mercurio", gravedadSuperficie: 3.7, radio: 2439.7, masa: 0.33 },
      { nombre: "Venus", gravedadSuperficie: 8.87, radio: 6051.8, masa: 4.87 },
      { nombre: "Tierra", gravedadSuperficie: 9.81, radio: 6371, masa: 5.97 },
      { nombre: "Luna", gravedadSuperficie: 1.62, radio: 1737.5, masa: 0.07349 },
      { nombre: "Marte", gravedadSuperficie: 3.71, radio: 3389.5, masa: 0.642 },
      { nombre: "Ceres", gravedadSuperficie: 0.28, radio: 473, masa: 0.00016 },
      { nombre: "Jupiter", gravedadSuperficie: 24.79, radio: 69911, masa: 1898 },
      { nombre: "Saturno", gravedadSuperficie: 10.44, radio: 58232, masa: 568 },
      { nombre: "Urano", gravedadSuperficie: 8.87, radio: 25362, masa: 86.8 },
      { nombre: "Neptuno", gravedadSuperficie: 11.15, radio: 24622, masa: 102 },
      { nombre: "Pluto", gravedadSuperficie: 0.62, radio: 1188.3, masa: 0.0146 },
      { nombre: "Eris", gravedadSuperficie: 0.82, radio: 1163, masa: 0.00277 }
    ];

    // Función para calcular el precio de envío en función del peso del paquete y la velocidad de escape
    function calcularPrecioEnvio(peso, velocidadEscape) {
      let precio = precioBase + (peso - 1) * precioPorKg; // Calcular el precio base en función del peso

      // Ajustar el precio en función de la velocidad de escape
      if (velocidadEscape > 0) {
        precio *= (1 + factorVelocidadEscape * velocidadEscape);
      }
      return precio;
    }

    // Función para calcular la velocidad de escape de un planeta
    function calcularVE(masa, planeta) {
      const planetaSeleccionado = planetas.find(p => p.nombre.toLowerCase() === planeta.toLowerCase());
      if (planetaSeleccionado) {
        return Math.sqrt((2 * planetaSeleccionado.gravedadSuperficie * constanteG * masa) / (planetaSeleccionado.radio * 1000));
      } else {
      return 0;
      }
    }
      
    // Capturar los datos del usuario
    const peso = prompt("Ingrese el peso del paquete:");
    const planetaOrigen = prompt("Ingrese el planeta de origen (Sol, Mercurio, Venus, Tierra, Luna, Marte, Ceres, Jupiter, Saturno, Urano, Neptuno, Plutón o Eris):");

    // Calcular la velocidad de escape
    const planetaSeleccionado = planetas.find(p => p.nombre.toLowerCase() === planetaOrigen.toLowerCase());

    if (planetaSeleccionado) {
      const velocidadEscape = calcularVE(planetaSeleccionado.masa, planetaOrigen);

      // Calcular el precio de envío
      const precioEnvio = calcularPrecioEnvio(peso, velocidadEscape);

      // Mostrar el resultado final
      alert(`El precio de envío del paquete desde ${planetaOrigen} es de ${precioEnvio.toFixed(2)} astrocréditos.`);

    } else {
      alert("Opción inválida");
    }
}