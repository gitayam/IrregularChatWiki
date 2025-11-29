---
title: "Rstudio"
---

# Rstudio

## RStudio Analysis Guide

### Introduction to Social Statistics
Social statistics are pivotal for comprehending, explaining, and predicting social phenomena. Here’s a deeper dive into some definitions and fundamental concepts, with practical examples highlighting their importance. RStudio is a powerful tool for data analysis, offering numerous functions for statistical analysis and data visualization. Here’s an introduction to some basic yet essential R commands, explanations, and examples for calculating mean, standard deviation, and variance and creating basic charts or graphs.

It is important to know how to analyze data based on your research questions and hypothesis. For that reason, review this guide during the planning phase of your research and then return to it during the analysis phase.

### Terms
Mean (Average) The mean is the sum of all values divided by the number of values. It’s commonly used as a general indicator of the data’s central tendency. **Example**: The mean income in a neighborhood can provide an idea of the economic status of its residents.

Median The median is the middle value of a dataset when ordered. It’s particularly useful when the data has outliers that skew the mean. **Example**: Median housing prices are often reported as they give a better sense of the market’s central tendency without distortion from extremely high or low values.

Mode The mode is the most frequently occurring value in a dataset and can highlight the most common characteristic within a sample. **Example**: In fashion retail, the mode can indicate the most common dress size sold, informing stock decisions.

Variance Variance quantifies the spread of data points around the mean, which is crucial for assessing data distribution. **Example**: Variance in test scores across schools can indicate educational disparities.

Standard Deviation Standard deviation measures the variation from the mean, providing a sense of data dispersion. **Example**: The standard deviation of investment returns can help investors understand potential risk.

Correlation Correlation assesses the relationship between two variables, ranging from -1 to 1. High absolute values imply strong relationships. **Example**: A high correlation between education and income may suggest that higher education levels can lead to higher earnings.

Dependent and Independent Variables In a study, the researcher is interested in explaining or predicting the dependent variable, while the independent variable is believed to influence the dependent variable. **Example**: In health research, patient recovery time (dependent variable) may be influenced by treatment type (independent variable).

R and R-Squared ‘R’ is the correlation coefficient, while ‘R-squared’ measures the proportion of variation in the dependent variable that can be explained by the independent variable(s) in a regression model. **Example**: An R-squared value in a marketing campaign effectiveness study can show how well changes in ad spending predict sales variations.

P-value The p-value assesses the strength of evidence against a null hypothesis, with low values indicating statistical significance. **Example**: A low p-value in drug efficacy studies could indicate a significant effect of the drug on improving patient outcomes.

Bell Curve (Normal Distribution) The bell curve is a graphical representation of a normal distribution, depicting how data is dispersed in relation to the mean. **Example**: IQ scores typically follow a bell curve, with most people scoring around the average and fewer at the extremes.

### Statistical Tools and Concepts
Regression Model A regression model predicts the value of a dependent variable based on the values of one or more independent variables. It’s a crucial tool in data analysis for understanding and quantifying relationships. **Example**: A business analyst might use a regression model to understand how sales revenue (dependent variable) is affected by advertising spend and price adjustments (independent variables). **Data to Look For**: Sales data, advertising budget, historical pricing data, and sales channels.

ANOVA (Analysis of Variance) ANOVA is a statistical technique used to determine if there are any statistically significant differences between the means of three or more independent (unrelated) groups. **Example**: Researchers may use ANOVA to compare test scores between students from different classrooms to understand if teaching methods significantly impact performance. **Data to Look For**: Test scores from multiple classrooms, information on teaching methods, and student demographics.

Chi-Square Test The Chi-Square test determines if there is a significant association between categorical variables. It’s widely used in survey research. **Example**: A sociologist might use a Chi-Square test to see if voting preference is independent of gender. **Data to Look For**: Survey responses on voting preferences and demographic data, including gender.

Multivariate Regression Multivariate regression models the simultaneous relationships between multiple independent variables and more than one dependent variable. **Example**: Health researchers could use multivariate regression to study the impact of diet and exercise on blood pressure and cholesterol levels. **Data to Look For**: Dietary intake records, exercise logs, blood pressure measurements, and cholesterol readings.

Logistic Regression Logistic regression is used to model a binary outcome’s probability based on one or more predictor variables. **Example**: In credit scoring, logistic regression could help predict whether someone will default on a loan based on their financial history. **Data to Look For**: Credit history, loan repayment records, demographic and financial background information.

