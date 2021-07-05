import { Link } from 'react-router-dom';
import Container from '../ui/Container';
// Components
import LogoutButton from './LogoutButton';

interface NavBarProps {
  logoSrc: string;
}

function NavBar({ logoSrc }: NavBarProps) {
  return (
    <div>
      <Container>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            height: 60,
            padding: 16,
          }}
        >
          <Link aria-label="logo" to="/form/list">
            <img src={logoSrc} alt="logo" style={{ height: '100%' }} />
          </Link>
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}

export default NavBar;
