---
title: "Gephi"
tags: ["gephi", "network-analysis", "visualization", "osint", "research", "social-network-analysis"]
---

# Gephi

::: tip Related Resources
[Research Tools](/research/research-tools) | [Research Datasets](/research/research-datasets) | [Identify Influencers](/general/identify-influencers-using-the-taaw)
:::

## About Gephi

Gephi is an open-source network visualization software that is a powerful tool for researchers, data scientists, marketers, and social scientists. It is designed to handle large datasets and create various network visualizations to uncover complex systems' underlying patterns, structures, and dynamics. Gephi is widely used for social network analysis, link analysis, and biological network analysis, among other applications.

***

## What Can Gephi Be Used For?

- **Social Network Analysis**: Understanding social structures through visualizing networks of individuals or groups and their interactions.

- **Link Analysis**: Identifying relationships and structures in data, including detecting communities, influencers, and the flow of information.

- **Biological Network Analysis**: Mapping the interactions between biological entities such as genes, proteins, or species to uncover biological processes and pathways.

- **Marketing and Behavior Change**: Analyzing customer networks to identify key influencers and target marketing efforts more effectively. Gephi can reveal how information spreads through networks, helping to craft strategies for behavior change campaigns or viral marketing.

***

## Anecdotes

- A digital marketing firm used Gephi to analyze the Twitter network of a major brand's followers, identifying key influencers who were not previously recognized through traditional metrics. Engaging with these influencers significantly increased campaign reach and engagement.

- In a behavior change campaign aimed at promoting healthy habits, public health researchers used Gephi to map the social networks of community members. The analysis revealed unexpected pathways for information dissemination, allowing for a more targeted intervention strategy.

***

## Key Terms

| Term | Definition |
|------|------------|
| **Nodes** | The entities in the network (e.g., individuals, organizations, genes) represented as points |
| **Edges** | The connections between nodes, representing relationships or interactions |
| **Centrality Measures** | Metrics that identify the most important nodes within a network (e.g., degree centrality, betweenness centrality) |
| **Community Detection** | The process of identifying clusters or groups of nodes that are more densely connected than the rest of the network |
| **Modularity** | A measure that quantifies the strength of the division of a network into modules (communities) |

### Layout Algorithms

Layout algorithms are techniques used to position nodes in the visualization space, emphasizing aspects of the network structure.

| Algorithm | Description | Best For |
|-----------|-------------|----------|
| **Force Atlas 2** | Simulates a physical system to spatially separate all nodes equally, making clusters and dense regions more visible | Large networks where general structure needs to be identified |
| **Fruchterman-Reingold** | Minimizes overlap between nodes and distributes them evenly across the network | Small to medium-sized networks for a balanced visual overview |
| **Yifan Hu** | Combines force-directed and multiscale algorithms for efficient layout | Large networks |
| **Circular Layout** | Positions nodes in a circle | Emphasizing network connectivity |
| **Radial Axis** | Arranges nodes around a central node | Emphasizing hierarchy or centrality |
| **Random Layout** | Places nodes randomly | Baseline for applying other algorithms |

***

## Installing Gephi

### NIPR/SIPR Install

::: warning Government Systems
Ask your S6 to install Gephi. NIPR and SIPR access authorization is necessary.
:::

### Commercial/Personal Install

1. Go to [Gephi Downloads](https://gephi.org/users/download/)
2. Download the version for your operating system (Windows, macOS, Linux)
3. Run the installer and follow the prompts
4. Launch Gephi and install any recommended plugins

***

## Gephi Cookbook and Workflows

### Basic Analysis Workflow

1. **Importing Data**: Start by importing your dataset into Gephi. Use `File > Open` for GEPHI files or `File > Import Spreadsheet` for CSV, GEXF, GDF, DOT, or GML files.

2. **Exploring the Graph**: Use the Overview tab to explore your graph's basic properties. Apply layouts like Force Atlas 2 to uncover the structure of your network.

3. **Calculating Metrics**: Analyze your network using Gephi's built-in metrics under the Statistics window, such as degree distribution and modularity.

4. **Visualization**: Adjust node sizes and colors based on metrics. Use the `Appearance` tab for these visual mappings.

5. **Interpretation and Reporting**: Analyze the results to draw conclusions about your network, identifying clusters or key influencers.

### Advanced Techniques

- **Dynamic Networks**: For networks that change over time, use GEXF format to include time-series data. Gephi supports dynamic visualizations showing network evolution.

- **Filtering**: Use the Filters panel to isolate specific parts of your network based on attributes or metrics.

- **Preview and Export**: Use the Preview tab to fine-tune your visualization before exporting as PNG, SVG, or PDF.

***

## Learning Resources

- [Gephi Quick Start Guide](https://gephi.org/users/quick-start/) - Official getting started tutorial
- [Gephi User Documentation](https://gephi.org/users/) - Full user guides and tutorials
- [Gephi GitHub Wiki](https://github.com/gephi/gephi/wiki) - Community documentation

***

## Datasets

### Sample Datasets

- [Gephi Sample Datasets](https://github.com/gephi/gephi/wiki/Datasets) - Official sample datasets for practice
- [Chinese Companies Network](https://github.com/LOyster1/AutoGephiPipeV3/blob/master/Company-to-Company4.gdf) - Company relationship dataset

### Finding Datasets

Use this Google query to find network datasets:

```
"KEYWORD1" OR "KEYWORD2" filetype:GEXF OR filetype:GDF OR filetype:DOT OR filetype:GML
```

**Example:**
```
"social network" OR "twitter" filetype:GEXF OR filetype:GDF
```

***

## Creating Your Own Datasets

Creating datasets for Gephi involves data collection, cleaning, and formatting:

1. **Define Your Network**: Decide what the nodes (entities) and edges (relationships) represent.

2. **Collect Data**: Gather data relevant to your network from APIs, databases, or manual collection.

3. **Clean Data**: Ensure consistency by removing duplicates and correcting errors.

4. **Format for Gephi**: Convert your data into Gephi-compatible formats:
   - **GEXF** - XML-based, supports attributes and dynamics
   - **GDF** - Simple text format
   - **CSV** - Separate files for nodes and edges
   - **GML** - Graph Modeling Language

5. **Create Nodes and Edges Files**: For CSV import, prepare two files:

   **nodes.csv:**
   ```csv
   Id,Label,Attribute1
   1,Node A,value1
   2,Node B,value2
   ```

   **edges.csv:**
   ```csv
   Source,Target,Weight
   1,2,1.0
   2,3,0.5
   ```

6. **Import into Gephi**: Import your files via the Data Laboratory tab, then explore your network using Gephi's tools.

***

## Related Resources

- [Research Tools](/research/research-tools) - Other analysis tools
- [Research Datasets](/research/research-datasets) - Data sources
- [Identify Influencers Using the TAAW](/general/identify-influencers-using-the-taaw) - Influence analysis methodology
- [Information Warfare](/general/information-warfare) - Context for network analysis applications
