function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index').setTitle('Conversión de tiempo');
}

function convertTime(inputType, timeValue, hours, minutes, start, end, workHours) {
  let totalHours = 0;
  
  function isValidTime(time) {
    let parts = time.split(':');
    if (parts.length !== 2) return false;
    let h = parseInt(parts[0], 10);
    let m = parseInt(parts[1], 10);
    return !isNaN(h) && !isNaN(m) && h >= 0 && h < 24 && m >= 0 && m < 60;
  }

  if (inputType === 'hmm') {
    if (!timeValue || !isValidTime(timeValue)) return 'Formato de hora inválido';
    let parts = timeValue.split(':');
    totalHours = parseInt(parts[0]) + parseInt(parts[1]) / 60;
  } else if (inputType === 'separate') {
    if (!hours || !minutes) return 'Introducir un dato antes de convertir';
    totalHours = parseInt(hours) + parseInt(minutes) / 60;
  } else if (inputType === 'range') {
    if (!start || !end || !isValidTime(start) || !isValidTime(end)) return 'Formato de hora inválido';
    let startParts = start.split(':');
    let endParts = end.split(':');
    let startTime = parseInt(startParts[0]) + parseInt(startParts[1]) / 60;
    let endTime = parseInt(endParts[0]) + parseInt(endParts[1]) / 60;
    totalHours = (endTime >= startTime) ? endTime - startTime : (24 - startTime) + endTime;
  }
  
  let roundedHours = totalHours.toFixed(2);
  
  if (!workHours) {
    return `Tiempo total: ${roundedHours} horas.`;
  }
  
  let remaining = (workHours - totalHours).toFixed(2);
  return `Tiempo total: ${roundedHours} horas. \nNecesitas ${remaining} horas más \npara completar una jornada de ${workHours} horas.`;
}