Time Series Analysis Time series analysis involves data analysis methods to extract meaningful statistics and trends over time. **Example**: Economists might use time series analysis to forecast future economic activity based on past trends. **Data to Look For**: Historical economic indicators, stock market data, inflation rates, and unemployment figures.

Survival Analysis Survival analysis analyzes the expected duration until one or more events occur, such as death, pregnancy, job change, etc. **Example**: Medical researchers use survival analysis to estimate the time until a patient may experience remission. **Data to Look For**: Patient follow-up data, time-to-event data, treatment information, and covariates that may influence survival.

### Types of Data and Format Headers
Data comes in various forms, and understanding how to format it correctly is crucial for analysis. Here are examples of dataset structures for different types of analyses involving locations, populations, and events. These examples include formatting for datasets that require handling dependent, independent, and multivariable datasets.

Consider the [research datasets](/research/research-datasets) section or the community datasets section

### Nominal Data (Categorical without Order)

Example dataset for locations (City, Country, Region):

| City | Country | Region |
|------|---------|--------|
| New York | United States | North America |
| Tokyo | Japan | Asia |
| Paris | France | Europe |

### Ordinal Data (Categorical with Order)

Example dataset for survey responses (Satisfaction Level). Useful for understanding the order of responses but not the magnitude of differences between them:

| RespondentID | SatisfactionLevel |
|--------------|-------------------|
| 1 | Satisfied |
| 2 | Neutral |
| 3 | Dissatisfied |

To understand the magnitude of differences between responses, you’d need to use interval or ratio data. Ordinal Data can be converted to interval or ratio data by assigning numerical values to the categories (e.g., 1 for Dissatisfied, 2 for Neutral, 3 for Satisfied).

### Interval and Ratio Data (Survey Responses: Satisfaction Level)
Useful for understanding the magnitude of differences between responses, the mean and standard deviation can be calculated for interval and ratio data.

| RespondentID | SatisfactionLevel |
|--------------|-------------------|
| 1 | 7 |
| 2 | 5 |
| 3 | 3 |

### Interval and Ratio Data (Numeric Data)

Interval data example for temperature readings in Celsius (without a true zero point). Useful for understanding temperature changes over time:

| City | MorningTemp | NoonTemp | EveningTemp |
|------|-------------|----------|-------------|
| New York | 15 | 22 | 18 |
| Tokyo | 20 | 28 | 25 |
| Paris | 12 | 18 | 14 |

Ratio data example for population size (has a true zero point). Useful for understanding the population changes over time:

| City | Population2010 | Population2020 |
|------|----------------|----------------|
| New York | 8175133 | 8336817 |
| Tokyo | 13074000 | 13929286 |
| Paris | 2243833 | 2148271 |

### Multivariable Datasets

Example with two or more tables required for dependent, independent variables:

**Table 1: Economic Data by Country**

| Country | GDP2010 (billions) | GDP2020 (billions) |
|---------|-------------------|-------------------|
| United States | 14964.4 | 21427.7 |
| Japan | 5700.1 | 5065.2 |
| France | 2649.0 | 2715.5 |

**Table 2: Education Data by Country**

| Country | AvgYearsOfSchooling2010 | AvgYearsOfSchooling2020 |
|---------|------------------------|------------------------|
| United States | 12 | 13 |
| Japan | 11 | 12 |
| France | 11 | 12 |

Note: In R, you’d typically handle these datasets as separate data frames or Tibbles and might use join operations to combine them based on common keys (e.g., Country) for analysis.

### Significance of Messaging Campaign or Operation on Behavior
Understanding the impact of messaging campaigns or operations on behavior is crucial in various fields, such as marketing, public health, and social policy. Data analysis plays a pivotal role in assessing these impacts by quantifying changes in behavior and providing insights into the effectiveness of these campaigns.

#### Key Variables to Consider
  - **'Pre- and Post-Campaign Survey Results*'*: Collecting data on individuals’ attitudes, knowledge, or behaviors before and after exposure to a campaign allows for direct assessment of the campaign’s impact.

  - `*`*Sales Data***: Sales data can be used to measure the impact of marketing campaigns on consumer behavior.

  - `*`*Event Attendance***: Data on event attendance can be used to measure the impact of public health or social policy campaigns on participation in related activities.

  - `*`*Economic Indicators/Purchasing Data***: Marketing campaigns can use economic indicators and purchasing data to measure their impact on consumer behavior.
  - `*`*Engagement Metrics***: Data on online campaigns might include website visits, time spent on the site, click-through rates, social media engagement (likes, shares), and more.

#### Example of Behavior Change That Can and Cannot Be Assessed
✅ Can Be Assessed: An increase/decrease in recycling rates following an environmental awareness campaign can be measured through surveys or municipal waste data.

