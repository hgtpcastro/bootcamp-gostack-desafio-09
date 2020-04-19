// Imports
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import TextTruncate from 'react-text-truncate';
import {
  MdChevronLeft,
  MdChevronRight,
  MdDeleteForever,
  MdRemoveRedEye,
  MdMoreHoriz,
} from 'react-icons/md';

// UI Imports
import { NotFound, IssueCanceled } from '~/components/Layout';
import OverlayDetails from '~/components/OverlayDetails';
import Button from '~/components/Button';
import DataTable from '~/components/DataTable';
import Heading from '~/components/Heading';
import OverlayRemove from '~/components/OverlayRemove';
import Pagination from '~/components/Pagination';
import Popover from '~/components/Popover';
import PopoverButton from '~/components/PopoverButton';

// App Imports
import {
  occurrenceFindAllRequest,
  occurrenceCancelDeliveryRequest,
} from '~/store/modules/occurrence/actions';
import { openOverlay, closeOverlay } from '~/store/modules/overlay/actions';

// Component
export default function OccurencesOverview() {
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const renderRemove = id => {
    return (
      <OverlayRemove>
        <h3>Atenção</h3>
        <p>Deseja cancelar a entrega selecionada?</p>
        <footer>
          <Button onClick={() => dispatch(closeOverlay())}>Não</Button>
          <Button
            primary
            onClick={() => dispatch(occurrenceCancelDeliveryRequest(id))}
          >
            Sim
          </Button>
        </footer>
      </OverlayRemove>
    );
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
        <strong>Histórico de ocorrências:</strong>
        <ul>
          {delivery.problems.map(problem => (
            <li>
              <p>{problem.description}</p>
              <small>
                {format(new Date(problem.createdAt), "dd/MM/yyyy '-' p")}
              </small>
            </li>
          ))}
        </ul>
      </OverlayDetails>
    );
  };

  const recordCount = useSelector(state => state.occurrence.count);

  const deliveriesWithOccurrences = useSelector(
    state => state.occurrence.occurrences
  );

  useEffect(() => {
    async function findAllOccurrences() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      const occurrencesParams = {
        withOccurrences: true,
        page,
      };

      dispatch(occurrenceFindAllRequest(occurrencesParams));
    }

    findAllOccurrences();
  }, [page, dispatch]);

  function handleActionClick(action, id) {
    switch (action) {
      case 'view':
        dispatch(openOverlay(renderDetails(id)));
        break;
      case 'delete':
        dispatch(openOverlay(renderRemove(id)));
        break;
      default:
    }
  }

  async function handlePagination(action) {
    await setPage(action === 'prev' ? page - 1 : page + 1);
  }

  return (
    <>
      <Heading title="Gestão de ocorrências" />
      {recordCount !== 0 ? (
        <>
          <DataTable>
            <thead>
              <tr>
                <th>Entrega</th>
                <th>Ocorrências</th>
                <th>Última Ocorrência</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliveriesWithOccurrences.map(delivery => (
                <tr key={delivery.id}>
                  <td>#{delivery.id}</td>
                  <td>{delivery.problems.length}</td>
                  <td>
                    {delivery.canceled_at !== null && (
                      <>
                        <IssueCanceled>
                          Entrega cancelada em{' '}
                          {format(
                            new Date(delivery.canceled_at),
                            "dd/MM/yyyy '-' p"
                          )}
                        </IssueCanceled>
                      </>
                    )}
                    <TextTruncate
                      line={1}
                      truncateText="…"
                      element="span"
                      text={delivery.problems[0].description}
                    />
                  </td>
                  <td>
                    <Popover trigger={<MdMoreHoriz color="#666" size={18} />}>
                      <PopoverButton
                        clickAction={() => handleActionClick('view', delivery)}
                        icon={<MdRemoveRedEye color="#8E5BE8" size={16} />}
                        label="Visualizar Ocorrências"
                      />
                      {delivery.canceled_at === null && (
                        <PopoverButton
                          clickAction={() =>
                            handleActionClick('delete', delivery.problems[0].id)
                          }
                          icon={<MdDeleteForever color="#DE3B3B" size={16} />}
                          label="Cancelar Entrega"
                        />
                      )}
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
                disabled={deliveriesWithOccurrences.length < 10}
                onClick={() => handlePagination('next')}
              >
                <MdChevronRight size={14} color="#fff" />
              </button>
            </Pagination>
          )}
        </>
      ) : (
        <NotFound>Nenhum registro foi encontrado.</NotFound>
      )}
    </>
  );
}
