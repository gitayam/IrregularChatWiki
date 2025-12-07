# OpenHands

OpenHands is an open source agentic coding harness. It works similar to cursor or claude code through a web instance. It is deployed as a docker compose and can be connected to many LLMs. This guide aims to provide a fully local or at least privately hosted coding environment, so we will also be deploying Devstral-Small using vllm.

**Requirements**:
- Linux server with docker and docker-compose installed
- Linux server with an nvidia GPU (minimum 48GB vram) 2x 3090s works great

## Devstral

First we will set up our model. Devstral was specifically trained against the OpenHands harness which means it will perform better using openhands than other agentic harnesses. however it does still perform fairly well with other tools like cline.bot for vscode.

Create a folder for hosting your vllm compose files, you may wish to have more than one model if you have extra VRAM laying around. we will assume this folder is /home/user/vllm/. you can replace user with your username at all locations you see this path.

ensure that you have working nvidia drivers for your operating system. you can verify your card/s are recognized by running `nvidia-smi`

1. create a huggingface api token by registering and going to your settings to create a token. you will need this to download models. From here out we will use <huggingface_token> to reference that token in config files.
2. Create a new file at /home/user/vllm/docker-compose.yml and insert the following content. Device_ids references which GPUs to pass through. this assumes 2 GPUs exist. if you have one larger GPU you may only pass through 0, if you have a large GPU server you can pass through only the ID you wish to use for this. you will need at least 40GB VRAM for this model to load. : `vi ~/vllm/docker-compose.yml`

```yaml
services:
  vllm-devstral:
    container_name: vllm-devstral
    image: vllm/vllm-openai:v0.10.1.1
    restart: unless-stopped
    volumes:
      - /home/user/vllm/models/:/root/.cache/huggingface
    environment:
      - HUGGING_FACE_HUB_TOKEN=<your huggingface token>
    ports:
      - "8000:8000"
    ipc: host
    command: ["--model", "unsloth/Devstral-Small-2507-bnb-4bit", "--served-model-name", "devstral", "--quantization", "bitsandbytes", "--load_format", "bitsandbytes", "--tool-call-parser", "mistral", "--enable-auto-tool-choice", "--max-model-len", "64000", "--pipeline-parallel-size", "2"]
    runtime: nvidia
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              device_ids: ['0', '1']
              capabilities:
                - gpu
```

3. start this docker service using `cd /home/user/vllm && docker-compose up -d`
4. you can monitor the logs for this using `docker logs -f vllm-devstral` and ctrl+c when you see that the api service has started.

## OpenHands

1. create another folder for your openhands files. this can be /home/user/openhands/ `mkdir ~/openhands`
2. Create a new docker compose for OpenHands. `vi /home/user/openhands/docker-compose.yml`

```yaml
services:
  openhands-app:
    image: docker.openhands.dev/openhands/openhands:0.62
    restart: unless-stopped
    container_name: openhands-app
    environment:
      - SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.openhands.dev/openhands/runtime:0.62-nikolaik
      - LLM_MAX_INPUT_TOKENS=32000
      - LLM_TEMPURATURE=0.15
      - LOG_ALL_EVENTS=true
    ports:
      - "3000:3000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ~/.openhands:/.openhands
    extra_hosts:
      - "host.docker.internal:host-gateway"
    pull_policy: always
```
3. start this service with `cd /home/user/openhands && docker-compose up -d`
4. wait a few minutes for the service to start and then you should be able to access the web interface at localhost:3000 in your browser. or remote IP address if you've installed it on a remote server, I use tailscale to access this from my laptop while I'm away.
5. once the webpage is open you will need to configure openhands to use your custom model. open `settings -> LLM` and input the following information in Custom Model we set openai/<modelname> to tell openhands that this is served over an openai compatible api.
    - Custom Model: `openai/devstral`
    - Base URL: http://<your IP address>:8000/v1
    - API Key: <blank> or anything vllm doesn't parse this by default
    - Enable memory condensation: True # This should be set because we want to keep history short.
6. Connect to your git host at `settings->integrations` this will allow you to work directly on your repositories. This works well with gitlab, I haven't tested it with other git forges.
7. set your git settings at `settings->Applications` this will be where you set what git username and email to push as.
