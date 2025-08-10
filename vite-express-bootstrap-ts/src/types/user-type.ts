import { ValidationError } from "./common-type";

export type Role = 'ADMIN' | 'USER';

export type User = {
	id: string;
	email: string;
	username: string;
	password: string;
	role: Role;
	locked: boolean;
	createdBy: string;
	updatedBy?: string;
	createdAt: Date;
	updatedAt?: Date;
};

export type CreateUser = {
	email: string;
	username: string;
	password: string;
	role: Role;
};

export type UpdateUser = {
	id: string;
	email: string;
	username: string;
	role: Role;
	locked: boolean;
	updatedBy: string;
	updatedAt: Date;
};

export type ChangePassword = {
	username: string;
	password: string;
	updatedBy: string;
	updatedAt: Date;
};

export type UserFormProps = {
	user: Omit<User, 'password'>;
	errorMessage?: string;
	validationError?: ValidationError;
};
