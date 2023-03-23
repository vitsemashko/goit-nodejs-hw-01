const fs = require("node:fs/promises");
const path = require("node:path");

const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	const contacts = JSON.parse(data);
	return contacts;
}

async function getContactById(contactId) {
	const contacts = await listContacts();
	const result = contacts.find((item) => item.id === contactId);
	if (!result) {
		return null;
	}
	return result;
}

async function removeContact(contactId) {
	const contacts = await listContacts();
	const idx = contacts.findIndex((item) => item.id === contactId);
	const [removeContact] = contacts.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return removeContact;
}

async function addContact(name, email, phone) {
	const contacts = await listContacts();
	const newContact = { id: v4(), name, email, phone };
	contacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts));
	return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
