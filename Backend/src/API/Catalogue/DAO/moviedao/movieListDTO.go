package moviedao

//MovieList struct
type MovieList struct {
	List     []Movie `json:"results"`
	LastPage int     `json:"last_page"`
}
