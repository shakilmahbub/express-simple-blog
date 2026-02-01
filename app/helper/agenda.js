// agenda.js
import { Agenda } from 'agenda';
import { MongoBackend } from '@agendajs/mongo-backend';

const mongoConnectionString = "mongodb://localhost:27017/simple-blog";

const agenda = new Agenda({
	backend: new MongoBackend({ address: mongoConnectionString })
});

export default agenda;
