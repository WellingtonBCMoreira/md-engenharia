import styles from './Header.module.css';
import { useState } from 'react';

const menuItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
];

interface HeaderProps {
  logoUrl?: string;
}

export function Header({ logoUrl = "/images/logo.png" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuItemClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.interface}>
        <div className={styles.logo}>
          <a href="#inicio" onClick={handleMenuItemClick}>
            <img src={logoUrl} alt="Logo MD Engenharia" />
          </a>
        </div>

        <nav className={styles.menuDesktop}>
          <ul>
            {menuItems.map(item => (
              <li key={item.href}>
                <a className={styles.link} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.btnContato}>
          <a href="#formulario">
            <button>Contato</button>
          </a>
        </div>

        <div className={styles.openMenuIcon} onClick={() => setIsMenuOpen(true)}>
          <i className="bi bi-list"></i>
        </div>

        <div className={`${styles.menuMobile} ${isMenuOpen ? styles.menuMobileOpen : ""}`}>
          <div className={styles.closeButton} onClick={() => setIsMenuOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </div>
          <nav>
            <ul>
              {menuItems.map(item => (
                <li key={item.href}>
                  <a
                    className={styles.link}
                    href={item.href}
                    onClick={handleMenuItemClick}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className={styles.link} href="#formulario" onClick={handleMenuItemClick}>
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div
          className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ""}`}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>
    </header>
  );
}
