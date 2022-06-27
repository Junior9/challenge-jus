package repository

import (
	mongo "api/src/database"
	m "api/src/models"
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var collection = mongo.GetConnection("employees")

var ctx = context.Background()

func Add(user m.Employee) (bool, error) {
	_, err := collection.InsertOne(ctx, user)
	if err != nil {
		log.Fatal(err)
		return false, err
	}
	return true, nil
}

func Get() ([]m.Employee, error) {
	filter := bson.D{}
	var users []m.Employee

	resp, err := collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}

	for resp.Next(ctx) {

		var user m.Employee

		err = resp.Decode(&user)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	return users, nil
}

func GetByList(ids []string) ([]m.Employee, error) {
	//oid, _ := primitive.ObjectIDFromHex(ids)

	//filter := bson.M{"_id": oid}

	oids := make([]primitive.ObjectID, len(ids))
	//fmt.Print(oids)

	for i := range ids {
		objID, err := primitive.ObjectIDFromHex(ids[i])
		if err == nil {
			fmt.Print(objID)
			oids = append(oids, objID)
		}
	}

	query := bson.M{"_id": bson.M{"$in": oids}}

	var users []m.Employee

	resp, err := collection.Find(ctx, query)
	if err != nil {
		return nil, err
	}

	for resp.Next(ctx) {

		var user m.Employee

		err = resp.Decode(&user)
		if err != nil {
			return nil, err
		}
		//fmt.Printf(user)
		users = append(users, user)
	}

	return users, nil
}

func GetById(id string) (m.Employee, error) {

	oid, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": oid}
	var user m.Employee

	userResp := collection.FindOne(ctx, filter)

	err := userResp.Decode(&user)

	if err != nil {
		return m.Employee{}, err
	}

	return user, nil
}

func Update(user m.Employee) (bool, error) {

	oid := user.ID

	filter := bson.M{"_id": oid}

	update := bson.M{
		"$set": bson.M{
			"name":       user.Name,
			"profesion":  user.Profesion,
			"img":        user.Img,
			"created_at": user.CreatedAt,
			"updated_at": user.UpdatedtAt,
		},
	}

	fmt.Println("************************************")
	fmt.Println(update)

	_, err := collection.UpdateOne(ctx, filter, update)

	if err != nil {
		return false, err
	}

	return true, nil
}

func Delete(id string) (bool, error) {

	oid, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": oid}

	_, err := collection.DeleteOne(ctx, filter)

	if err != nil {
		return false, err
	}
	return true, nil
}
