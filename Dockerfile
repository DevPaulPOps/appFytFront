FROM golang:1.18
LABEL authors="perig"
WORKDIR /app

COPY server/ /app/
RUN go mod download
RUN go build -o server server.go
EXPOSE 443
CMD ["./server"]
