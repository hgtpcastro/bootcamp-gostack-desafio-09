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
import Select from '~/components/Select';
import { Row, Column, InputControl } from '~/components/Layout';

// App Imports
import {
  deliveryCreateRequest,
  deliveryUpdateRequest,
  deliveryFindOneRequest,
  deliveryInputChange,
} from '~/store/modules/delivery/actions';
import { recipientFindAllRequest } from '~/store/modules/recipient/actions';
import { deliverymanFindAllRequest } from '~/store/modules/deliveryman/actions';

// Validations
const schema = Yup.object().shape({
  product: Yup.string().required('Informe o nome do produto!'),
  deliveryman_id: Yup.string().required('Selecione um entregador!'),
  recipient_id: Yup.string().required('Selecione um destinatário!'),
});

// Component
export default function DeliveryDetails({ history, match }) {
  const isCreate = match.url.includes('create');
  const { delivery_id } = match.params;

  const saving = useSelector(state => state.delivery.saving);
  const product = useSelector(state => state.delivery.product);
  const deliveryman_id = useSelector(state => state.delivery.deliveryman_id);
  const recipient_id = useSelector(state => state.delivery.recipient_id);

  const recipients = useSelector(state =>
    state.recipient.recipients.map(r => ({
      value: r.id,
      label: r.name,
    }))
  );

  const deliverymen = useSelector(state =>
    state.deliveryman.deliverymen.map(d => ({
      value: d.id,
      label: d.name,
    }))
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function findAllRecipients() {
      dispatch(recipientFindAllRequest());
    }
    findAllRecipients();

    async function findAllDeliverymen() {
      dispatch(deliverymanFindAllRequest());
    }
    findAllDeliverymen();

    async function findOneDelivery() {
      dispatch(deliveryFindOneRequest(delivery_id));
    }

    if (!isCreate) {
      findOneDelivery();
    } else {
      const cleanupField = ['product', 'deliveryman_id', 'recipient_id'];
      cleanupField.forEach(field => {
        dispatch(deliveryInputChange(field, ''));
      });
    }
  }, [delivery_id, isCreate, dispatch]);

  function handleInputChange(input, e) {
    dispatch(deliveryInputChange(input, e.target.value));
  }

  function handleSelectChange(input, e) {
    dispatch(deliveryInputChange(input, e.value));
  }

  async function handleSubmit() {
    schema
      .validate({
        product,
        recipient_id,
        deliveryman_id,
      })
      .catch(err => {
        toast.error(err.message);
      })
      .then(valid => {
        if (valid) {
          const delivery = {
            recipient_id,
            deliveryman_id,
            product,
          };
          if (isCreate) {
            dispatch(deliveryCreateRequest(delivery));
          } else {
            dispatch(deliveryUpdateRequest(delivery_id, delivery));
          }
        }
      });
  }

  return (
    <>
      <Heading
        title={isCreate ? 'Inserindo entrega...' : 'Alterando entrega...'}
      >
        <Button
          onClick={() => history.push('/deliveries')}
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
            <Column size={50}>
              <InputControl>
                <label>Destinatário</label>
                <Select
                  name="recipient"
                  value={recipient_id}
                  onChange={e => handleSelectChange('recipient_id', e)}
                  placeholder="Selecione um destinatário..."
                  options={recipients}
                />
              </InputControl>
            </Column>
            <Column size={50}>
              <InputControl>
                <label>Entregador</label>
                <Select
                  name="deliveryman"
                  value={deliveryman_id}
                  onChange={e => handleSelectChange('deliveryman_id', e)}
                  placeholder="Selecione um entregador..."
                  options={deliverymen}
                />
              </InputControl>
            </Column>
          </Row>
          <Row>
            <Column>
              <InputControl>
                <label>Produto:</label>
                <input
                  name="product"
                  value={product}
                  onChange={e => handleInputChange('product', e)}
                  type="text"
                  placeholder="Informe o nome do produto..."
                />
              </InputControl>
            </Column>
          </Row>
        </form>
      </FormWrapper>
    </>
  );
}
