import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";


export const Clients = () => {

  const [clients, setClients] = useState([]);

  useEffect(() => {
    ClientService.getClients().then((data) => {
      setClients(data);
    });
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <pre>
        {JSON.stringify(clients, null, 2)}
      </pre>
    </div>
  );
}
