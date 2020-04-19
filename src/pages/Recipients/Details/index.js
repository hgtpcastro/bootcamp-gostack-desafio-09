/* eslint-disable jsx-a11y/label-has-associated-control */
// Imports
import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

// UI Imports
import Button from '~/components/Button';
import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import { Row, Column, InputControl } from '~/components/Layout';

// App Imports
import {
  recipientCreateRequest,
  recipientUpdateRequest,
  recipientFindOneRequest,
  recipientInputChange,
} from '~/store/modules/recipient/actions';

// Validations
const schema = Yup.object().shape({
  zip_code: Yup.string().required('Informe o CEP!'),
  state: Yup.string().required('Informe o estado!'),
  city: Yup.string().required('Informe a cidade!'),
  number: Yup.string().required('Informe o número'),
  street: Yup.string().required('Informe o endereço!'),
  name: Yup.string().required('Informe o nome do destinatário!'),
});

// Component
export default function RecipientDetails({ history, match }) {
  const isCreate = match.url.includes('create');
  const { recipient_id } = match.params;

  const saving = useSelector(state => state.recipient.saving);
  const current = useSelector(state => state.recipient.current);

  const dispatch = useDispatch();

  useEffect(() => {
    async function findOneRecipient() {
      dispatch(recipientFindOneRequest(recipient_id));
    }

    if (!isCreate) {
      findOneRecipient();
    } else {
      const cleanupField = [
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'zip_code',
      ];
      cleanupField.forEach(field => {
        dispatch(recipientInputChange(field, ''));
      });
    }
  }, [recipient_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(recipientInputChange(input, e.target.value));
  }

  async function handleSubmit() {
    schema
      .validate(current)
      .catch(err => {
        toast.error(err.message);
      })
      .then(valid => {
        if (valid) {
          const recipient = current;
          if (isCreate) {
            dispatch(recipientCreateRequest(recipient));
          } else {
            dispatch(recipientUpdateRequest(recipient_id, recipient));
          }
        }
      });
  }

  return (
    <>
      <Heading
        title={
          isCreate ? 'Inserindo destinatário...' : 'Alterando destinatário...'
        }
      >
        <Button
          onClick={() => history.push('/recipients')}
          icon={<MdChevronLeft color="#fff" size={16} />}
        >
          Voltar
        </Button>
        <Button
          primary
          onClick={handleSubmit}
          icon={!saving && <MdCheck color="#fff" size={16} />}
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
      </Heading>
      <FormWrapper>
        <form schema={schema}>
          <Row>
            <Column>
              <InputControl>
                <label>Nome</label>
                <input
                  name="name"
                  value={current.name}
                  onChange={e => handleInputChange('name', e)}
                  type="text"
                  placeholder="Nome do destinatário..."
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column size={60}>
              <InputControl>
                <label>Endereço</label>
                <input
                  name="street"
                  value={current.street}
                  onChange={e => handleInputChange('street', e)}
                  type="text"
                  placeholder="Rua/Av..."
                />
              </InputControl>
            </Column>
            <Column size={20}>
              <InputControl>
                <label>Número</label>
                <input
                  name="number"
                  value={current.number}
                  onChange={e => handleInputChange('number', e)}
                  type="text"
                  placeholder="0"
                />
              </InputControl>
            </Column>
            <Column size={20}>
              <InputControl>
                <label>Complemento</label>
                <input
                  name="complement"
                  value={current.complement}
                  onChange={e => handleInputChange('complement', e)}
                  type="text"
                  placeholder="Complemento..."
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column size={33}>
              <InputControl>
                <label>Cidade</label>
                <input
                  name="city"
                  value={current.city}
                  onChange={e => handleInputChange('city', e)}
                  type="text"
                  placeholder="Cidade..."
                />
              </InputControl>
            </Column>
            <Column size={33}>
              <InputControl>
                <label>Estado</label>
                <input
                  name="state"
                  value={current.state}
                  onChange={e => handleInputChange('state', e)}
                  type="text"
                  placeholder="UF"
                />
              </InputControl>
            </Column>
            <Column size={33}>
              <InputControl>
                <label>Cep</label>
                <InputMask
                  name="zip_code"
                  value={current.zip_code}
                  onChange={e => handleInputChange('zip_code', e)}
                  type="text"
                  mask="99999-999"
                  placeholder="00000-000"
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
