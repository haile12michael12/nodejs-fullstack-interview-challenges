import React, { useState, useEffect } from 'react';

const ServiceStatus = () => {
  const [services, setServices] = useState([
    { name: 'Gateway', url: '/health', status: 'unknown' },
    { name: 'User Service', url: 'http://localhost:3001/health', status: 'unknown' },
    { name: 'Email Service', url: 'http://localhost:3002/health', status: 'unknown' },
    { name: 'RabbitMQ', url: 'http://localhost:15672', status: 'unknown' }
  ]);

  const checkServiceStatus = async (service) => {
    try {
      // For gateway, we can use a relative URL
      const url = service.name === 'Gateway' ? service.url : service.url;
      const response = await fetch(url);
      return response.ok ? 'online' : 'offline';
    } catch (error) {
      return 'offline';
    }
  };

  const updateServiceStatuses = async () => {
    const updatedServices = await Promise.all(
      services.map(async (service) => {
        const status = await checkServiceStatus(service);
        return { ...service, status };
      })
    );
    setServices(updatedServices);
  };

  useEffect(() => {
    updateServiceStatuses();
    const interval = setInterval(updateServiceStatuses, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-status">
      {services.map((service, index) => (
        <div 
          key={index} 
          className={`service-card ${service.status}`}
        >
          <h3>{service.name}</h3>
          <p>Status: {service.status}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceStatus;