import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// Redux
import { useAppDispatch } from '../store/hooks';
import { setUserProfile } from '../store/slices/userSlice';
//Components
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
// Assets
import Logo from '../assets/logo512.png';
// Utils
import { app, db } from '../utils/firebase';

function LoginPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    app
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then(user => {
        const currentUser = app.auth().currentUser;
        const uid = (currentUser || {}).uid;
        if (uid) {
          db.doc(`user/${uid}`)
            .get()
            .then(doc => {
              const payload = {
                uid,
                email: currentUser!.email!,
                nickName: '',
              };
              payload.nickName = doc.data()!.nickName;
              dispatch(setUserProfile(payload));

              history.push('/form/list');
            });
        } else {
          alert('해당하는 유저가 없습니다.');
        }
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

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
          <img src={Logo} alt="logo" style={{ width: 150 }} />
        </div>
        <h1>
          로그인하고
          <br />
          궁금증을 해결하세요
        </h1>
      </div>
      <form onSubmit={e => submitHandler(e)}>
        <TextInput
          type="text"
          value={email}
          onChange={e => emailChangeHandler(e)}
          placeholder="이메일을 입력해주세요"
          fill
          style={{ marginBottom: 12 }}
        />
        <TextInput
          type="password"
          value={pw}
          onChange={e => passwordChangeHandler(e)}
          placeholder="비밀번호를 입력해주세요"
          fill
          style={{ marginBottom: 12 }}
        />
        <Button fill color="primary">
          로그인하기
        </Button>
      </form>
      <p>
        아직 회원이 아니라면?{' '}
        <Link to="/signup">
          <span>회원가입하기</span>
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
