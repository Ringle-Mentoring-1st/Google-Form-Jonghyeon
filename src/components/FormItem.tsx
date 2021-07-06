import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from '../model/Forms';
import moment from 'moment';
import 'moment/locale/ko';
import * as Icon from 'heroicons-react';

interface FormItem {
  form: Form;
}

function FormItem({ form }: FormItem) {
  const history = useHistory();
  const clickItemHandler = () => {
    history.push(`/form/${form.uuid}`);
  };

  const editedAtString = `${moment(new Date(form.editedAt * 1000)).fromNow()} ${
    form.editedAt !== form.createdAt ? '수정됨' : ''
  }`;
  return (
    <StyledItemContainer>
      <StyledItemCard onClick={clickItemHandler}>
        <Icon.DocumentText size={30} style={{ color: 'lightgray' }} />
        <div>
          <h2 style={{ letterSpacing: -0.5 }}>
            {form.title ? form.title : '무제'}
          </h2>
          <h6>{editedAtString}</h6>
        </div>
      </StyledItemCard>
    </StyledItemContainer>
  );
}

export default FormItem;

const StyledItemContainer = styled.li`
  list-style: none;
  text-align: left;
`;

const StyledItemCard = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 180px;
  color: #2b2b2b;
  background-color: #ffffff75;
  border: 1px solid #ffffff;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  display: flex;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.2);
  :hover {
    background-color: #ffffff;
    border: 1px solid #fff;
    box-shadow: 0px 12px 60px -20px rgba(0, 0, 0, 0.2);
  }
  transition: 0.3s ease;
`;
