function startSleepSort() {
    const input = document.getElementById('inputArray').value;
    const numbers = input.split(',').map(Number).map(num => ({ value: num, state: 'sleeping', elapsed: 0 }));

    displayGivenNumbers(numbers);
    visualizeTable(numbers); // Initial table visualization
    let timer = 0;
    updateTimer(timer);
    sleepSort(numbers, timer);
}

function displayGivenNumbers(arr) {
    const container = document.getElementById('given-numbers');
    container.innerHTML = '<h2>Given Numbers:</h2>';
    const arrayContainer = document.createElement('div');
    arrayContainer.className = 'array-container';
    arr.forEach(item => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = item.value;
        arrayContainer.appendChild(element);
    });
    container.appendChild(arrayContainer);
}

function displaySortedNumbers(arr) {
    const container = document.getElementById('sorted-numbers');
    container.innerHTML = '<h2>Sorted Numbers:</h2>';
    const arrayContainer = document.createElement('div');
    arrayContainer.className = 'array-container';
    arr.forEach(item => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.textContent = item.value;
        arrayContainer.appendChild(element);
    });
    container.appendChild(arrayContainer);
}

function updateTimer(seconds) {
    const timer = document.getElementById('timer');
    timer.textContent = `Timer: ${seconds} seconds`;
}

function visualizeTable(arr) {
    const container = document.getElementById('visualization-table-container');
    container.innerHTML = '';

    const table = document.createElement('table');
    table.id = 'visualization-table';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Status', 'Value', 'Graph'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');

    arr.forEach(item => {
        const row = document.createElement('tr');

        const statusCell = document.createElement('td');
        statusCell.className = 'status';
        statusCell.textContent = item.state === 'sleeping' ? '😴' : '😊';

        const valueCell = document.createElement('td');
        valueCell.textContent = item.value;

        const graphCell = document.createElement('td');
        graphCell.className = 'graph-cell';

        const graphBar = document.createElement('div');
        graphBar.className = 'graph-bar';
        graphBar.style.width = `${item.elapsed * 20}px`;

        graphCell.appendChild(graphBar);

        row.appendChild(statusCell);
        row.appendChild(valueCell);
        row.appendChild(graphCell);

        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

function sleepSort(arr, timer) {
    let totalElapsedTime = 0;
    const sortedArray = [];
    const interval = setInterval(() => {
        let allAwake = true;
        arr.forEach(item => {
            if (item.elapsed < item.value) {
                item.elapsed += 1;
                allAwake = false;
            }
            if (item.elapsed === item.value) {
                item.state = 'woken up';
                if (!sortedArray.includes(item)) {
                    sortedArray.push(item);
                }
            }
        });
        
        if (!allAwake) {
            totalElapsedTime += 1;
            updateTimer(totalElapsedTime);
            visualizeTable(arr);
            displaySortedNumbers(sortedArray);
        } else {
            clearInterval(interval);
        }
    }, 1000);
}