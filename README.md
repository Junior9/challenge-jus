# Getting Started
#### Front-End - Angular JS - http://localhost:4200/
#### Back-End 
1. Employee Service  - Go - localhost:9091
2. Performance Service - Java - localhost:9092
3. Assignments Service - NodeJs - localhost:9093

### Prerequisites

1. "mongodb installed in your compute"
1. "go installed in your compute"
1. "maven installed in your compute"
1. "node installed in your compute"
1. "angular cli installed in your compute"

* Start Employee Service  - Go
  ```sh
    cd server/employee-service
    cd src
    go run .
    ```
  
* Start Performance Service  - Java
   ```sh
    cd server/perfomance-service
    npm install
    npm run dev
    ```
    
* Start Assignment Service  - NodeJs
   ```sh
    cd server/assignments-service
    mvn clean install
    mvn compile quarkus:dev
    ```
* Start Front-End - Angular
   ```sh
    cd web
    npm install
    ng server
    ```
    
# Getting Started - Docker and Docker-Compose

### Prerequisites

1. Docker installed in your compute
2. Docker-compose installed in your compute

* Start Front-End - AngularJs - Docker
   ```sh
    cd web
    docker build -t justo-web .
    docker run -d -p 4200:80 justo-web
    ```
    
* Start Assignment Service  - NodeJs - Docker
   ```sh
    cd web
    docker build -t justo-web .
    docker run -d -p 4200:80 justo-web
    ```