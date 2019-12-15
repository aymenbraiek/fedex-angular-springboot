# Fedex Delivery System
Full-stack Fedex application using Angular and Spring Boot.

# Stacks
- Angular, Ngrx
- Spring Boot
- Spring Restful
- Spring Security with JWT
- JPA, Hibernate
- MySQL

# Run
Run Spring Boot application server from root directory (default port 8080), but my configuration is port 8081.
```
$ ./gradlew bootRun --stacktrace
```
To build the Spring application, run:
```
$ ./gradlew build
```

To run Angular client, from root directory, go to client folder:
```
$ cd front-end/shop-app
$ ng serve -o
```
Default port for Angular is 4200.

To start MySQL server (default port 3306), run:
```
$ mysql -u root -p
```
