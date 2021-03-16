Here, is my MERN (Mongo, Express, React, Node) framework derived to do app.

It is necessary for the user to register their account before being eligible to access and view the website/app properly.

The user will submit their login details via the front end of the app which will then be transferred via the Controler component (contained with the routes folder) to the back end of the app. Here, there will be a comparison to identify if the submitted details currently exist within the database, and then grant the appropriate access via a token as appropriate. If not, the details are stored, and the user is then issued the token.

Upon entry to the app, the user will then be able to enter their relevant goals, and will do so via the front end with the GUI on offer.

A MVC architecture was implemented for this app.

Model (the M) is provided for by the model folder.
View (the V) is provided by the client folder.
Controller (the C) is provided by the routes folder.

The view/client folder then provides the user interface and UX of the app, the front end of the website/app that the user interacts with.
The routes folder contains the means of transmission and communication between the front and back end, providing the interchange of data as appropriate allowing for dsynamic data driven content.

