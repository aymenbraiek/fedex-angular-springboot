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
To run Angular client, from root directory:
```
$ cd front-end/shop-app
$ ng serve -o
```
Default port for Angular is 4200.


Then, run Spring Boot application server (default port 8080), but my configuration is port 8081.
```
$ ./gradlew bootRun --stacktrace
```
To build the Spring application, run:
```
$ ./gradlew build
```

To start MySQL server (default port 3306), run:
```
$ mysql -u root -p
```
