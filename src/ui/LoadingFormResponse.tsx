import React from 'react';
import styled from 'styled-components';

function LoadingFormResponse() {
  return (
    <>
      <FakeText style={{ height: 40, width: '40%' }} />
      <FakeCard>
        <FakeText style={{ height: 20, width: '30%' }} />
        <FakeText style={{ height: 40, width: '60%' }} />
        <br />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '80%' }} />
      </FakeCard>
      <FakeCard>
        <FakeText style={{ height: 20, width: '30%' }} />
        <FakeText style={{ height: 40, width: '60%' }} />
        <br />
        <FakeText style={{ height: 50, width: '90%' }} />
        <FakeText style={{ height: 50, width: '90%' }} />
        <FakeText style={{ height: 50, width: '90%' }} />
      </FakeCard>
      <FakeCard>
        <FakeText style={{ height: 20, width: '30%' }} />
        <FakeText style={{ height: 40, width: '50%' }} />
        <br />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '70%' }} />
      </FakeCard>
      <FakeCard>
        <FakeText style={{ height: 20, width: '30%' }} />
        <FakeText style={{ height: 40, width: '60%' }} />
        <br />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '90%' }} />
        <FakeText style={{ height: 14, width: '80%' }} />
      </FakeCard>
    </>
  );
}

export default LoadingFormResponse;

const FakeCard = styled.div`
  border-radius: 16px;
  padding: 16px;
  background: #e9e9e9;
  min-height: 180px;
  margin-bottom: 16px;
`;

const FakeText = styled.div`
  margin-bottom: 12px;
  border-radius: 16px;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: linear-gradient(to right, #ddd 8%, #d0d0d0 18%, #ddd 32%);
  background-size: 800px 104px;

  position: relative;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`;
