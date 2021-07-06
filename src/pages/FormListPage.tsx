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
  const uid = useAppSelector(state => state.user.userProfile.uid);
  const dispatch = useAppDispatch();
  const forms = useAppSelector(state => state.form.list);
  const isLoading = useAppSelector(state => state.ui.isLoading);
  useEffect(() => {
    dispatch(activateLoading());
    db.collection('forms')
      .where('creator', '==', uid)
      .get()
      .then(docs => {
        const newForms: Form[] = [];
        docs.forEach(doc => {
          const newForm = doc.data() as Form;
          newForm.uuid = doc.id;
          newForms.push(newForm);
        });
        dispatch(getFormList(newForms));
        dispatch(deactivateLoading());
      });

    console.log(forms);
  }, []);

  return (
    <div>
      <h1>내 설문지들</h1>
      <FormItemContainer>
        <Loading isLoading={isLoading} />

        {forms.map(form => (
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
