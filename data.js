document.getElementById("dataForm").addEventListener("submit", loadData);


async function loadData(e) {
    e.preventDefault();

  const formData = new FormData(e.target);
  const params = new URLSearchParams(formData).toString();

    console.log(params);
    alert(params);

  try {
    const response = await fetch(`http://localhost:3000/data?${params}`);
    if (!response.ok) throw new Error("Błąd API NOAA: " + response.status);

    const data = await response.json();
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    data.results.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.station}</td>
        <td>${item.datatype}</td>
        <td>${item.date}</td>
        <td>${item.value}</td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Błąd:", error);
    alert("Nie udało się pobrać danych NOAA.");
  }
}