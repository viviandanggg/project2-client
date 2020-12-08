1) We've created an app that serves the purpose of tracking one's spendings. This expense tracker will calculate the sum spending for the current entire year and current month. We tried to cater this tracker towards college students based on the types of spending categories that they are most likely to use.
2) Our application is not a to-do list.
3) Vivian Dang and Will Madison worked together as partners for this project.
4) All of the code was developed by us. The only external resource we used was the Piggy Bank image icon, which was free of use and is linked at the bottom of the application.
5) Our application has both a back-end data store and web service and a front-end client as shown by our project2-client and project2-server directories.
6) Our application uses React for the front-end service and to create components.
7) The statements update as the user changes, adds, or deletes statements. The sum gets recalculated when the user does so, and the statements gets reordered from most recent date to latest date.
8) We manage state by using Redux.
9) Our website aesthetically looks pleasing with the simple palette. The green and pink-ish colors are used to help indicate if a deposit or withdrawal was made. There are strong alignments.
10) Our web service is accessed using fetch as shown in actions.js.
11) A progress wheel is shown for about 1/3 of a second when the page is updating its sum or statements.
12) No errors or warnings are present in the client.
13) Our project2-client directory are shared and can be accessed with twodee.
14) The URL for our site, "https://project2.vvebdesigns.me" works, and the "http" link redirects to the https 
link.
15) We have a MySQL database with a single table linked to our site where our data is stored and pulled from. 
16) We used ufw to block ports that are not needed.
17) Our web service sends and receives data as JSON. Specifically we have sum and statement objects.
18) Our endpoints are appropriately named to describe their function.
19) Our web service supports CORS.
20) Our web service is started with pm2 and stays running.
21) Our server is created with Nginx.
22) Our project2-service directory are shared and can be accessed with twodee.