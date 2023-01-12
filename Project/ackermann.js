let memo = {};

let x = 2;
let y = [];

for (let i = 0; i < 500; i++) {
    y.push(i);
}

let ans = document.getElementById("ans");

function ack(x, y) {
    if (x === 0) {
        return y + 1;
    } else if (y === 0) {
        return ack(x - 1, 1);
    } else {
        let key = x + ',' + y;
        if (key in memo) {
            return memo[key];
        } else {
            memo[key] = ack(x - 1, ack(x, y - 1));
            return memo[key];
        }
    }
}

const calculateTime = (x,y) => {
    let sum=0;
    for (let i = 0; i < 3; i++) {
        let start = performance.now();
        ack(x,y);
        let end = performance.now();
        let time = end - start;
        sum+=time
    }

    return sum/3
}

const PlotChart = (FinalAverage)=>{
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: y,
            datasets: [{
                data: FinalAverage,
                fill: false,
                borderColor: 'rgb(106, 90, 205)',
                tension: 0.1
            }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

window.onload = ()=>{
    let Average = [];
    for (let i = 0; i < y.length; i++) {
        let Avg = calculateTime(x,y[i])

        Average.push(Avg)
            
        ans.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${x}</td>
                <td>${y[i]}</td>
                <td>${Avg}</td>
            </tr>
        `;        
    }
    PlotChart(Average);
};





/* globals d3 */
// dataset describing the consumption of renewable energy at world level
// https://data.worldbank.org/indicator/EG.FEC.RNEW.ZS
// const data = [
//   {
//     year: '1990',
//     percentage: 17.0671538947666,
//   },
//   {
//     year: '1992',
//     percentage: 17.9209223918013,
//   },
// ];

// // in the .viz container add an svg element following the margin convention
// const margin = {
//   top: 20,
//   right: 20,
//   bottom: 20,
//   left: 20,
// };
// const width = 700 - (margin.left + margin.right);
// const height = 350 - (margin.top + margin.bottom);

// const svg = d3
//   .select('.viz')
//   .append('svg')
//   .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
//   .attr('width', width)
//   .attr('height', height);

// // include the visualization in the nested group
// const group = svg
//   .append('g')
//   .attr('transform', `translate(${margin.left} ${margin.right})`);

// // describe the scales for the line chart
// // x-axis: time scale using the years
// const xScale = d3
//   .scaleTime()
//   .domain([new Date(data[0].year), new Date(data[data.length - 1].year)]) // ! the domain of a time scale describes two date objects
//   .range([0, width])
//   .nice();

// // y-axis: linear scale using the percentages
// const yScale = d3
//   .scaleLinear()
//   .domain(d3.extent(time)) // consider the [minimum, maximum] values
//   .range([height, 0]) // flip the range considering the top down nature of the SVG coordinate system
//   .nice();

// // describe the line function to plot the data through a path element
// // for each data point the line function computes the coordinates based on the input year and percentage
// const line = d3
//   .line()
//   .x(({ year }) => xScale(new Date(year))) // to obtain the value from the time scale the input needs to be a date object (like the domain)
//   .y(({ percentage }) => yScale(percentage));

// // add a path element using the line function
// group
//   .append('path')
//   .attr('d', line(memo))
//   .attr('fill', 'none')
//   .attr('stroke', 'currentColor');

// // include the axes based on the defined scales
// const xAxis = d3
//   .axisBottom(xScale);

// group
//   .append('g')
//   .attr('transform', `translate(0 ${height})`)
//   .call(xAxis);

// const yAxis = d3
//   .axisLeft(yScale);

// group
//   .append('g')
//   .call(yAxis);
