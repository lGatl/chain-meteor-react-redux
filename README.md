# chain-meteor-react-redux
You can see the last version of the chain-meteor-react-redux principle in the Devinamique project

## Description :
chain-meteor-react-redux called CMRR is my boilerplate. 
This boilerplate gives a ready system to chain Meteor, React & Redux. 
So you can easily begin developpement or add a collection in an existing project. 
Furthermore This project propose a convention every were in the project. it will be easy for you to work on a old project or continue a project of others developpers. 

## GetStarted :
This technology use MongoDB, Npm & Meteor so you have to install this 3 packages before continue.

You can clone or copy this project on [https://github.com/lGatl/chain-meteor-react-redux](https://github.com/lGatl/chain-meteor-react-redux).

Go to the folder parent of your further project and

	git clone git@github.com:lGatl/chain-meteor-react-redux.git

Rename your project :

	mv chain-meteor-react-redux your-project-name

Go in your project :

	cd your-project-name

reinit your project's git:

	rm -rf .git
	git init

You have to install npm packages :

	meteor npm install

Then it's a meteor Project, then you can run it :

	meteor run

## Principle :

Meteor, React and Redux are chained then for each collection you will need, put his name (first letter capitalized) in the "imports/5_methodes/methodes" COLLECTIONS array. 
You will automaticaly dispose of methods, actions and reducers already chained and named with all CMRR conventions. In fact methods, actions, reducers are automiticaly genereted for each strings in COLLECTIONS.

For example : If you see `COLLECTIONS = ["Users", "Article", "Book"]`

You know that you can get articles with articleGet that you can find ACTIONS.Article.get,it will call the Meteor Method getArticle and the result will be put in state.article.all . 

You know that you can rm book with bookRm that you can find ACTIONS.Book.rm, it will call the Meteor Method rmBook and the result will be seen in state.book.all.

You know that you can controle inputs with controleUsers that you can find ACTIONS.Users.controle, and the result will be seen in state.users.controle. 

The goal is to have a frame of work framed but permissive so that all can exchange ACTIONS

## Documentation :
 Documentation in progress at [lGatl.fr/chain-meteor-react-redux](http://lGatl.fr/chain-meteor-react-redux)

## Author :
Adrien GATINOIS 

gat55@live.fr

lGatl
