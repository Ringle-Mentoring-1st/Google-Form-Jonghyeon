import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Form } from '../model/Forms';
import moment from 'moment';
import 'moment/locale/ko';
import * as Icon from 'heroicons-react';
import ClipboardCopyButton from './ClipboardCopyButton';
import theme from '../styles/theme';

interface FormItem {
  form: Form;
}

function FormItem({ form }: FormItem) {
  const history = useHistory();
  const clickItemHandler = () => {
    history.push(`/form/${form.uuid}/creator`);
  };

  const editedAtString = `${moment(new Date(form.editedAt * 1000)).fromNow()} ${
    form.editedAt !== form.createdAt ? '수정됨' : ''
  }`;

  return (
    <StyledItemContainer>
      <StyledItemCard onClick={clickItemHandler} isCompleted={form.isCompleted}>
        <div style={{ display: 'flex' }}>
          <div>
            {' '}
            <Icon.PencilAlt size={30} style={{ color: 'lightgray' }} />
            <h3 style={{ letterSpacing: -0.5 }}>
              {form.title ? form.title : '무제'}
            </h3>
            {form.isCompleted ? (
              <h6>{moment(new Date(form.editedAt * 1000)).fromNow()}에 완성</h6>
            ) : (
              <h6>{editedAtString}</h6>
            )}
          </div>
        </div>
        {form.isCompleted && (
          <ClipboardCopyButton
            isCompleted={form.isCompleted}
            copyText={`http://formsaengformsa.com/form/${form.uuid}/response`}
            color="secondary"
            size="small"
            fill
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon.Link size={18} /> 링크 복사하기
            </span>
          </ClipboardCopyButton>
        )}
      </StyledItemCard>
    </StyledItemContainer>
  );
}

export default FormItem;

const StyledItemContainer = styled.li`
  list-style: none;
  text-align: left;
`;

const StyledItemCard = styled.div<{ isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  min-height: 180px;
  color: #2b2b2b;
  background-color: #ffffff75;
  border: 1px solid #ffffff;
  border-radius: 16px;
  padding: 16px;
  cursor: pointer;
  box-shadow: 0px 12px 32px -12px rgba(0, 0, 0, 0.2);
  :hover {
    background-color: #ffffff;
    border: 1px solid #fff;
    box-shadow: 0px 12px 60px -20px rgba(0, 0, 0, 0.2);
  }
  transition: 0.3s ease;
`;
