package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"

	employee_handler "api/src/handlers/employee.handler"
)

// CORS Middleware
func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Set headers
		w.Header().Set("Access-Control-Allow-Headers:", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")

		// Next
		next.ServeHTTP(w, r)
		return
	})
}

func main() {
	r := mux.NewRouter()
	r.Use(CORS)
	r.HandleFunc("/api/employee/get", employee_handler.Get).Methods("GET")
	r.HandleFunc("/api/employee/list/get", employee_handler.ListGet).Methods("POST")
	r.HandleFunc("/api/employee/add", employee_handler.Add).Methods("POST")
	r.HandleFunc("/api/employee/get", employee_handler.Get).Methods("GET")
	r.HandleFunc("/api/employee/get/{id}", employee_handler.GetById).Methods("GET")
	r.HandleFunc("/api/employee/update", employee_handler.Update).Methods("POST")
	r.HandleFunc("/api/employee/delete/{id}", employee_handler.Delete).Methods("GET")
	log.Fatal(http.ListenAndServe(":9091", r))
}
