package moviedao

//PAGELIMIT variable to display the number of movies on a page
const PAGELIMIT = 8

//APIKEY for TMDB API
const APIKEY = "381193835c01836af08b2b8b05341ae5"

//APIURL for API
const APIURL = "https://api.themoviedb.org/3/%s/popular?api_key=%s&page=%d"

//IMAGEBASEURL for poster Images
const IMAGEBASEURL = "https://image.tmdb.org/t/p/w500/"

//OSIMAGEPATH variable for staticexit image path
const OSIMAGEPATH = "static/images/"

//DBNAME variable for database name
const DBNAME = "pictureperfect"

//DBUSERNAME variable for database username
const DBUSERNAME = "root"

//DBPASSWORD variable for database password
const DBPASSWORD = "test123"

//DBHOST variable for database address
const DBHOST = "127.0.0.1"

//DBPORT variable for database port number
const DBPORT = "3306"

//DATABASEURL to handle mysql database
const DATABASEURL = DBUSERNAME + ":" + DBPASSWORD + "@tcp(" + DBHOST + ":" + DBPORT + ")/" + DBNAME + "?charset=utf8&parseTime=True&loc=Local"
