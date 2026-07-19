function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="dashboard-card">
      <div
        className="card-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <div className="card-info">
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default DashboardCard;