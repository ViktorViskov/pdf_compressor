# maintainer info
FROM alpine:latest
LABEL maintainer="carrergt@gmail.com"

# config container
WORKDIR /app
COPY ./ ./
RUN apk update
RUN apk add nodejs npm ghostscript
RUN npm install
RUN cp ./auto_delete_files.sh /usr/bin

# config project
CMD ["sh","./prod_start.sh"]
EXPOSE 3000
