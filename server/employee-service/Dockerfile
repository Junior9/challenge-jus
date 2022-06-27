FROM golang:1.18 as builder

WORKDIR /src

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./

RUN go build -o justo

EXPOSE 9091

CMD [ "/justo" ]