---
title: "Build Your Private AI Powerhouse: Ollama + Open-WebUI + n8n with Docker"
description: "A complete guide to setting up your own private AI stack using Ollama, Open-WebUI, and n8n with Docker for privacy-focused language model usage and automation."
date: '2025-05-01'
tags: [ai, self-hosting, docker, ollama, n8n, tutorials]
status: published
heroImage: "/images/tutorials/private-ai-powerhouse.png"
---

# Build Your Private AI Powerhouse: Ollama + Open-WebUI + n8n with Docker

Want to leverage the power of Large Language Models (LLMs) and workflow automation without sending your data to third-party clouds? This guide will walk you through setting up a powerful, private, and local AI stack using Docker, featuring:

* **Ollama:** Run open-source LLMs (like Llama3.1, Gemma3, Qwen 3, Deepseek R1, etc.) directly on your hardware.
* **Open-WebUI:** A user-friendly web interface to chat with your local Ollama models.
* **n8n:** A self-hosted workflow automation tool (like Zapier) to connect APIs and build intelligent automations, capable of leveraging your local Ollama instance.

All components will communicate over a dedicated Docker network for seamless integration.

**Benefits:**

* **Privacy:** Your data and prompts stay entirely on your local machine.
* **Control:** You choose the models, tools, and configurations.
* **Cost-Effective:** Utilizes open-source software and your existing hardware.
* **Customization:** Tailor models and workflows to your specific needs.

Let's dive in!

## Prerequisites

Before starting, ensure you have the following installed and configured on your server (this guide assumes a Linux host, like Ubuntu):

