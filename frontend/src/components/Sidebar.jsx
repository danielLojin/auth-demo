const Sidebar = ({ children }) => {
  return (
    <div className="d-flex flex-column align-items-center gap-2">
      {children}
    </div>
  );
};

export default Sidebar;
