import useEventDataID from '@/components/hooks/queries/useEventDataID';
import Icons from '@/components/icons';
import { Icon } from 'react-basics';
import styles from './SessionEvents.module.css';
export function SessionEvents({
  websiteId,
  eventID,
  eventName,
}: {
  websiteId: string;
  eventID: string;
  eventName: string;
}) {
  const { data } = useEventDataID(websiteId, eventID) as { data: any[] };

  return (
    <div className={styles.rowContent}>
      <Icon
        style={{
          marginTop: '6px',
        }}
      >
        <Icons.Bolt />
      </Icon>
      <div>
        {eventName}
        {data && data.length > 0 && (
          <div className={styles.eventContent}>
            {data.map(({ eventId, propertyName, propertyValue }) => {
              return (
                <div key={`${eventId}-${propertyName}-${propertyValue}`}>
                  <div className={styles.propertyName}>{propertyName}</div>
                  <div className={styles.propertyValue}>{propertyValue}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
