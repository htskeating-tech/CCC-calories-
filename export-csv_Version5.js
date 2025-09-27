// export-csv.js
// Usage: setupCSVExport(logs, document.getElementById("btnExport"));

/**
 * Adds CSV export functionality for grouped calorie logs.
 * @param {Object} logs - The logs object, grouped by date (YYYY-MM-DD).
 * @param {HTMLElement} button - The export button element.
 */
function setupCSVExport(logs, button) {
  button.addEventListener("click", () => {
    const rows = [["Date", "Total kcal"]];
    let weeklyTotal = 0;

    Object.keys(logs).sort().forEach(date => {
      const dayTotal = logs[date].reduce((sum, i) => sum + i.totalKcal, 0);
      weeklyTotal += dayTotal;
      rows.push([date, dayTotal]);
    });

    rows.push(["Weekly Total", weeklyTotal]);

    // Convert to CSV string (properly quoting fields)
    const csvContent = rows.map(row =>
      row.map(field =>
        '"' + String(field).replace(/"/g, '""') + '"'
      ).join(",")
    ).join("\n");

    // Trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "weekly-calorie-log.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}