✅ Can Be Assessed: Sales data can measure an increase or decrease in product sales following a marketing campaign.

✅ Can Be Assessed: An increase/decrease in attendance at a public health event following a public health campaign can be measured through event attendance data.

✅ Can Be Assessed: Web analytics can measure an increase or decrease in website visits following a digital marketing campaign.

✅ Can Be Assessed: Social media analytics can measure an increase or decrease in engagement following a social media campaign.

❌ Cannot Be Assessed Easily: Changes in attitudes or knowledge following a public awareness campaign may require pre- and post-campaign surveys to assess the campaign’s impact.

❌ Cannot Be Assessed Easily: Changes in deeply held beliefs or attitudes, such as political views, may not be immediately observable or directly translate into measurable behaviors.

❌ Cannot Be Assessed Easily: Changes in long-term health outcomes following a public health campaign may require long-term follow-up and control groups to assess the campaign’s impact.

❌ Cannot Be Assessed Easily: Changes in social norms or cultural attitudes may be difficult to measure directly and require more qualitative or indirect measures.

#### Common Errors and Pitfalls When Starting Research
  - **'Selection Bias*'*: Not adequately representing the target population in pre- and post-campaign surveys can lead to skewed results.

**`*`*Confirmation Bias***: Interpreting data to confirm preconceived notions about the campaign’s effectiveness without objectively considering all evidence.

  - `*`*Overlooking External Factors***: Failing to account for external events or trends that may influence behavior independently of the campaign (e.g., a new law or cultural shift).

**`*`*Insufficient Pre-Campaign Data***: Starting data collection without establishing a baseline for comparison can make it challenging to attribute changes in behavior directly to the campaign.

**`*`*Assuming Immediate Impact***: Some campaigns may delay behavior, leading to premature conclusions about their ineffectiveness if immediate post-campaign data is the sole focus.

By carefully planning research and being mindful of these considerations and potential pitfalls, analysts can more accurately assess the impact of messaging campaigns on behavior.

### Installation and Configuration of R and RStudio
Walkthrough of the steps to install R and RStudio, and how to configure the environment for optimal performance.

