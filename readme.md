![logo](./documentation/images/logo.png)

## Table of Contents
1. [Overview](#overview)
2. [Clickable Prototyoe](#prototype)
3. [Mobile Application](#app)
3. [Summary of the Major Technology Decisions](#decisions)
4. [Technology Stack and Rationale](#technology)
5. [Promitional Video](#video)
6. [Award Recognition](#award)
7. [The Team](#team)

<a name="overview"></a>
## Overview
Yuzu is a mobile application that targets to solve the pain points when buying in bulk. While wholesale stores offer great value when bulk shopping, it also contributes to the food waste crisis by the excessive quantity of bulk items left unfinished. Yuzu allows its users (Yuzu-ers) to find shoppers in real-time, at the same location, to split items with. Shoppers purchase items at bulk prices and reduced quantities by being matched with each other depending on the shared items of interest. This solution creates a social community where sharing is not only caring, but saving money and reducing waste.

This mobile application was built as the Yuzu team's UW iSchool capstone project. The designing and prototyping phase began Winter Quarter 2017 and developing phase started in April. This is the outcome of a 6-month long project consiting of four UW iSchool senior undergraduates with a variety of skillsets.

### Problem
Wholesale stores provide quality items in affordable prices, but with items being sold in large quantities, they result in waste of goods and higher total bill, preventing people from saving money
### Research
The Yuzu team conducted user-research on 52 survey participants. 

* 90% of the survey respondents shop at wholesale stores due to lower cost per item. 
* 48%of the survey respondents do not shop at wholesale stores due to bulk quantities. 
* 40%of the survey respondents reported. disposing of goods purchased in bulk quantities

### Solution
[<img src="./documentation/images/poster_image.png">](https://github.com/lisally/yuzu/blob/master/documentation/images/poster.pdf)

<a name="prototype"></a>
## Clickable Prototype
[<img src="./documentation/images/prototype.png">](https://marvelapp.com/g8a8b56/screen/27573694)

<a name="app"></a>
## Mobile Application (Beta)

### Add
![add](./documentation/images/add.gif)

### Match
![match](./documentation/images/match.gif)

### Message
![message](./documentation/images/message.gif)

<a name="decisions"></a>
## Summary of the Major Technology Decisions
Programming Framework: React-Native

Database: Firebase

Authentication: Firebase

<a name="technology"></a>
## Technology Stack and Rationale
### React Native
We decided to build our application using React-Native, a programming framework developed by Facebook to build native mobile applications. We chose this because it allows developers to deploy on both Android and iOS once written in JavaScript. Our team focused primarily on the iOS app, but due to the nature of React-Native, we were able to consider that Android portion is also "written" as soon as the iOS portion was completed.

### Firebase
We decided to use Firebase, a mobile and web application development platform built by Google. We use Firebase for their Authentication service because we are easily and quickly able to authenticate users using email/password combos. We also used Firebase's real-time Database service to store our Costco locations, product data, user data, as well as real-time matching data. Their real-time database has a easy-to-use user interface to access and modify to data directly in the browser. It also provided massive storage size potential and real-time data management, which was crucial for our mobile application.

<a name="video"></a>
## Promotion Video
[<img src="./documentation/images/video.png">](https://www.youtube.com/watch?v=KgJaBIA6nvk)

<a name="award"></a>
## Award Recognition
### UW iSchool 2017 Commercial Potential Award
[<img src="./documentation/images/team.jpg">](https://ischool.uw.edu/news/2017/06/capstone-showcases-work-hundreds-ischool-students)

<a name="team"></a>
## The Team

### Derry Cheng
Product Manager | derryc09@uw.edu | [LinkedIn](https://www.linkedin.com/in/derrycheng/)

### Sally Li
Mobile Developer | lisally@uw.edu | [LinkedIn](https://www.linkedin.com/in/lisally95/)

### Jessica (Hyerin) Ro 
UI Designer | jessro95@uw.edu | [LinkedIn](https://www.linkedin.com/in/jessicahyerinro/)

### Stacy (Yunpei) Zeng 
UX Designer | stacyz@uw.edu | [LinkedIn](https://www.linkedin.com/in/yunpeizeng/)

Yuzu: [Email](yuzu.me@outlook.com) | [Website](http://yu-zu.me/) | [Capstone Website](https://ischool.uw.edu/capstone/projects/2017/yuzu)
-