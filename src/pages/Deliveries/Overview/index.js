// Imports
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdEdit,
  MdMoreHoriz,
  MdRemoveRedEye,
  MdSearch,
} from 'react-icons/md';

// UI Imports
import { Status, ToggleFilter } from './styles';
import { Actions, InputControl, NotFound } from '~/components/Layout';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayDetails from '~/components/OverlayDetails';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';
import Profile from '~/components/Profile';

// App Imports
import {
  deliveryFindAllRequest,
  deliveryDeleteRequest,
} from '~/store/modules/delivery/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

// Component
export default function DeliveriesOverview({ history, match }) {
  const [page, setPage] = useState(1);
  const [withProblems, setwithProblems] = useState(null);
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

  const dispatch = useDispatch();

  const renderStatus = delivery => {
    const { canceled_at, start_date, end_date } = delivery;
    if (canceled_at !== null)
      return <Status status="canceled">Cancelada</Status>;
    if (start_date === null && canceled_at === null)
      return <Status status="pending">Pendente</Status>;
    if (end_date !== null && canceled_at === null)
      return <Status status="delivered">Entregue</Status>;
    if (start_date && end_date === null)
      return <Status status="pickedup">Em trânsito</Status>;
  };

  const renderProfile = profile => {
    const { name, avatar } = profile;
    return <Profile name={name} avatar={avatar ? avatar.url : null} />;
  };

  const renderDetails = delivery => {
    return (
      <OverlayDetails>
        {delivery.canceled_at !== null && (
          <h4>
            <span>
              Entrega cancelada em{' '}
              {format(new Date(delivery.canceled_at), "dd/MM/yyyy '-' p")}
            </span>
          </h4>
        )}
        <strong>Detalhes da Entrega</strong>
        <p>
          {delivery.recipient.street}, {delivery.recipient.number}
          {delivery.recipient.complement !== ' ' &&
            ` - ${delivery.recipient.complement}`}
        </p>
        <p>
          {delivery.recipient.city} - {delivery.recipient.state}
        </p>
        <p>{delivery.recipient.zip_code}</p>
        <hr />
        <strong>Histórico:</strong>
        <p>
          <strong>Retirado em:</strong>{' '}
          {delivery.start_date !== null
            ? format(new Date(delivery.start_date), "dd/MM/yyyy '-' p")
            : 'O produto ainda não foi retirado.'}
        </p>
        <p>
          <strong>Entregue em:</strong>{' '}
          {delivery.end_date !== null
            ? format(new Date(delivery.end_date), "dd/MM/yyyy '-' p")
            : 'O produto ainda não foi entregue.'}
        </p>
        {delivery.signature !== null && (
          <>
            <hr />
            <strong>Assinatura do destinatário</strong>
            <img src={delivery.signature.url} alt={delivery.recipient.name} />
          </>
        )}
      </OverlayDetails>
    );
  };

  const renderRemove = id => {
    return (
      <OverlayRemove>
        <h3>Atenção</h3>
        <p>Deseja excluir o registro selecionado?</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Não</Button>
          <Button primary onClick={() => dispatch(deliveryDeleteRequest(id))}>
            Sim
          </Button>
        </footer>
      </OverlayRemove>
    );
  };

  const recordCount = useSelector(state => state.delivery.count);

  const deliveries = useSelector(state =>
    state.delivery.deliveries.map(deliveryItem => {
      const status = renderStatus(deliveryItem);
      const profile = renderProfile(deliveryItem.deliveryman);

      return {
        ...deliveryItem,
        profile,
        status,
      };
    })
  );

  useEffect(() => {
    async function findAllDeliveries() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const deliveriesParams = {
        withProblems,
        page,
        search: queryInput !== '' ? queryInput : null,
      };

      dispatch(deliveryFindAllRequest(deliveriesParams));
    }

    findAllDeliveries();
  }, [page, queryInput, withProblems, dispatch]);

  function handleActionClick(action, id) {
    const { url } = match;
    switch (action) {
      case 'update':
        history.push(`${url}/update/${id}`);
        break;
      case 'view':
        dispatch(openOverlay(renderDetails(id)));
        break;
      case 'delete':
        dispatch(openOverlay(renderRemove(id)));
        break;
      default:
        history.push(url);
    }
  }

  function toggleDeliveriesWithOccurrences() {
    setPage(1);
    setwithProblems(!withProblems);
  }

  function handlePagination(action) {
    setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Gestão de entregas" />
      <Actions>
        <InputControl noMargin autoWidth iconLeft>
          <input
            type="text"
            placeholder="Busca por produtos..."
            onChange={e => setQuery(e.target.value)}
          />
          <MdSearch color="#999" size={21} />
        </InputControl>
        <ToggleFilter
          active={withProblems}
          onClick={toggleDeliveriesWithOccurrences}
        >
          Ocorrências
        </ToggleFilter>
        <Button
          primary
          onClick={() => history.push('/deliveries/create')}
          icon={<MdAdd color="#fff" size={16} />}
        >
          Inserir
        </Button>
      </Actions>
      {recordCount !== 0 ? (
        <>
          <DataTable>
            <thead>
              <tr>
                <th>Id.</th>
                <th>Produto</th>
                <th>Destinatário</th>
                <th>Entregador</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(delivery => (
                <tr key={delivery.id}>
                  <td>#{delivery.id}</td>
                  <td>{delivery.product}</td>
                  <td>{delivery.recipient.name}</td>
                  <td>{delivery.profile}</td>
                  <td>{delivery.recipient.city}</td>
                  <td>{delivery.recipient.state}</td>
                  <td>{delivery.status}</td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() => handleActionClick('view', delivery)}
                        icon={<MdRemoveRedEye color="#8E5BE8" size={16} />}
                        label="Visualizar"
                      />
                      {delivery.canceled_at === null && (
                        <PopoverButton
                          clickAction={() =>
                            handleActionClick('update', delivery.id)
                          }
                          icon={<MdEdit color="#4D85EE" size={16} />}
                          label="Alterar"
                        />
                      )}
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('delete', delivery.id)
                        }
                        icon={<MdDeleteForever color="#DE3B3B" size={16} />}
                        label="Excluir"
                      />
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          {recordCount > 10 && (
            <Pagination>
              <button
                disabled={page === 1}
                onClick={() => handlePagination('prev')}
              >
                <MdChevronLeft size={14} color="#fff" />
              </button>
              <button
                disabled={deliveries.length < 10}
                onClick={() => handlePagination('next')}
              >
                <MdChevronRight size={14} color="#fff" />
              </button>
            </Pagination>
          )}
        </>
      ) : (
        <NotFound>
          Nenhum registro foi encontrado. Tente uma nova busca.
        </NotFound>
      )}
    </>
  );
}
