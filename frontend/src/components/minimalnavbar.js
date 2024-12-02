import React from "react";

const MinimalNavbar = () => {
  return (
    <nav
      className="navbar navbar-light shadow-sm"
      style={{
        background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
        borderRadius: "10px",
        padding: "10px 20px",
      }}
    >
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
        <img src="/images/Logo.png" className="logo-image me-2" alt="Logo" />
        </a>
      </div>
    </nav>
  );
};

export default MinimalNavbar;
