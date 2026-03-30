FROM eclipse-temurin:23-jdk

EXPOSE 8080
WORKDIR /app
COPY target/wealthtracker-0.0.1-SNAPSHOT.jar app.jar
#ADD target/wealthtracker-0.0.1-SNAPSHOT.jar wealth_tracker.jar
#COPY . .
ENTRYPOINT ["java","-jar","app.jar"]