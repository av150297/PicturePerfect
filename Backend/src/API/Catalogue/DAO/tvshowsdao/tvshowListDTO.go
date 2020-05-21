package tvshowsdao

//TvShowList struct
type TvShowList struct {
	List     []TvShow `json:"results"`
	LastPage int      `json:"last_page"`
}
