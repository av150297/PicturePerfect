package reviewdao

//Review struct
type Review struct {
	ReviewID string `gorm:"column:review_id;primary_key" json:"id"`
	TypeID   int    `json:"type_id"`
	Type     string `json:"type"`
	Content  string `gorm:"type:text" json:"content"`
	Author   string `json:"author"`
}
