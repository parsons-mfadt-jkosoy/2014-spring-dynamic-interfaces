First Steps
======================

Installing NodeJS
----------------------

### OSX

- Install Homebrew

		ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

- You may need to install XCode Tools if you haven't already. [This tutorial describes how](http://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/)

- Install NodeJS

		brew install node

### Windows

Download and install here [here](http://nodejs.org/download/)

### Linux (Ubuntu, Raspbian)

		sudo apt-get install nodejs


----------------------

Running Node (all platforms)
----------------------

		cd {directory of server-side-js-file.js}
		node {server-side-js-file.js}

----------------------

Notes
----------------------

- Node runs until you cancel (Ctrl+C on Mac/Linux) or crashes
- NPM = Node Package Manager. Useful for installing open-source addons.
	
		npm install forever

- Support on common shared domain hosting plans (GoDaddy, MediaTemple, etc) don't support NodeJS -- they're designed for hosting fairly standard sites, not customs server-side software.
- Heroku, Pagodabox, Amazon EC2, Rackspace provide servers. Heroku even has a free tier.