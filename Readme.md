For Backend

SET environment variable \$GOPATH="path_to/e2eproject/Backend/src

For setting database

1. Create the "pictureperfect" database in mysql
2. Change the database username and password in \$GOPATH/utils/constants.go
3. Comment mapURL() line and uncomment the TMDB api function
4. build the project in main.go folder and run it
5. Undo the comments after database population and rebuild the program and run it.

Third party go packages:

1. "github.com/gorilla/mux"
2. "github.com/davecgh/go-spew/spew"
3. "github.com/go-sql-driver/mysql"
4. "github.com/jinzhu/gorm"
5. "github.com/google/uuid"

In the \$GOPATH folder Run:

go build
then src.exe(for windows) or ./src(for linux)
run "npm start" in the "Frontend/app/" folder

Third Party Javascript Package:

1. axios
2. react-router
3. react-router-dom
4. redux
5. react-redux
6. redux-thunk
7. redux-logger
8. @material-ui/core
9. @material-ui/icons
10. react-bootstrap
11. bootstrap

Note: Internet Connection is required.

Demo available on this private link: https://youtu.be/d30iRCb12mg
