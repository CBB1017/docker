
#Dckerfile
FROM nginx:latest

COPY ./config/default.conf /etc/nginx/site-enabled/default.conf
RUN apt update
RUN apt install ssh -y
RUN apt install vim -y
RUN adduser jenkins
WORKDIR /home/jenkins
RUN mkdir .ssh
RUN chmod 700 .ssh

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
