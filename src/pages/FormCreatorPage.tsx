import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Question } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addQuestion,
  clearForm,
  setForm,
  setFormTitle,
} from '../store/slices/formSlice';
import { activateLoading, deactivateLoading } from '../store/slices/uiSlice';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import TextInput from '../ui/TextInput';
import { db, nowSecond } from '../utils/firebase';
import * as Icon from 'heroicons-react';
import QuestionItem from '../components/QuestionItem';
import { _uuid } from '../utils/uuid';
import { Paper } from '../ui/StyledComponents';

function FormCreatorPage() {
  const { formId }: { formId: string } = useParams();
  const uid = useAppSelector((state) => state.user.userProfile.uid);
  const form = useAppSelector((state) => state.form.form);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(clearForm());
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

    const handleCmdCtrlS = (e: any) => {
      // Ctrl or Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.keyCode == 83) {
        e.preventDefault();
        saveClickHandler();
        console.log('hi');
      }
    };

    document.addEventListener('keydown', handleCmdCtrlS);
    return () => {
      document.removeEventListener('keydown', handleCmdCtrlS);
      dispatch(clearForm());
    };
  }, []);

  const titleChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    dispatch(setFormTitle(e.target.value));
  };

  const addQuestionHandler = () => {
    const newQuestion = {
      questionType: 'text',
      title: '',
      subtitle: '',
      uuid: _uuid(),
      options: [
        { text: '', uuid: _uuid() },
        { text: '', uuid: _uuid() },
      ],
    } as Question;
    dispatch(addQuestion(newQuestion));
  };

  const thisFormRef = db.collection('forms').doc(formId);
  const saveClickHandler = () => {
    const newForm = { ...form };
    newForm.editedAt = nowSecond();

    thisFormRef
      .update(newForm)
      .then(() => {
        alert('성공적으로 저장되었습니다.🥳');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const publishClickHandler = () => {
    const newForm = { ...form };
    newForm.editedAt = nowSecond();
    thisFormRef
      .update(newForm)
      .then(() => {
        thisFormRef
          .update({ isCompleted: true })
          .then(() => {
            alert('성공적으로 저장 후, 공개되었습니다.🥳');
            history.push('/form/list');
          })
          .catch((error) => {
            console.log(error);
          });
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
      {/* <nav>편집 / 미리보기</nav> */}
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
          color="secondary"
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

      {form.isCompleted ? (
        <Button color="primary" style={{ margin: 16 }} isCompleted={true}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            배포완료
            <Icon.BookOpen />
          </span>
        </Button>
      ) : (
        <>
          <Button
            color="primary"
            onClick={saveClickHandler}
            style={{ margin: 16 }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              임시 저장하기
              <Icon.FolderAdd />
            </span>
          </Button>
          <Button
            color="primary"
            onClick={publishClickHandler}
            style={{ margin: 16 }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              공개하기
              <Icon.BookOpen />
            </span>
          </Button>
          <div> Ctrl(Cmd)+S 로 빠르게 저장할 수 있습니다</div>
        </>
      )}
    </div>
  );
}

export default FormCreatorPage;
