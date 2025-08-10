export type Message = {
	id: string;
	email: string;
	content: string;
	viewed?: boolean;
	createdAt?: Date;
	updatedBy?: string;
	updatedAt?: Date;
};
