---
title: "RStudio Server Guide"
---

# RStudio Server Guide

## RStudio Server Guide
Return to [Guides](/server-guides/)
Return to [This guide is based on the [https://davetang.org/muse/2021/04/24/running-rstudio-server-with-docker/ RStudio Server Guide](/research/). It is designed to help you get started with RStudio Server, a web-based interface for R programming. RStudio Server allows you to run R and RStudio in a web browser, providing a flexible and accessible data analysis and visualization environment.

### Requirements

- Docker installed on your system.

- Basic understanding of Docker commands and R programming.

### Steps to Set Up RStudio Server with Docker

### Pull the RStudio Docker Image
```

docker pull rocker/rstudio

```

### Create a Dockerfile
Include necessary system dependencies and R packages in your Dockerfile:
```

FROM rocker/rstudio

RUN apt clean all && \
    apt update && \
    apt upgrade -y && \
    apt install -y \
        libhdf5-dev \
        libcurl4-gnutls-dev \
        libssl-dev \
        libxml2-dev \
        libpng-dev \
        libxt-dev \
        zlib1g-dev \
        libbz2-dev \
        liblzma-dev \
        libglpk40 \
        libgit2-dev \
    && apt clean all && \
    apt purge && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/''

RUN Rscript -e "install.packages(c('rmarkdown', 'tidyverse', 'workflowr', 'shiny', 'blogdown', 'bookdown', 'learnr', 'xaringan', 'rticles', 'pkgdown', 'devtools', 'usethis', 'testthat', 'roxygen', 'rhub', 'covr', 'rmarkdown', 'knitr', 'dplyr', 'readr', 'packrat', 'rsconnect'))"

WORKDIR /home/rstudio

```

### Build Your Custom Docker Image
```

docker build -t my-rstudio .

```

### Run Your Custom Container
```

docker run -d -p 8787:8787 -e PASSWORD=yourpassword my-rstudio

```

### Run Multiple Instances (Optional)
You can run multiple RStudio Server instances for different users by specifying unique ports and credentials:
```

docker run -d -p 8788:8787 -e USER=user1 -e PASSWORD=user1password my-rstudio
docker run -d -p 8789:8787 -e USER=user2 -e PASSWORD=user2password my-rstudio

```

### Combined Commands for Quick Setup
```

docker pull rocker/rstudio
touch Dockerfile
echo "FROM rocker/rstudio" >> Dockerfile
echo "RUN apt clean all && \\" >> Dockerfile
echo "    apt update && \\" >> Dockerfile
echo "    apt upgrade -y && \\" >> Dockerfile
echo "    apt install -y \\" >> Dockerfile
echo "        libhdf5-dev \\" >> Dockerfile
echo "        libcurl4-gnutls-dev \\" >> Dockerfile
echo "        libssl-dev \\" >> Dockerfile
echo "        libxml2-dev \\" >> Dockerfile
echo "        libpng-dev \\" >> Dockerfile
echo "        libxt-dev \\" >> Dockerfile
echo "        zlib1g-dev \\" >> Dockerfile
echo "        libbz2-dev \\" >> Dockerfile
echo "        liblzma-dev \\" >> Dockerfile
echo "        libglpk40 \\" >> Dockerfile
echo "        libgit2-dev \\" >> Dockerfile
echo "    && apt clean all && \\" >> Dockerfile
echo "    apt purge && \\" >> Dockerfile
echo "    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/''" >> Dockerfile
echo "RUN Rscript -e \"install.packages(c('rmarkdown', 'tidyverse', 'workflowr', 'shiny', 'blogdown', 'bookdown', 'learnr', 'xaringan', 'rticles', 'pkgdown', 'devtools', 'usethis', 'testthat', 'roxygen', 'rhub', 'covr', 'rmarkdown', 'knitr', 'dplyr', 'readr', 'packrat', 'rsconnect'))\"" >> Dockerfile
echo "WORKDIR /home/rstudio" >> Dockerfile
docker build -t my-rstudio .
docker run -d -p 8787:8787 -e PASSWORD=yourpassword my-rstudio

```

### Notes and References

- For more details, see the original source: [Dave Tang's RStudio Guide](https://davetang.org/muse/2021/04/24/running-rstudio-server-with-docker/).

- For more information on RStudio Server, visit [RStudio Server Official Site](https://www.rstudio.com/products/rstudio/rstudio-server/).
