import { useSessionActivity, useTimezone } from '@/components/hooks';
import Icons from '@/components/icons';
import { isSameDay } from 'date-fns';
import { Fragment } from 'react';
import { Icon, Loading, StatusLight } from 'react-basics';
import styles from './SessionActivity.module.css';
import { SessionEvents } from './SessionEvents';

export function SessionActivity({
  websiteId,
  sessionId,
  startDate,
  endDate,
}: {
  websiteId: string;
  sessionId: string;
  startDate: Date;
  endDate: Date;
}) {
  const { formatTimezoneDate } = useTimezone();
  const { data, isLoading } = useSessionActivity(websiteId, sessionId, startDate, endDate);
  if (isLoading) {
    return <Loading position="page" />;
  }

  let lastDay = null;
  return (
    <div className={styles.timeline}>
      {data.map(({ id, createdAt, urlPath, eventName, visitId }) => {
        const showHeader = !lastDay || !isSameDay(new Date(lastDay), new Date(createdAt));
        lastDay = createdAt;
        return (
          <Fragment key={id}>
            {showHeader && (
              <div className={styles.header}>{formatTimezoneDate(createdAt, 'PPPP')}</div>
            )}
            <div key={id} className={styles.row}>
              <div className={styles.time}>
                <StatusLight color={`#${visitId?.substring(0, 6)}`}>
                  {formatTimezoneDate(createdAt, 'h:mm:ss aaa')}
                </StatusLight>
              </div>

              {eventName ? (
                <SessionEvents websiteId={websiteId} eventID={id} eventName={eventName} />
              ) : (
                <div className={styles.rowContent}>
                  <Icon>{<Icons.Eye />}</Icon>
                  <div>{urlPath}</div>
                </div>
              )}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
