/* eslint-disable jsx-a11y/label-has-associated-control */
// Imports
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

// UI Imports
import Button from '~/components/Button';
import FormWrapper from '~/components/FormWrapper';
import Heading from '~/components/Heading';
import AvatarInput from '~/components/AvatarInput';
import { Row, Column, InputControl } from '~/components/Layout';

// App Imports
import {
  deliverymanCreateRequest,
  deliverymanUpdateRequest,
  deliverymanFindOneRequest,
  deliverymanInputChange,
} from '~/store/modules/deliveryman/actions';

// Validations
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido!')
    .required('O e-mail é requerido!'),
  name: Yup.string().required('Informe o nome do entregador!'),
});

// Component
export default function DeliverymanDetails({ history, match }) {
  const isCreate = match.url.includes('create');
  const { deliveryman_id } = match.params;

  const saving = useSelector(state => state.deliveryman.saving);
  const name = useSelector(state => state.deliveryman.name);
  const email = useSelector(state => state.deliveryman.email);
  const avatar = useSelector(state => state.deliveryman.avatar);

  const dispatch = useDispatch();

  useEffect(() => {
    async function findOneDeliveryman() {
      dispatch(deliverymanFindOneRequest(deliveryman_id));
    }

    if (!isCreate) {
      findOneDeliveryman();
    } else {
      const cleanupField = ['name', 'email'];
      cleanupField.forEach(field => {
        dispatch(deliverymanInputChange(field, ''));
      });
      dispatch(deliverymanInputChange('avatar', null));
    }
  }, [deliveryman_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(deliverymanInputChange(input, e.target.value));
  }

  async function handleSubmit() {
    schema
      .validate({
        name,
        email,
      })
      .catch(err => {
        toast.error(err.message);
      })
      .then(valid => {
        if (valid) {
          const deliveryman = {
            name,
            email,
            avatar_id: avatar ? avatar.id : null,
          };
          if (isCreate) {
            dispatch(deliverymanCreateRequest(deliveryman));
          } else {
            dispatch(deliverymanUpdateRequest(deliveryman_id, deliveryman));
          }
        }
      });
  }

  return (
    <>
      <Heading
        title={isCreate ? 'Inserindo entregador...' : 'Alterando entregador'}
      >
        <Button
          onClick={() => history.push('/deliverymen')}
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
          <AvatarInput avatar={avatar} name={isCreate ? '' : name} />
          <Row>
            <Column>
              <InputControl>
                <label>Nome:</label>
                <input
                  name="name"
                  value={name}
                  onChange={e => handleInputChange('name', e)}
                  type="text"
                  placeholder="Nome do entregador..."
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column>
              <InputControl>
                <label>E-mail:</label>
                <input
                  name="email"
                  value={email}
                  onChange={e => handleInputChange('email', e)}
                  type="email"
                  placeholder="E-mail do entregador..."
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
