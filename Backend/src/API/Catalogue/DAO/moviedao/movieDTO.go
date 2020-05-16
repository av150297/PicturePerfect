package moviedao

//Movie struct
type Movie struct {
	MovieID     int    `gorm:"primary_key" json:"movie_id"`
	Title       string `json:"title"`
	ReleaseDate string `json:"release_date"`
	Language    string `json:"original_language"`
	Adult       bool   `json:"adult"`
	Image       string `json:"poster_path"`
	Overview    string `gorm:"type:varchar(1000)" json:"overview"`
}
