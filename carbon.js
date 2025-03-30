document.getElementById('calculate').addEventListener('click', function() {
  let car = parseFloat(document.getElementById('car').value) || 0;
  let bus = parseFloat(document.getElementById('bus').value) || 0;
  let motorcycle = parseFloat(document.getElementById('motorcycle').value) || 0;
  let bikeType = document.getElementById('bikeType').value;
  let bicycle = parseFloat(document.getElementById('bicycle').value) || 0;

  let electricity = parseFloat(document.getElementById('electricity').value) || 0;
  let gas = parseFloat(document.getElementById('gas').value) || 0;
  let dietFactor = parseFloat(document.getElementById('diet').value);

  let carCO2 = car * 0.21;
  let busCO2 = bus * 0.10;

  let bikeCO2Factor = (bikeType === 'small') ? 0.08 : (bikeType === 'medium') ? 0.12 : 0.20;
  let motorcycleCO2 = motorcycle * bikeCO2Factor;

  let bicycleCO2 = 0.00;

  let transportCO2 = carCO2 + busCO2 + motorcycleCO2 + bicycleCO2;
  let energyCO2 = (electricity * 0.5) + (gas * 2.2);
  let dietCO2 = dietFactor;

  let totalCO2 = transportCO2 + energyCO2 + dietCO2;

  document.querySelector('.progress-bar').style.width = '100%';
  document.getElementById('result').innerHTML = `Your daily carbon footprint: <strong>${totalCO2.toFixed(2)} kg CO2</strong>`;

  let advice;
  if (totalCO2 < 10) {
    advice = "Great job! You're keeping your footprint low.";
  } else if (totalCO2 < 20) {
    advice = "Consider reducing energy usage and using public transport more.";
  } else {
    advice = "Try switching to renewable energy and a plant-based diet to lower your footprint!";
  }

  document.getElementById('advice').innerHTML = `<p>${advice}</p>`;

  let ctx = document.getElementById('carbonChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Transport', 'Energy', 'Diet'],
      datasets: [{
        data: [transportCO2, energyCO2, dietCO2],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }]
    }
  });
});
