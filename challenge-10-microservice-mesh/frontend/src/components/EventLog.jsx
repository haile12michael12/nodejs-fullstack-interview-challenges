import React from 'react';

const EventLog = ({ events }) => {
  if (events.length === 0) {
    return <p>No events yet.</p>;
  }

  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort((a, b) => b.id - a.id);

  return (
    <div className="event-log">
      {sortedEvents.map(event => (
        <div key={event.id} className={`event-item ${event.type}`}>
          <div className="timestamp">
            {new Date(event.timestamp).toLocaleString()}
          </div>
          <div className="message">
            {event.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventLog;