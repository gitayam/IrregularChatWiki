---
title: "Hackergpt2"
---

# Hackergpt2

## HackerGPT 2.0 Language Model
HackerGPT 2.0 is an advanced language model that leverages the capabilities of the uncensored llama model. This model can be implemented at no cost, and is available to anyone interested in running sophisticated language models.

### Getting Started
Here’s a quick guide on setting up and running HackerGPT 2.0:


### Requirements

- **Operating System**: Ubuntu (any Linux based distro should work, other OS’ I have not tested)

- **Memory**: Minimum of 8 GB RAM for 7B models; 16 GB for 13B models; 32 GB for 33B models


### Installation Steps

1. **Clone the Repository**
```shell
git clone https://github.com/Hacker-GPT/HackerGPT-2.0.git
```


- **Install Dependencies** Install necessary dependencies as listed in the repository.

- **Set Up Supabase** Create a Supabase account and install Supabase. CD into supabase and type


supabase start

(this allows users to pull models at least llama variants onto local machine; syncs quickly after data is pulled)


- **Install Docker** Install Docker and any required dependencies

- **Install Ollama and Models**


- For macOS:

```shell
curl -fsSL https://ollama.com/install.sh | sh
```

- Pull and run the model:

```shell
ollama pull llama2-uncensored
ollama run llama2-uncensored
```


*''uncensored has regular 7b and 70b models if you want to run the 38gb uncensored version the commands would be:

ollama pull llama2-uncensored:70b

ollama run llama2-uncensored:70b


### Additional Resources

- **GitHub Repository**: [HackerGPT 2.0 GitHub](https://github.com/Hacker-GPT/HackerGPT-2.0)

- **Ollama Installation Guide**: [Ollama GitHub](https://github.com/ollama/ollama#macos)

**Note**: Ensure you have adequate RAM based on the model size you plan to run.
