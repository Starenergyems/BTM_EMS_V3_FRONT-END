import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { pagesPathName } from '@/router';
import { useBoolean } from '@/hooks/useBoolean';
import { PageBox } from '@/components/units';
import { Card, Col, Row, Tooltip } from 'antd';
import Typography from '@/components/units/typography';
import ScopeStyle from './indexStyle';
import { ModalOverview } from './modal/index';
import { FormOverview } from './formOverview/index';
import { ExtraFormFields, ExtraLabels } from './formOverview/indexConfig';
import { useHelpers } from './indexHelper';


moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function Schedule() {
  const routeName = pagesPathName.setting.schedule.pathName;

  const toggle = useBoolean(false);

  const [eventIndex, setEventIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [calevents, setCalEvents] = useState([]);

  const { getEventData, delEvent, handleDelete, eventColors } = useHelpers({
    calevents,
    setCalEvents,
    setEventIndex,
    eventIndex,
    toggle,
  });

  useEffect(() => {
    getEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Row gutter={20} className="calendar-wrap">
          <Col xxl={6} xl={7} xs={24}>
            <FormOverview events={calevents} getEventData={getEventData} />
          </Col>
          <Col xxl={18} xl={17} xs={24}>
            <Card>
              <Calendar
                selectable
                events={calevents.map((event) => ({
                  ...event,
                  start: new Date(event.start),
                  end: new Date(event.end),
                }))}
                defaultView="month"
                views={['month', 'day', 'agenda']}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                view={view}
                onView={(newView) => setView(newView)}
                scrollToTime={new Date(1970, 1, 1, 6)}
                defaultDate={new Date()}
                localizer={localizer}
                style={{ height: 'calc(100vh - 300px)', minHeight: '600px' }}
                onSelectEvent={(event) => delEvent(event)}
                eventPropGetter={(event) => eventColors(event)}
                components={{ event: CustomEvent }}
              />
            </Card>
          </Col>
        </Row>

        <ModalOverview toggle={toggle} handleDelete={handleDelete} />
      </PageBox>
    </ScopeStyle>
  );
}

export default Schedule;
