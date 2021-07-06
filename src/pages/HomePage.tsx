import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '../ui/Button';
// Assets
import Logo from '../assets/logo512.png';

function HomePage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
        }}
      >
        <div>
          <img src={Logo} alt="logo" style={{ width: 200 }} />
        </div>
        <h1>
          궁금함에 살고 <br />
          궁금함에 죽다
        </h1>
        <h3>폼생폼사에 오신 것을 환영합니다</h3>
      </div>

      <Link to="/login">
        <Button color="primary" size="medium" fill>
          로그인하고 설문지 만들기
        </Button>{' '}
      </Link>
      <p>
        아직 회원이 아니라면?{' '}
        <Link to="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </div>
  );
}

export default HomePage;
