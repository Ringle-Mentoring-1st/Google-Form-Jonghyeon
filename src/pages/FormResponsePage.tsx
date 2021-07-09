import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setForm } from '../store/slices/formSlice';
import { activateLoading, deactivateLoading } from '../store/slices/uiSlice';
import Loading from '../ui/Loading';
import { Paper } from '../ui/StyledComponents';
import QuestionItemRespondent from '../components/QuestionItemRespondent';
import TextInput from '../ui/TextInput';
import { db, nowSecond } from '../utils/firebase';
import { _uuid } from '../utils/uuid';
import {
  setResponse,
  setResponserUuid,
  clearResponse,
} from '../store/slices/responseSlice';
import Button from '../ui/Button';
import * as Icon from 'heroicons-react';
import { Response, QuestionResponse } from '../model/Response';
import { Question } from '../model/Forms';

function FormResponsePage() {
  const { formId }: { formId: string } = useParams();
  const response = useAppSelector((state) => state.response);
  const form = useAppSelector((state) => state.form.form);
  const responserUuid = useAppSelector((state) => state.response.responserUuid);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearResponse());
    if (!responserUuid) {
      dispatch(setResponserUuid(_uuid()));
    }
    dispatch(activateLoading());
    db.collection('forms')
      .doc(formId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const newForm = doc.data() as Form;
          newForm.uuid = doc.id;
          dispatch(setForm(newForm));

          const newResponse = { responserUuid, questions: [] } as Response;

          newForm.questions.forEach((question: Question) => {
            const newQuestion = {} as QuestionResponse;
            newQuestion.uuid = question.uuid;
            newQuestion.type = question.questionType;
            switch (newQuestion.type) {
              case 'text':
                newQuestion.textAnswer = '';
                break;
              case 'checkbox':
                newQuestion.answer = [];
                break;
              case 'radio':
                newQuestion.answer = [];
                break;
              default:
                break;
            }

            newResponse.questions.push(newQuestion);
          });

          dispatch(setResponse(newResponse));

          doc.ref
            .collection('response')
            .doc(responserUuid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                dispatch(setResponse(doc.data() as Response));
              } else {
                console.log('not exist');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const newForm = { ...form };
          dispatch(setForm(newForm));
        }
        dispatch(deactivateLoading());
      })
      .catch(() => {
        dispatch(deactivateLoading());
      });
  }, []);

  const responseRef = db.collection('forms').doc(formId).collection('response');
  const submitClickHandler = () => {
    dispatch(activateLoading());
    const newResponse = { ...response };
    responseRef
      .doc(responserUuid)
      .set(newResponse)
      .then(() => {
        alert('성공적으로 제출하였습니다.🥳');
        dispatch(deactivateLoading());
      })
      .catch((error) => {
        dispatch(deactivateLoading());
        console.log(error);
      });
  };

  if (!form.isCompleted) {
    return <div>아직 설문지가 제작 중입니다.</div>;
  }

  return (
    <div>
      <Loading isLoading={isLoading} />
      <Paper>
        <h2>{form.title}</h2>
        <ul>
          {form.questions.map((question, index) => (
            <QuestionItemRespondent
              question={question}
              index={index}
            ></QuestionItemRespondent>
          ))}
        </ul>
      </Paper>
      <Button
        color="primary"
        onClick={submitClickHandler}
        style={{ margin: 16 }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          제출하기
          <Icon.FolderAdd />
        </span>
      </Button>
    </div>
  );
}

export default FormResponsePage;
