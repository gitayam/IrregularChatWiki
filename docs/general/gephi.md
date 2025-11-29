---
title: "Gephi"
---

# Gephi

## About Gephi
Gephi is an open-source network visualization software that is a powerful tool for researchers, data scientists, marketers, and social scientists. It is designed to handle large datasets and create various network visualizations to uncover complex systems’ underlying patterns, structures, and dynamics. Gephi is widely used for social network analysis, link analysis, and biological network analysis, among other applications.


### What Can Gephi Be Used For?

- **Social Network Analysis**: Understanding social structures through visualizing networks of individuals or groups and their interactions.

- **Link Analysis**: Identifying relationships and structures in data, including detecting communities, influencers, and the flow of information.

- **Biological Network Analysis**: Mapping the interactions between biological entities such as genes, proteins, or species to uncover biological processes and pathways.

- **Marketing and Behavior Change**: Analyzing customer networks to identify key influencers and target marketing efforts more effectively. Gephi can reveal how information spreads through networks, helping to craft strategies for behavior change campaigns or viral marketing.


### Anecdotes

- A digital marketing firm used Gephi to analyze the Twitter network of a major brand’s followers, identifying key influencers who were not previously recognized through traditional metrics. Engaging with these influencers significantly increased campaign reach and engagement.

- In a behavior change campaign aimed at promoting healthy habits, public health researchers used Gephi to map the social networks of community members. The analysis revealed unexpected pathways for information dissemination, allowing for a more targeted intervention strategy.


### List of Terms

- **Nodes**: The entities in the network (e.g., individuals, organizations, genes) represented as points.

- **Edges**: The connections between nodes, representing relationships or interactions.

- **Centrality Measures**: Metrics that identify the most important nodes within a network (e.g., degree centrality, betweenness centrality).

- **Community Detection**: The process of identifying clusters or groups of nodes that are more densely connected than the rest of the network.

- **Modularity**: A measure that quantifies the strength of the division of a network into modules (communities).

- **Layout Algorithms**: Techniques used to position nodes in the visualization space, emphasizing aspects of the network structure (e.g., Force Atlas 2, Fruchterman-Reingold).

- **Force Atlas 2**: A force-directed layout that simulates a physical system to spatially separate all nodes equally, making clusters and dense regions more visible. It is best used for large networks where the general structure needs to be identified.

- **Fruchterman-Reingold**: A force-directed algorithm that aims to minimize the overlap between nodes and distribute them evenly across the network. Ideal for small to medium-sized networks for a balanced visual overview.

- **Yifan Hu**: Combines aspects of force-directed and multiscale algorithms to efficiently layout large networks.

- **Circular Layout**: Positions nodes in a circle, emphasizing the network’s connectivity.

- **Radial Axis**: Arranges nodes around a central node, emphasizing hierarchy or centrality.

- **Random Layout**: Places nodes randomly, serving as a baseline for applying other algorithms.

### Installing Gephi

### NIPR Install

- NOTE: Ask your S6 to install Gephi. NIPR and SIPR access are necessary.


### Commercial System Install


-

1. [Download Gephi](https://gephi.org/users/download/)

### Gephi Cookbook and Workflows

### Basic Analysis Workflow

1. **Importing Data**: Start by importing your dataset into Gephi. Use the `File &gt; Open` option for GEPHI files or `File &gt; Import Spreadsheet` for GEXF, GDF, DOT, or GML files.

1. **Exploring the Graph**: Use the Overview tab to explore your graph’s basic properties. Apply layouts like Force Atlas 2 to uncover the structure of your network.

1. **Calculating Metrics**: Analyze your network using Gephi’s built-in metrics under the Statistics window, such as degree distribution and modularity.

1. **Visualization**: Adjust node sizes and colors based on metrics. Use the `Appearance` tab for these visual mappings.

1. **Interpretation and Reporting**: Analyze the results to conclude your network, identifying clusters or key influencers.


### Advanced Techniques

- **Dynamic Networks**: For networks that change over time, use GEXF to include time-series data. Gephi supports dynamic visualizations showing network evolution.

### Basics

- Gephi Quick Start Guide (here)[* Learn how to use Gephi [https://gephi.org/users/ here](https://gephi.org/users/quick-start/])

### Datasets

- Gephi Basic Datasets [repo](https://github.com/gephi/gephi/wiki/Datasets)

- Chinese Companies [repo](https://github.com/LOyster1/AutoGephiPipeV3/blob/master/Company-to-Company4.gdf)


### Query for Datasets
Basic Advanced Google Query

```
&quot;KEYWORD1&quot; OR &quot;KEYWORD2&quot; filetype:GEXF OR filetype:GDF OR filetype:DOT OR filetype:GML OR filetype:GEPHI
```

### Make Datasets
Creating your datasets for analysis with Gephi involves a process of data collection, cleaning, and formatting. Here’s a general guide:

1. **Define Your Network**: Decide what the nodes (entities) and edges (relationships) represent.

1. **Collect Data**: Gather data relevant to your network.

1. **Clean Data**: Ensure consistency in your data by removing duplicates and correcting errors.

1. **Format for Gephi**: Convert your data into formats compatible with Gephi (GEXF, GDF, DOT, GML, GEPHI).

1. **Create Nodes and Edges Files**: Prepare CSV files for nodes and edges.

1. **Import into Gephi**: Import your files via the Data Laboratory tab, then explore your network using Gephi's tools.
