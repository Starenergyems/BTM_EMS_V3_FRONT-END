import { useEffect, useMemo, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { PageBox } from '@/components/units';
import Typography from '@/components/units/typography';
import { useBoolean } from '@/hooks/useBoolean';
import { pagesPathName } from '@/router';
import { Card, Col, Row, Tooltip } from 'antd';
import { FormOverview } from './formOverview/index';
import { ExtraFormFields, ExtraLabels } from './formOverview/indexConfig';
import { useHelpers } from './indexHelper';
import { ModalOverview } from './modal/index';
import ScopeStyle from './indexStyle';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function Schedule() {
  const routeName = pagesPathName.setting.schedule.pathName;
  const location = useLocation();
  const navigate = useNavigate();

  const toggle = useBoolean(false);

  const [eventIndex, setEventIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [calevents, setCalEvents] = useState([]);
  const [prefillEvent, setPrefillEvent] = useState(null);
  const [prefillVersion, setPrefillVersion] = useState(0);

  const { delEvent, eventColors, getEventData, handleDelete } = useHelpers({
    calevents,
    eventIndex,
    setCalEvents,
    setEventIndex,
    toggle,
  });

  useEffect(() => {
    getEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 預填事件處理邏輯(from chatbot tool)
  useEffect(() => {
    const nextPrefillEvent = location.state?.prefillEvent;

    if (!nextPrefillEvent) return;

    setPrefillEvent(nextPrefillEvent);
    setPrefillVersion((prev) => prev + 1);
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const prefillList = useMemo(() => {
    if (!prefillEvent) return [];

    const toNormalised = (item) => {
      if (!item || typeof item !== 'object') return null;
      // 如果已有 extendedProps 結構就直接用，否則把 item 扁平包進去
      if (item.extendedProps) return item;
      const { end, start, ...rest } = item;
      return {
        end: end ?? null,
        extendedProps: rest,
        start: start ?? null,
      };
    };

    const raw = Array.isArray(prefillEvent) ? prefillEvent : [prefillEvent];
    return raw.map(toNormalised).filter(Boolean);
  }, [prefillEvent]);

  const CustomEvent = ({ event }) => {
    const strategy = event?.extendedProps?.strategy;
    const strategyName = event?.title;

    const props = (ExtraFormFields?.[strategy] || []).concat(
      ExtraLabels?.[strategy] || [],
    );

    return (
      <Tooltip
        title={
          <div
            style={{
              minWidth: '120px',
              textAlign: 'center',
            }}
          >
            <Typography size="xs">{strategyName}</Typography>
            {strategy === 'spinning' ? (
              <Typography size="xs">
                報價功率：{event?.extendedProps?.offer?.offer_kw ?? '--'} kW
                <br />
                得標功率：{event?.extendedProps?.reserve?.reserve_kw ?? '--'} kW
              </Typography>
            ) : (
              props.map((prop) => (
                <Typography key={prop} size="xs">
                  {prop?.formItemAttr?.label}:{' '}
                  {prop?.type === 'select'
                    ? prop?.formItemAttr?.options?.filter(
                        (option) =>
                          option.value ===
                          event?.extendedProps?.[prop?.formItemAttr?.name],
                      )[0]?.label
                    : event?.extendedProps?.[prop?.formItemAttr?.name] ||
                      '--'}{' '}
                  {prop?.formItemAttr?.unit}
                </Typography>
              ))
            )}
          </div>
        }
      >
        <div>{event.title || strategy}</div>
      </Tooltip>
    );
  };

  return (
    <ScopeStyle>
      <PageBox headerTitle={`${routeName} Operation Scheduling`}>
        <Row className="calendar-wrap" gutter={20}>
          <Col xl={7} xs={24} xxl={6}>
            <FormOverview
              events={calevents}
              getEventData={getEventData}
              initialList={prefillList}
              key={`prefill-${prefillVersion}`}
            />
          </Col>
          <Col xl={17} xs={24} xxl={18}>
            <Card>
              <Calendar
                components={{ event: CustomEvent }}
                date={date}
                defaultDate={new Date()}
                defaultView="month"
                eventPropGetter={(event) => eventColors(event)}
                events={calevents.map((event) => ({
                  ...event,
                  end: new Date(event.end),
                  start: new Date(event.start),
                }))}
                localizer={localizer}
                onNavigate={(newDate) => setDate(newDate)}
                onSelectEvent={(event) => delEvent(event)}
                onView={(newView) => setView(newView)}
                scrollToTime={new Date(1970, 1, 1, 6)}
                selectable
                style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}
                view={view}
                views={['month', 'day', 'agenda']}
              />
            </Card>
          </Col>
        </Row>

        <ModalOverview handleDelete={handleDelete} toggle={toggle} />
      </PageBox>
    </ScopeStyle>
  );
}

export default Schedule;
