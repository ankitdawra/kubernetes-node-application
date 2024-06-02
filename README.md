# kubernetes-node-application

<h4>Docker image URL:</h4>

https://hub.docker.com/layers/ankitdawra/nodejs-image/latest2/images/sha256-1c9b51b7784e0f0a7fc8a4e203252cb1a9380950f5b0ad35218af7eee41fdc68

<br/>

<h2>Setup guidelines:</h2>

<h4>Step 1: Start all the containers, services, configMaps, secrets, hpa with the below command</h4>

    kubectl apply -f __db_volume.yaml && kubectl apply -f __configMaps.yaml && kubectl apply -f __secrets.yaml && kubectl apply -f __db_deployment.yaml && kubectl apply -f __deployment.yaml

Note: (In case of any issues, we can delete all containers, services, configMaps etc.. by running below command and start afresh from step 1)

    kubectl delete -f __deployment.yaml && kubectl delete -f __db_deployment.yaml && kubectl delete -f __secrets.yaml&& kubectl delete -f __configMaps.yaml && kubectl delete -f __db_volume.yaml

<h4>Step 2: Database Import</h4>

    docker cp db.sql [mysql_container_id]:/db.sql (Copy the database file to db container)
    docker exec -it [mysql_container_id] /bin/bash (exec into db container)
    mysql -u root -p (login into mysql)
    ENTER PASSWORD as "password"
    source db.sql (Run db.sql file to import database)

    Note: We can find mysql_container_id from "docker ps" command

<h2>Run the application</h2>

Run the application on http://localhost:5000 if you are running on local or http://[IP_ADDR]:5000 where IP_ADDR is IP address where your node-js service is exposed.

<h4>If everything works well, you will see something like this:</h4>
<img width="874" alt="image" src="https://github.com/ankitdawra/kubernetes-node-app/assets/20342761/dd541e43-249d-4809-b808-6169ebe33f9b">

<h2>To Run HPA Demo follow the steps below:</h2>

    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    kubectl edit deploy -n kube-system metrics-server (That will open a text editor with the deployment yaml-file)
    Add "- --kubelet-insecure-tls" spec.template.spec.containers.args
    kubectl apply -f __hpa.yaml
    Visit http://localhost:5000/upscale/30 if you are running on local or http://[IP_ADDR]:5000/upscale/30 to increase the load on pods, it will upscale the number of pods to 5 as per the current configuration. And, it will downscale to 1 depending upon the load.

<h4>References:</h4>
https://github.com/kubernetes-sigs/metrics-server/tree/master?tab=readme-ov-file#installation
<br/><br/>
<img width="500" alt="image" src="https://github.com/ankitdawra/kubernetes-node-application/assets/20342761/940477ff-7899-4979-a784-a8bdb9b6bd1b">
<br/>
<br/>

<h2>In case of errors, you might see below screens:</h2>
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
