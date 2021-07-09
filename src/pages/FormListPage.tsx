import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FormItem from '../components/FormItem';
import { Form } from '../model/Forms';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getFormList } from '../store/slices/formSlice';
import { activateLoading, deactivateLoading } from '../store/slices/uiSlice';
import Loading from '../ui/Loading';
import { db } from '../utils/firebase';

function FormListPage() {
  const uid = useAppSelector((state) => state.user.userProfile.uid);
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.form.list);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  useEffect(() => {
    dispatch(activateLoading());
    db.collection('forms')
      .where('creator', '==', uid)
      .get()
      .then((docs) => {
        const newForms: Form[] = [];
        docs.forEach((doc) => {
          const newForm = doc.data() as Form;
          newForm.uuid = doc.id;
          newForms.push(newForm);
        });
        dispatch(getFormList(newForms));
        dispatch(deactivateLoading());
      });

    console.log(forms);
  }, []);

  const formIsCompleted = forms.filter((form) => form.isCompleted === true);
  const formIsNotCompleted = forms.filter((form) => form.isCompleted === false);

  return (
    <div>
      <Loading isLoading={isLoading} />
      <h2 style={{ marginTop: 30, textAlign: 'left', marginLeft: 28 }}>
        {formIsCompleted.length > 0 && '공개된 설문지'}
      </h2>
      <FormItemContainer>
        {formIsCompleted.map((form) => (
          <FormItem key={form.uuid} form={form} />
        ))}
      </FormItemContainer>
      <h2 style={{ marginTop: 30, textAlign: 'left', marginLeft: 28 }}>
        {formIsNotCompleted.length > 0 && '작성중인 설문지'}
      </h2>
      <FormItemContainer>
        {formIsNotCompleted.map((form) => (
          <FormItem key={form.uuid} form={form} />
        ))}
      </FormItemContainer>
    </div>
  );
}

export default FormListPage;

const FormItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid: auto-flow;
  gap: 16px;
  margin: 16px;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
