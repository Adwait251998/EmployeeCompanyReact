function LoadingScreen() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "200px" }}
    >
      <div className="spinner-border text-primary me-2" role="status"></div>
      <span className="text-muted">Loading data...</span>
    </div>
  );
}

export default LoadingScreen;
