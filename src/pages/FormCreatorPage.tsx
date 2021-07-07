import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Question } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addQuestion, setForm, setFormTitle } from '../store/slices/formSlice';
import { activateLoading, deactivateLoading } from '../store/slices/uiSlice';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import TextInput from '../ui/TextInput';
import { db, nowSecond } from '../utils/firebase';
import * as Icon from 'heroicons-react';
import QuestionItem from '../components/QuestionItem';

function FormPage() {
  const { formId }: { formId: string } = useParams();
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const uid = useAppSelector((state) => state.user.userProfile.uid);
  const form = useAppSelector((state) => state.form.form);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(activateLoading());
    db.collection('forms')
      .doc(formId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const newData = doc.data() as Form;
          newData.uuid = doc.id;
          dispatch(setForm(newData));
        } else {
          const newForm = { ...form };
          newForm.title = '찾으시는 설문지 폼이 없습니다.';
          dispatch(setForm(newForm));
        }
        dispatch(deactivateLoading());
      })
      .catch(() => {
        dispatch(deactivateLoading());
      });
  }, []);

  const titleChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    dispatch(setFormTitle(e.target.value));
  };

  const addQuestionHandler = () => {
    const newQuestion = {
      questionType: 'text',
      title: '',
      subtitle: '',
      uuid: '',
      options: [],
    } as Question;
    dispatch(addQuestion(newQuestion));
  };

  const saveClickHandler = () => {
    const newForm = { ...form };
    newForm.editedAt = nowSecond();

    db.collection('forms')
      .doc(formId)
      .update(newForm)
      .then(() => {
        console.log('잘 저장되었습니다.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (uid !== form.creator) {
    return <div>폼 제작자 권한이 없습니다.</div>;
  }

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Paper>
        <TextInput
          value={form.title}
          onChange={(e) => {
            titleChangeHandler(e);
          }}
          fill
          placeholder="설문지 제목을 입력해주세요"
        />

        <ul>
          {form.questions.map((question, index) => (
            <QuestionItem key={index} question={question} index={index} />
          ))}
        </ul>

        <Button
          color="primary"
          onClick={addQuestionHandler}
          style={{ marginTop: 16 }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            질문 추가하기
            <Icon.PlusCircle />
          </span>
        </Button>
      </Paper>

      <Button color="primary" onClick={saveClickHandler} style={{ margin: 16 }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          임시로 저장하기
          <Icon.BookOpen />
        </span>
      </Button>
    </div>
  );
}

export default FormPage;

const Paper = styled.div`
  padding: 16px;
  background: #fafafa;
  border-radius: 24px;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.1);
`;
