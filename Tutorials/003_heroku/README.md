Heroku
======================

Purpose
----------------------

- Cloud hosting.
- Can be used for massive scale
	- GitHub
	- Code for America
	- TED
- Free tier. **Awesome** for prototypes and installations that need a web component.	


### Other options
- Pagodabox (also free)
- Rackspace ($$)
- Amazon EC2 (free tier, can cost $$)


----------------------

Installation
----------------------
- Install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
- Adds commands to your command line

		heroku login
		heroku create

- Pushing to Heroku works very similar to pushing to GitHub
	
		heroku ps:scale web=1
		git push heroku master

Automatically deploys.

- Enable websockets

		heroku labs:enable websockets -a {project name}

