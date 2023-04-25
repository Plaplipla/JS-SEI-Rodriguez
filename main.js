// Función para calcular la velocidad de escape
function calcularVE(masa, planeta) {
    let gravedadSuperficie;
    let radioPlaneta;
    
    // Seleccionar planeta
    switch (planeta) {
      case 'sol':
        gravedadSuperficie = 274;
        radioPlaneta = 696340;
        break;
      case 'mercurio':
        gravedadSuperficie = 3.7;
        radioPlaneta = 2439.7;
        break;
      case 'venus':
        gravedadSuperficie = 8.87;
        radioPlaneta = 6051.8;
        break;
      case 'tierra':
        gravedadSuperficie = 9.81;
        radioPlaneta = 6371;
        break;
      case 'luna':
        gravedadSuperficie = 1.62;
        radioPlaneta = 1737.5;
        break;
      case 'marte':
        gravedadSuperficie = 3.71;
        radioPlaneta = 3389.5;
        break;
      case 'ceres':
        gravedadSuperficie = 0.28;
        radioPlaneta = 473;
        break;
      case 'jupiter':
        gravedadSuperficie = 24.79;
        radioPlaneta = 69911;
        break;
      case 'neptuno':
        gravedadSuperficie = 11.15;
        radioPlaneta = 24622;
        break;
      case 'pluton':
        gravedadSuperficie = 0.62;
        radioPlaneta = 1188.3;
        break;
      case 'saturno':
        gravedadSuperficie = 10.44;
        radioPlaneta = 58232;
        break;
      case 'urano':
        gravedadSuperficie = 8.87;
        radioPlaneta = 25362;
        break;
      case 'eris':
        gravedadSuperficie = 0.82;
        radioPlaneta = 1163;
        break;
      default:
        console.log('Planeta no válido');
        return;
    }
    // Calcular la velocidad de escape
    const velocidadEscape = Math.sqrt((2 * gravedadSuperficie * radioPlaneta) / masa);
    return velocidadEscape;
  }
// Obtener la masa ingresada x el usuario
let masa = parseFloat(prompt('Ingrese la masa del cuerpo en kg:'));

while (isNaN(masa) || masa <= 0) {
    if (isNaN(masa)) {
        alert('Debe ingresar un valor numérico. Por favor, inténtelo de nuevo.');
    } else {
        alert('La masa debe ser un número positivo. Por favor, inténtelo de nuevo.');
    }
    masa = parseFloat(prompt('Ingrese la masa del cuerpo en kg:'));
}

// Obtener el planeta elegido x el usuario
const planeta = prompt('Ingrese el nombre del planeta (sol, mercurio, venus, tierra, luna, marte, ceres, jupiter, neptuno, pluton, saturno, urano, eris):');

// Calcular la velocidad de escape
const velocidadEscape = calcularVE(masa, planeta);

// Mostrar el resultado
if (velocidadEscape) {
console.log(`La velocidad de escape necesaria para salir del campo gravitatorio del planeta ${planeta} es de ${velocidadEscape.toFixed(2)} m/s.`);}