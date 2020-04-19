// Imports
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import {
  MdAdd,
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdEdit,
  MdMoreHoriz,
  MdSearch,
} from 'react-icons/md';

// UI Imports
import { Actions, InputControl, NotFound } from '~/components/Layout';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';
import Profile from '~/components/Profile';

// App Imports
import {
  deliverymanFindAllRequest,
  deliverymanDeleteRequest,
} from '~/store/modules/deliveryman/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

// Component
export default function DeliverymenOverview({ history, match }) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [queryInput] = useDebounce(query, 500);

  const dispatch = useDispatch();

  const renderProfile = profile => {
    const { name, avatar = null } = profile;
    return <Profile name={name} avatar={avatar ? avatar.url : null} noName />;
  };

  const renderRemove = id => {
    return (
      <OverlayRemove>
        <h3>Atenção</h3>
        <p>Deseja excluir o registro selecionado?</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Não</Button>
          <Button
            primary
            onClick={() => dispatch(deliverymanDeleteRequest(id))}
          >
            Sim
          </Button>
        </footer>
      </OverlayRemove>
    );
  };

  const recordCount = useSelector(state => state.deliveryman.count);

  const deliverymen = useSelector(state =>
    state.deliveryman.deliverymen.map(deliverymanItem => {
      const profile = renderProfile(deliverymanItem);

      return {
        ...deliverymanItem,
        profile,
      };
    })
  );

  useEffect(() => {
    async function findAllDeliverymen() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const deliverymenParams = {
        page,
        search: queryInput !== '' ? queryInput : null,
      };

      dispatch(deliverymanFindAllRequest(deliverymenParams));
    }

    findAllDeliverymen();
  }, [page, queryInput, dispatch]);

  function handleActionClick(action, id) {
    const { url } = match;
    switch (action) {
      case 'update':
        history.push(`${url}/update/${id}`);
        break;
      case 'delete':
        dispatch(openOverlay(renderRemove(id)));
        break;
      default:
        history.push(url);
    }
  }

  async function handlePagination(action) {
    await setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Gestão de entregadores" />
      <Actions>
        <InputControl noMargin autoWidth iconLeft>
          <input
            type="text"
            placeholder="Busca por entregadores..."
            onChange={e => setQuery(e.target.value)}
          />
          <MdSearch color="#999" size={21} />
        </InputControl>
        <Button
          primary
          onClick={() => history.push('/deliverymen/create')}
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
                <th>Avatar</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymen.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>{deliveryman.profile}</td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('update', deliveryman.id)
                        }
                        icon={<MdEdit color="#4D85EE" size={16} />}
                        label="Alterar"
                      />
                      <PopoverButton
                        clickAction={() =>
                          handleActionClick('delete', deliveryman.id)
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
                disabled={deliverymen.length < 10}
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
