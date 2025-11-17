document.getElementById("loadBtn").addEventListener("click", loadDatasets);

async function loadDatasets() {
  try {
    const response = await fetch("http://localhost:3000/datasets");

    if (!response.ok) {
      throw new Error("Błąd API NOAA: " + response.status);
    }

    const data = await response.json();
    const tableBody = document.querySelector("#datasetsTable tbody");
    tableBody.innerHTML = "";

    data.results.forEach(dataset => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${dataset.id}</td>
        <td>${dataset.name }</td>
        <td>${dataset.datacoverage }</td>
        <td>${dataset.mindate }</td>
        <td>${dataset.maxdate }</td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Błąd:", error);
    alert("Nie udało się pobrać datasetów NOAA.");
  }
}
