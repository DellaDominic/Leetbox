import './navbar.css';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, BookOpen, Plus, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navItems = [
    { label: 'Home', path: '/', icon: <Home size={15} /> },
    { label: 'Study', path: '/study', icon: <BookOpen size={15} /> },
    { label: 'Add', path: '/add', icon: <Plus size={15} /> },
    { label: 'Cards', path: '/cards', icon: <LayoutGrid size={15} /> },
  ];

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <div>
          <NavLink to="/" className="nav-name">
            LeetBox.
          </NavLink>
        </div>
        <div className="nav-links">
          {navItems.map(({ label, path, icon }) => {
            const isActive =
              location.pathname === '/'
                ? path === '/'
                : location.pathname.startsWith(path) && label !== 'Home';
            return (
              <button
                key={label}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <NavLink to={path}>
                  <div className="nav-icon">{icon}</div>
                  <span className="nav-label">{label}</span>
                </NavLink>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
