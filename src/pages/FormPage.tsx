import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { activateLoading, deactivateLoading } from '../store/slices/uiSlice';
import Loading from '../ui/Loading';
import { db } from '../utils/firebase';

function FormPage() {
  const { formId }: { formId: string } = useParams();
  const isLoading = useAppSelector(state => state.ui.isLoading);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<Form>({
    title: '하이',
    createdAt: 0,
    creator: '',
    editedAt: 0,
    questions: [],
    uuid: '',
  });

  useEffect(() => {
    dispatch(activateLoading());
    db.collection('forms')
      .doc(formId)
      .get()
      .then(doc => {
        if (doc.exists) {
          setForm(doc.data() as Form);
        } else {
          setForm(prev => {
            const newForm = { ...prev };
            newForm.title = '찾으시는 설문지 폼이 없습니다.';
            return newForm;
          });
        }
        dispatch(deactivateLoading());
      })
      .catch(() => {
        dispatch(deactivateLoading());
      });
  }, []);

  return (
    <div>
      <Loading isLoading={isLoading} />
      {form.title}
    </div>
  );
}

export default FormPage;
