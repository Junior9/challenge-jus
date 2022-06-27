package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

//User model
type Employee struct {
	ID         primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name       string             `json:"name"`
	Profesion  string             `json:"profesion"`
	Img        string             `json:"img"`
	CreatedAt  time.Time          `bson:"created_at,omitempty" json:"created_at"`
	UpdatedtAt time.Time          `bson:"updated_at,omitempty" json:"updated_at"`
}
