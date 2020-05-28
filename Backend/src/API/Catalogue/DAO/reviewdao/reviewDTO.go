package reviewdao

//Review struct
type Review struct {
	ReviewID string `gorm:"column:review_id;primary_key" json:"id"`
	MovieID  int    `json:"movie_id"`
	Content  string `gorm:"type:text" json:"content"`
	Author   string `json:"author"`
}