1.  **Docker Engine:** The core containerization platform. ([Official Docker Install Guide](https://docs.docker.com/engine/install/ubuntu/))
2.  **Docker Compose:** Useful for managing multi-container applications (often included with Docker Desktop or installed as a plugin). ([Official Docker Compose Install Guide](https://docs.docker.com/compose/install/))
3.  **(For GPU Acceleration)** **Nvidia GPU:** A CUDA-compatible Nvidia graphics card.

4.  **(For GPU Acceleration)** **Nvidia Drivers:** Appropriate drivers installed for your Linux distribution. Verify with:

```bash
nvidia-smi
```

5.  **(For GPU Acceleration)** **Nvidia Container Toolkit:** Allows Docker containers to access the host's GPU. Install it by following the official guide:

Add NVIDIA package repositories:

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
```

```bash
curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
  sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
  sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

Update package list and install:

```bash
sudo apt-get update
```

```bash
sudo apt-get install -y nvidia-container-toolkit
```

Configure Docker runtime and restart Docker:

```bash
sudo nvidia-ctk runtime configure --runtime=docker
```

```bash
sudo systemctl restart docker
```

Verify toolkit (optional but recommended):

```bash
docker run --rm --gpus all nvidia/cuda:12.0.0-base-ubuntu22.04 nvidia-smi
```

## Step 1: Create a Dedicated Docker Network

We'll create a custom bridge network so our containers can easily find and communicate with each other using their service names.

```bash
docker network create ollama-net
```

This creates a network named `ollama-net`.

## Step 2: Set Up Ollama Container

Now, let's run the Ollama server container, enabling GPU access and connecting it to our network.

```bash
docker run -d \
  --gpus all \
  --network ollama-net \
  -v ollama_data:/root/.ollama \
  -p 11434:11434 \
  --name ollama \
  --restart unless-stopped \
  ollama/ollama:latest
```

Let's break down this command:

* `-d`: Run the container in detached mode (in the background).
* `--gpus all`: **Crucial for GPU acceleration.** Makes the host Nvidia GPUs available to the container via the Nvidia Container Toolkit. Omit this if you only have CPU.
* `--network ollama-net`: Attaches the container to our custom network.
* `-v ollama_data:/root/.ollama`: Creates a named Docker volume `ollama_data` and mounts it inside the container where Ollama stores its downloaded models. This ensures your models persist even if the container is removed and recreated.
* `-p 11434:11434`: Publishes Ollama's API port (11434) to the same port on your host server, making it accessible from your local network.
* `--name ollama`: Assigns a convenient name to the container.
* `--restart unless-stopped`: Ensures the container automatically restarts if it crashes or the server reboots.
* `ollama/ollama:latest`: Specifies the official Ollama image to use.

Verify Ollama is running:

```bash
docker ps
```

You should see the `ollama` container listed as "Up".

## Step 3: Pull Initial LLM Models

With Ollama running, we can now download some versatile local models. We'll use `docker exec` to run commands *inside* the `ollama` container. Here, we'll grab relatively lightweight (<10B parameters) but powerful models.

### [Qwen3](https://ollama.com/library/qwen3)
8b parameters, ~5.2GB
```bash
docker exec -it ollama ollama pull qwen3
```

This is probably going to be the best all-around model you can use, as of the time of this writing. It's multimodal, and supports agentic use and tool-calling, supports both thinking and non-thinking modes, and has a 128k token context window.

Below are some other models I've had good overall success with in the past as well.

### [DeepSeek-R1](https://ollama.com/library/deepseek-r1)
7b parameters, ~4.7GB
```bash
docker exec -it ollama ollama pull deepseek-r1
```

### [Gemma3](https://ollama.com/library/gemma3)
4b parameters, ~3.3GB
```bash
docker exec -it ollama ollama pull gemma3
```

### [Llama3.1](https://ollama.com/library/llama3.1)
8b parameters, ~4.9GB
```bash
docker exec -it ollama ollama pull llama3.1
```

Depending on your hardware, you may be able to scale up or down on the size of the model you can use, but I've found these tend to work admirably well.

**Note:** Model availability and tags can change. Check the [Ollama Library](https://ollama.com/library) for the latest models and specific tags (like different sizes or fine-tunes). Pulling models can take some time depending on their size and your internet speed.

### Pro Tip 1: Set Up an Alias for Ollama Commands

To make working with Ollama in Docker more convenient, you can set up a bash alias in your `~/.bashrc` file (or whichever shell you're using):

```bash
echo 'alias ollama="docker exec -it ollama ollama"' >> ~/.bashrc
```

```bash
source ~/.bashrc
```

With this alias, you can run Ollama commands as if it were installed globally on your system:

So, instead of typing:
```bash
docker exec -it ollama ollama run qwen3
```

You can simply type:
```bash
ollama run qwen3
```

Any command typed after the alias functions exactly as if you had typed out the full Docker exec command.

**Note:** This would cause conflicts if you also have Ollama installed globally on your host system. In that case, consider using a slightly different alias like `docker-ollama` instead.

### Pro Tip 2: Test Model Performance with Verbose Mode

When trying out a new model, you can use Ollama's verbose mode to see detailed performance statistics, including tokens per second:

```bash
docker exec -it ollama ollama run qwen3 --verbose
```

Or if you set up the alias from Pro Tip 1:

```bash
ollama run qwen3 --verbose
```

The verbose output will show you:
- Token generation speed (tokens/sec)
- Context size
- Total tokens processed

This information is invaluable for:
- Comparing performance between different models
- Determining if your hardware can efficiently run larger models
- Troubleshooting slow response times
- Optimizing your setup for better performance

For example, you might see output like:

```
total duration:       50.742290897s
load duration:        19.662375ms
prompt eval count:    28 token(s)
prompt eval duration: 155.80633ms
prompt eval rate:     179.71 tokens/s
eval count:           1205 token(s)
eval duration:        50.565964637s
eval rate:            23.83 tokens/s
```

If you see low tokens/sec numbers (below 10), your hardware might be struggling with the model size, and you should consider using a smaller model for better responsiveness.

## Step 4: Set Up Open-WebUI Container

Open-WebUI provides a fantastic chat interface for your Ollama models. Let's run its container, connect it to Ollama, and enable GPU support (useful if the UI itself leverages any GPU features, uses CUDA images).

```bash
docker run -d \
  -p 3000:8080 \
  --gpus all \
  --network ollama-net \
  -v open-webui:/app/backend/data \
  -e OLLAMA_BASE_URL=http://ollama:11434 \
  --name open-webui \
  --restart always \
  ghcr.io/open-webui/open-webui:cuda
```

Key parts of this command:

* `-p 3000:8080`: Maps port `3000` on your host server to the default port `8080` inside the Open-WebUI container. You'll access the UI via port `3000`.
* `--gpus all`: Provides GPU access (use the `:cuda` image tag). Omit this and use the `:main` tag if you don't have/need GPU support for the WebUI itself.
* `--network ollama-net`: Connects Open-WebUI to the same network as Ollama.
* `-v open-webui:/app/backend/data`: Creates a named volume `open-webui` to store UI settings, chat history, user data, etc., persistently.
* `-e OLLAMA_BASE_URL=http://ollama:11434`: **This is how Open-WebUI finds Ollama.** We're telling it that the Ollama API is available at the hostname `ollama` (which Docker resolves to the Ollama container's IP within the `ollama-net` network) on port `11434`.
* `--name open-webui`: Names the container.
* `--restart always`: Alias for `--restart unless-stopped`.
* `ghcr.io/open-webui/open-webui:cuda`: The official Open-WebUI image suitable for CUDA/GPU systems. Use `:main` for CPU-only.

## Step 5: Set Up n8n Container

Now, let's add the n8n workflow automation engine to our network.

```bash
docker run -d \
  --name n8n \
  --network ollama-net \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e GENERIC_TIMEZONE="America/Los_Angeles" \
  -e N8N_SECURE_COOKIE=false \
  --restart unless-stopped \
  docker.n8n.io/n8nio/n8n
```

Explanation:

* `--name n8n`: Names the container.
* `--network ollama-net`: Connects n8n to the same network, allowing it to make HTTP requests directly to `http://ollama:11434`.
* `-p 5678:5678`: Exposes n8n's web UI on port `5678` of your host server.
* `-v n8n_data:/home/node/.n8n`: Creates a named volume `n8n_data` for persisting workflows, credentials, and execution data. **Crucial!**
* `-e GENERIC_TIMEZONE="America/Los_Angeles"`: Sets the timezone for accurate scheduling and logs (adjust if you're not in Pacific Time).
* `-e N8N_SECURE_COOKIE=false`: Allows logging into n8n over plain HTTP on your local network. **Remove this or set to `true` if you later configure HTTPS access.**
* `--restart unless-stopped`: Keeps n8n running.
* `docker.n8n.io/n8nio/n8n`: The official n8n image.

## Step 6: (Optional) Set Up Watchtower for Automatic Updates

To keep your containers updated automatically, you can run Watchtower. This command configures it to check daily and *only* update the containers we've just set up.

```bash
docker run -d \
  --name watchtower \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --restart unless-stopped \
  containrrr/watchtower \
  --cleanup \
  --interval 86400 \
  ollama open-webui n8n
```

Explanation:

* `-v /var/run/docker.sock:/var/run/docker.sock`: Allows Watchtower to interact with the Docker daemon.
* `--cleanup`: Removes old images after updates.
* `--interval 86400`: Checks for updates every 24 hours (86400 seconds).
* `ollama open-webui n8n`: Specifies *only* these containers should be monitored and updated by Watchtower.

## Step 7: Accessing Your Services

Everything should now be running! You can access the web interfaces from another computer on your local network:

* **Open-WebUI:** `http://<your_server_ip>:3000`
* **n8n:** `http://<your_server_ip>:5678` (Requires initial owner account setup on first visit)
* **Ollama API (Directly):** `http://<your_server_ip>:11434` (Useful for direct API calls or testing)

Replace `<your_server_ip>` with the actual local IP address of the server running Docker.

## Conclusion & Next Steps

Congratulations! You now have a powerful, private AI and automation stack running locally.

* **Explore Open-WebUI:** Chat with your different models, customize prompts, and explore its settings.
* **Build n8n Workflows:** Start automating tasks. Try using the `HTTP Request` node in n8n to call your Ollama API at `http://ollama:11434/api/chat` to add AI capabilities to your automations.
* **Add More Models:** Use `docker exec -it ollama ollama pull <model_name:tag>` to expand your collection.
* **Secure Access:** If exposing these services (especially n8n) beyond your trusted local network, implement proper security measures like HTTPS (using a reverse proxy like Nginx Proxy Manager or Traefik with Let's Encrypt) and strong authentication.
* **Backup Volumes:** Regularly back up your named Docker volumes (`ollama_data`, `open-webui`, `n8n_data`) to prevent data loss.

Enjoy experimenting with your self-hosted AI powerhouse!
