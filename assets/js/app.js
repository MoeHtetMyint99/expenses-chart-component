fetch('./data.json')
    .then(response => response.json())
    .then(json => displayHeight(json));

function displayHeight(json) {
    let amountsArr = json.map(j => parseFloat(j.amount));
    let largestAmount = Math.max(...amountsArr);
    let multiplier = (100 / largestAmount);

    let totalContents = [];
    json.forEach(j => {
        let content = `<div class="chart ${j.day}">`;
        if (j.day == 'wed') {
            content += `<div class="chart-figure current">`;
        } else {
            content += `<div class="chart-figure">`;
        }
        content += `
                <div class="chart-number">
                    $${j.amount}
                </div>
                <div class="chart-day">
                    ${j.day}
                </div>
            </div>
        </div>
        `;
        totalContents += content;

    });

    let chartsBox = document.querySelector('.charts-box');
    chartsBox.innerHTML = totalContents;

    json.forEach(j => {
        let chart = document.querySelector(`.${j.day} .chart-figure`);
        console.log(chart);
        chart.style.height = (j.amount * multiplier).toFixed(3) + "%";
    })
    return chartsBox.innerHTML;
}

