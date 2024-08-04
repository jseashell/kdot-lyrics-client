.PHONY: build clean gosumgen

build: gosumgen
	export GO111MODULE=on
	env GOARCH=amd64 GOOS=linux go build -ldflags="-s -w" -o bootstrap main.go

clean:
	rm -rf ./bootstrap ./vendor go.sum
	
gosumgen: clean
	go mod tidy

deploy: clean build
	sls deploy --verbose
