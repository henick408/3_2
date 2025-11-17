document.getElementById("loadBtn").addEventListener("click", loadStations);

async function loadStations() {

  try {
    const response = await fetch("http://localhost:3000/stations", {
    });

    if (!response.ok) {
      throw new Error("Błąd API NOAA: " + response.status);
    }

    const data = await response.json();
    const tableBody = document.querySelector("#stationsTable tbody");
    tableBody.innerHTML = "";

    data.results.forEach(station => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${station.id}</td>
        <td>${station.name || "-"}</td>
        <td>${station.latitude || "-"}</td>
        <td>${station.longitude || "-"}</td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Błąd:", error);
    alert("Nie udało się pobrać stacji NOAA.");
  }
}
