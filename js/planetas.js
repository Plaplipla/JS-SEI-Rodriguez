const planetas = [
    { nombre: "Mercurio", velocidadEscape: 4.25},
    { nombre: "Venus", velocidadEscape: 10.36},
    { nombre: "Tierra", velocidadEscape: 11.19},
    { nombre: "Luna", velocidadEscape: 2.38},
    { nombre: "Marte", velocidadEscape: 5.03},
    { nombre: "Ceres", velocidadEscape: 0.51},
    { nombre: "Jupiter", velocidadEscape: 59.50},
    { nombre: "Saturno", velocidadEscape: 35.50},
    { nombre: "Urano", velocidadEscape: 21.40},
    { nombre: "Neptuno", velocidadEscape: 23.50},
    { nombre: "Pluto", velocidadEscape: 1.19},
    { nombre: "Eris", velocidadEscape: 1.31}
  ];
  
  const precioBase = 100;
  const precioPorKg = 50;
  const factorVelocidadEscape = 0.01;
  
  function bienvenidaCliente() {
    const nombreCliente = prompt("¡Bienvenido! Por favor, introduce tu nombre:");
    alert(`Bienvenido, ${nombreCliente}! Estás ingresando al sistema de envío de paquetes a otros planetas.`);
  }
  
  bienvenidaCliente();
  
  function realizarEnvio() {
    const enviosDestino = [];
  
    while (true) {
      const nombreMercaderia = prompt("Ingrese el nombre de la mercadería a enviar:");
      const pesoKg = parseFloat(prompt("Ingrese el peso en kg de la mercadería:"));
  
      let planetasList = "Seleccione el número del planeta de destino:\n";
  
      planetas.forEach((planeta, index) => {
        planetasList += `${index + 1}. ${planeta.nombre}\n`;
      });
  
      const planetaIndex = parseInt(prompt(planetasList));
      const planetaSeleccionado = planetas[planetaIndex - 1];
      const costoTotal = precioBase + pesoKg * precioPorKg + factorVelocidadEscape * planetaSeleccionado.velocidadEscape;
  
      enviosDestino.push({
        nombre: nombreMercaderia,
        peso: pesoKg,
        planeta: planetaSeleccionado.nombre,
        costoTotal: costoTotal.toFixed(2),
      });
  
      const continuarEnvio = confirm("¿Deseas realizar otro envío?");
      if (!continuarEnvio) {
        break;
      }
    }
  
    mostrarResumenEnvios(enviosDestino);
  }
  
  function mostrarResumenEnvios(envios) {
    console.log("Resumen de envíos:");
  
    envios.forEach((envio, index) => {
      console.log(`Envío ${index + 1}:`);
      console.log(`- Nombre: ${envio.nombre}`);
      console.log(`- Peso: ${envio.peso} kg`);
      console.log(`- Planeta de destino: ${envio.planeta}`);
      console.log(`- Costo total: $${envio.costoTotal}`);
      console.log("------------------");
    });
  }
  
  realizarEnvio();