Download on non-government systems [here](https://posit.co/download/rstudio-desktop/)

### Web: RStudio Server

See the IrregularChat RStudio Server: [IrregularChat RStudio Server](https://rstudio.researchtools.net)

Contact an admin to create an account.

### MacOS

```
brew install r
brew cask install rstudio

```

### Linux
```
sudo apt-get install r-base # install R from the Ubuntu repositories
sudo apt-get install gdebi-core # install gdebi-core, a tool to install .deb packages
cd /tmp # change to the /tmp directory to download the RStudio .deb package
wget https://download1.rstudio.org/electron/jammy/amd64/rstudio-2023.12.1-402-amd64.deb # download the RStudio .deb package
sudo apt install ./rstudio-2023.12.1-402-amd64.deb # install the RStudio .deb package using apt
cd - # change back to the previous directory

```

### Packages to Install for Processing and Analysis
List of essential R packages such as `tidyverse`, `caret`, `tm`, `foreign`, and `haven` that are widely used in data analysis and how to install them.
  - tidyverse is a collection of R packages designed for data science and includes ggplot2, dplyr, tidyr, readr, purrr, tibble, stringr, forcats, and other packages.
  - caret is a set of functions that attempt to streamline the process for creating predictive models.
  - tm is a text mining package that provides framework for text mining applications within R.
  - haven is used to import and export data from SAS, SPSS, and Stata.

#### List of essential packages for data analysis
```

packages <- c("tidyverse", "ggplot2", "caret", "tm", "foreign", "haven") # List of essential packages for data analysis add more if needed

```

#### Loop to install and load packages
```

for (pkg in packages) {
  if (!require(pkg, character.only = TRUE)) {
    install.packages(pkg)
    library(pkg, character.only = TRUE)
  }
}

```

#### Verify packages are loaded
```

loaded_packages <- sapply(packages, require, character.only = TRUE)
print(loaded_packages)

```

### Top Basic Commands in R
R is a powerful tool for data analysis, offering numerous functions for statistical analysis and data visualization. Here’s an introduction to some basic yet essential R commands, along with explanations and examples for calculating mean, standard deviation, and variance and creating basic charts or graphs.

```

1. Installing and loading packages
install.packages("ggplot2") # Install a package, ggplot2 for example
library(ggplot2) # Load the ggplot2 package for data visualization

1. Reading data
data <- read.csv("data.csv") # Load data from a CSV file into a data frame

1. Viewing data
View(data) # Open a spreadsheet-like view of the data in RStudio
head(data) # View the first few rows of the data frame

1. Summarizing data
summary(data) # Get a statistical summary of the data (min, 1st Qu., median, mean, 3rd Qu., max)
str(data) # Display the structure of the data frame (column names, data types, etc.)

1. Calculating basic statistics
mean_data <- mean(data$variable, na.rm = TRUE) # Calculate mean of a variable, excluding NA values
sd_data <- sd(data$variable, na.rm = TRUE) # Calculate standard deviation of a variable, excluding NA values
var_data <- var(data$variable, na.rm = TRUE) # Calculate variance of a variable, excluding NA values

1. Comparing two variables - Scatter plot
ggplot(data, aes(x = variable1, y = variable2)) +
  geom_point() + # Create a scatter plot
  labs(title = "Scatter Plot of Variable1 vs. Variable2", x = "Variable 1", y = "Variable 2")

1. Comparing means - Boxplot
ggplot(data, aes(x = factor_variable, y = numeric_variable)) +
  geom_boxplot() + # Create a boxplot
  labs(title = "Boxplot of Numeric Variable by Factor", x = "Factor Variable", y = "Numeric Variable")

```

### Basic Data Cleaning Commands
Data cleaning is an essential part of any data analysis process. This section includes commands for handling missing values, outliers, and data transformation.

```

1. Commented examples of basic data cleaning commands
na.omit(data) # Removes all rows with NA values
data[> x](data$column) # Identifies values greater than x in a column
log(data$column) # Applies a logarithmic transformation to a column

1. Filtering data
library(dplyr)
filtered_data <- filter(data, column > x) # Use dplyr to filter rows where 'column' values are greater than x

1. Selecting specific columns
selected_data <- select(data, column1, column2) # Use dplyr to select only 'column1' and 'column2'

1. Removing duplicate rows
data <- distinct(data)

1. Resetting row numbers after filtering or subsetting
data <- data %>% mutate(row_number = row_number()) # Adds a new column 'row_number' as a unique identifier

1. Merging datasets
merged_data <- merge(data1, data2, by = "common_column") # Merge two datasets by a common column

```

### Expanded Examples for Analyzing Message Campaigns and Behavioral Changes in R
When evaluating the effectiveness of message campaigns and measuring changes in behavior, it’s crucial to have a clear analysis strategy. This section expands on basic commands and introduces specific examples relevant to analyzing event data and behavioral changes resulting from messaging campaigns.

Assuming ‘data’ is a data frame containing your campaign data

#### Preparing Data - Filtering for relevant periods or events
```

post_campaign_data <- data[> as.Date("2023-01-01") & data$campaign == "Yes", ](data$date)

```

#### Calculating Mean Engagement Pre and Post-Campaign
```

pre_campaign_mean <- mean(data[< as.Date("2023-01-01"),](data$date)$engagement, na.rm = TRUE)
post_campaign_mean <- mean(post_campaign_data$engagement, na.rm = TRUE)

```

#### Comparing the Means - Useful for understanding changes in engagement
```

print(paste("Pre-campaign mean engagement:", pre_campaign_mean))
print(paste("Post-campaign mean engagement:", post_campaign_mean))

```

#### T-Test - To statistically test the difference in means pre and post-campaign
```

t_test_result <- t.test(data[< as.Date("2023-01-01"),](data$date)$engagement, post_campaign_data$engagement, alternative = "two.sided", na.action = na.exclude)

```

#### Printing the t-test results
```

print(t_test_result)

```

#### Visualizing Engagement Over Time
```

ggplot(data, aes(x = date, y = engagement, color = campaign)) +
  geom_line() +
  geom_point() +
  labs(title = "Engagement Over Time", x = "Date", y = "Engagement") +
  scale_color_manual(values = c("No" = "blue", "Yes" = "red"), name = "Campaign")

```

#### Visualizing Distribution of Engagement - Pre vs. Post Campaign
```

ggplot(data, aes(x = factor(ifelse(date < as.Date("2023-01-01"), "Pre", "Post")), y = engagement, fill = campaign)) +
  geom_boxplot() +
  labs(title = "Engagement Distribution Pre vs. Post Campaign", x = "Campaign Period", y = "Engagement") +
  scale_fill_manual(values = c("No" = "blue", "Yes" = "red"), name = "Campaign Active")

```

#### Correlation between Engagement and Another Variable (e.g., sentiment)
```

correlation_result <- cor(data$engagement, data$sentiment, use = "complete.obs")
print(paste("Correlation between engagement and sentiment:", correlation_result))

```

### References


