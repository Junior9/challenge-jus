package userhandler

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	m "api/src/models"

	employee_service "api/src/services/employee.service"

	"github.com/gorilla/mux"
)

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func Add(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Employee user")

	enableCors(&w)

	var employee m.Employee
	_ = json.NewDecoder(req.Body).Decode(&employee)

	_, err := employee_service.Add(employee)

	if err != nil {
		json.NewEncoder(w).Encode("Error")
	}

	json.NewEncoder(w).Encode("ok")
}

func Get(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Get users")

	enableCors(&w)

	users, _ := employee_service.Get()

	json.NewEncoder(w).Encode(users)
}

func ListGet(w http.ResponseWriter, req *http.Request) {

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		panic(err)
	}

	listString := string(body)
	log.Println(listString)

	listString = strings.Replace(listString, "[", "", 1)
	listString = strings.Replace(listString, "]", "", 1)

	res1 := strings.Split(listString, ",")

	users, _ := employee_service.GetByList(res1)

	json.NewEncoder(w).Encode(users)
}

func GetById(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Get user")

	enableCors(&w)

	params := mux.Vars(req)
	id := params["id"]

	users, _ := employee_service.GetById(id)

	json.NewEncoder(w).Encode(users)
}

func Update(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Update user")

	enableCors(&w)

	var user m.Employee
	_ = json.NewDecoder(req.Body).Decode(&user)

	_, err := employee_service.Update(user)

	if err != nil {
		json.NewEncoder(w).Encode("Error")
	}

	json.NewEncoder(w).Encode("ok")
}

func Delete(w http.ResponseWriter, req *http.Request) {
	fmt.Println("Delete user")

	enableCors(&w)

	params := mux.Vars(req)
	id := params["id"]

	_, err := employee_service.Delete(id)

	if err != nil {
		json.NewEncoder(w).Encode("Error")
	}

	json.NewEncoder(w).Encode("OK")
}
