# kubernetes-node-application

Docker image URL:

https://hub.docker.com/layers/ankitdawra/nodejs-image/latest2/images/sha256-1c9b51b7784e0f0a7fc8a4e203252cb1a9380950f5b0ad35218af7eee41fdc68

<hr/>

<h2>Setup guidelines:</h2>

<h4>Step 1: Start all the containers, services, configMaps, secrets, hpa with the below command</h4>

    kubectl apply -f __db_volume.yaml && kubectl apply -f __configMaps.yaml && kubectl apply -f __secrets.yaml && kubectl apply -f __db_deployment.yaml && kubectl apply -f __deployment.yaml && kubectl apply -f __hpa.yaml

Note: (In case of any issues, we can delete all containers, services, configMaps etc.. by runnine below command and start afresh from step 1)

    kubectl delete -f __deployment.yaml && kubectl delete -f __db_deployment.yaml && kubectl delete -f __secrets.yaml&& kubectl delete -f __configMaps.yaml && kubectl delete -f __db_volume.yaml && kubectl delete -f __hpa.yaml

<h4>Step 2: Database Import</h4>

    docker cp db.sql [mysql_container_id]:/db.sql (Copy the database file to db container)
    docker exec -it [mysql_container_id] /bin/bash (exec into db container)
    mysql -u root -p (login into mysql)
    ENTER PASSWORD as "password"
    source db.sql (Run db.sql file to import database)

    Note: We can find mysql_container_id from "docker ps" command

<h4>Step 3: Run the application</h4>

Run the application on http://localhost:5000 if you are running on local or http://[IP_ADDR]:5000 where IP_ADDR is IP address where your node-js service is exposed.

If everything works well, you will see something like this:
<img width="874" alt="image" src="https://github.com/ankitdawra/kubernetes-node-app/assets/20342761/dd541e43-249d-4809-b808-6169ebe33f9b">

<hr/>

In case of errors, you might see these screens:

<table>
    <tr><td>When Database server not configured properly</td></tr>
   <tr>
       <td> <img width="500" alt="image" src="https://github.com/ankitdawra/kubernetes-node-app/assets/20342761/e6916ce8-fb66-43eb-8cea-9c0176bf3387"></td>
   </tr>
</table>

<table>
    <tr><td>When Database not setup properly</td></tr>
   <tr>
       <td> <img width="500" alt="image" src="https://github.com/ankitdawra/kubernetes-node-app/assets/20342761/ccf6cdd1-14b6-4e59-a923-03c022e9b1b1"> </td>
   </tr>
</table>

<table>
    <tr><td>When no user record exists</td></tr>
   <tr>
       <td> <img width="500" alt="image" src="https://github.com/ankitdawra/kubernetes-node-app/assets/20342761/c9c1df57-2730-4d30-955f-ca6e5fac75c4"></td>
   </tr>
</table>
