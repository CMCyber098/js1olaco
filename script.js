let numbers = [];

function insertNumber() {
    const input = document.getElementById("numberInput");
    const value = Number(input.value);

    if (input.value.trim() === "" || !Number.isFinite(value) || value <= 0) {
        alert("Please input a positive number");
        input.focus();
        return;
    }

    numbers.push(value);
    input.value = "";
    displayNumbers();
    document.getElementById("result").textContent = "";
    input.focus();
}

function displayNumbers() {
    const list = document.getElementById("numberList");
    list.innerHTML = "";

    numbers.forEach(function(number, index) {
        const row = document.createElement("div");
        row.className = "number-row";

        const numberText = document.createElement("span");
        numberText.className = "number-value";
        numberText.textContent = number;

        const parityText = document.createElement("span");
        parityText.className = "parity " + (number % 2 === 0 ? "even" : "odd");
        parityText.textContent = number % 2 === 0 ? "EVEN" : "ODD";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            removeNumber(index);
        };

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = function() {
            editNumber(index);
        };

        row.appendChild(numberText);
        row.appendChild(parityText);
        row.appendChild(removeButton);
        row.appendChild(editButton);
        list.appendChild(row);
    });
}

function clearEntry() {
    document.getElementById("numberInput").value = "";
    document.getElementById("numberInput").focus();
}

function removeNumber(index) {
    numbers.splice(index, 1);
    displayNumbers();
    document.getElementById("result").textContent = "";
}

function editNumber(index) {
    const newValue = prompt("Enter new number:", numbers[index]);

    if (newValue === null) {
        return;
    }

    const value = Number(newValue);

    if (newValue.trim() === "" || !Number.isFinite(value) || value <= 0) {
        alert("Please input a positive number");
        return;
    }

    numbers[index] = value;
    displayNumbers();
    document.getElementById("result").textContent = "";
}

function clearItems() {
    numbers = [];
    displayNumbers();
    document.getElementById("result").textContent = "";
    document.getElementById("sortOption").value = "";
}

function getTotal() {
    if (numbers.length === 0) {
        alert("No numbers inserted");
        return;
    }

    const total = numbers.reduce(function(sum, number) {
        return sum + number;
    }, 0);

    document.getElementById("result").textContent = "Total: " + total;
}

function identifyHighestLowest() {
    if (numbers.length === 0) {
        alert("No numbers inserted");
        return;
    }

    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);

    document.getElementById("result").textContent =
        "Highest Number: " + highest + " | Lowest Number: " + lowest;
}

function sortNumbers() {
    const sortOption = document.getElementById("sortOption").value;

    if (sortOption === "ascending") {
        numbers.sort(function(a, b) {
            return a - b;
        });
    } else if (sortOption === "descending") {
        numbers.sort(function(a, b) {
            return b - a;
        });
    }

    displayNumbers();
}

document.getElementById("numberInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});
