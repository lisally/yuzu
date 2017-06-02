# Getting Started with the Yuzu App

### 1. Install Homebrew
	/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
Source: [Homebrew](https://brew.sh/)

### 2. Install Dependencies
	brew install node
	brew install watchman
	
### 3. Install the React Native CLI
	npm install -g react-native-cli
	
### 4. Install Xcode
Visit the Mac App Store: [Here](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)

Source: [Facebook](https://facebook.github.io/react-native/docs/getting-started.html)

### 5. Clone the Repository
	https://github.com/lisally/yuzu.git
	
### 6. Install Node Packages
	npm install
	
### 7. Create a Firebase Account
Create a Free Account: [Here](https://firebase.google.com/)

### 8. Create a New Firebase Project
![create new project](./images/1.png)

![name new project](./images/2.png)

### 9. Download the Yuzu Data
Download Yuzu's Product and Location Data: [Here](https://github.com/lisally/yuzu/tree/master/documentation/yuzu_data.json)

### 10. Navigate to Your Project's Database and Import Data
![navigate to database](./images/3.png)

![import data](./images/4.png)

![select data](./images/5.png)

### 11. Navigate Back to Overview Page For Web App Key
![add web app key](./images/6.png)

### 12. Copy the Highlighted Account Key
![copy key](./images/7.png)

### 13. Open the Yuzu Repository and Navigate to App File
	yuzu > src > app.js

![open app file](./images/8.png)

### 14. Paste Your Account Key to the Highlighted Section
![paste key](./images/9.png)

### 15. Open up the Command Line and Navigate to the Yuzu Folder Location and Run the App
	react-native run-ios
	
![yuzu app](./images/10.png)