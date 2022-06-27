package service

import (
	m "api/src/models"
	"fmt"

	employee_repository "api/src/repositories/employee.repository"
)

func Add(user m.Employee) (bool, error) {
	resp, err := employee_repository.Add(user)

	if err != nil {
		return false, err
	}

	if !resp {
		return false, nil
	}

	return true, nil
}

func Get() ([]m.Employee, error) {
	users, err := employee_repository.Get()

	if err != nil {
		return nil, err
	}
	return users, nil
}

func GetByList(ids []string) ([]m.Employee, error) {
	users, err := employee_repository.GetByList(ids)
	if err != nil {
		return nil, err
	}
	fmt.Print(users)
	return users, nil
}

func GetById(id string) (m.Employee, error) {
	user, err := employee_repository.GetById(id)

	if err != nil {
		return m.Employee{}, err
	}
	return user, nil
}

func Update(user m.Employee) (bool, error) {
	resp, err := employee_repository.Update(user)

	if err != nil {
		return false, err
	}

	if !resp {
		return false, nil
	}

	return true, nil
}

func Delete(id string) (bool, error) {
	_, err := employee_repository.Delete(id)

	if err != nil {
		return false, err
	}
	return true, nil
}
