import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Components
import Button from '../ui/Button';
// Assets
import Logo from '../assets/logo512.png';

function HomePage() {
  return (
    <Fragment>
      <div className="flexbox">
        <div className="title">
          <img src={Logo} alt="logo" />
          <h1>안녕하세요? 폼생폼사입니다</h1>
          <h3>궁금함에 살고 죽는 여러분을 환영합니다</h3>
        </div>
        <div className="buttons">
          <Link to="/login">
            <Button color="primary" size="medium" fill>
              로그인하고 메시지보내기
            </Button>{' '}
          </Link>
          <p>
            아직 회원이 아니라면?{' '}
            <Link to="/signup">
              <span>회원가입하기</span>
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePage;
