**Algorithm**

***Structure***
	The structure is based on a numeric numbering that is incremented by one every time a commit is made. This acts as the date. If the current commit is numbered ***n*** then the previous commit is ***n-1***. This makes it easy for changes to be committed and to be reviewed.

***Function***
	There is of course the commit changes function. This is done by updating a database so of course a database write class is required. A database applet has to be created. A simple database in the form of a folder where each piece of data is a text file where the filename is the primary key and the data is in each line and the list of file names is stored in a simple text file called ***lst_primary.txt***.
	In git the functions involve splitting the saving process into a staging and commit area. I don't know if the staging process is required. I could first save the files or stage it on a separate staging area where the files will remain before it is committed as a complete change. This will be done as follows:
	First save the files in a staging folder.
	Allows the user to update or delete the files before it is committed in the next step. 



