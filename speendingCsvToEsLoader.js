const fs = require('fs');
const elasticsearch = require('elasticsearch');
const esMapping = require('./trackerEsMapping');
const ExpenseTransformer = require('./src/transformers/ExpenseTransformer');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
  //log: 'debug'
  //log: 'trace'
});

//NOT category: Transfer AND NOT category: "Salary" AND NOT account: "Scotia ahorro" AND NOT category: "ahorro"
//amountConverted:<0 AND NOT category: Transfer

const dateMapping = {
	expenseDate: 'Date'
}

const mapping = {
	//type: 'Type',
	category: 'Category',
	amountConverted: 'Amount',
	note: 'Note',
	account: 'Account'	
	//tags: 'Tags',
	//amount: 'Amount',	
	//currency: 'Currency',
	//amountConverted:'Amount converted',
	//currencyConverted: 'Currency of conversion',	
}

//const travelCategories = ['Travel', 'Hotel', 'Comer en viaje', 'Transporte en viaje', 'uber', 'snacks', 'Ajedrez inscripciones'];
//const travelCategories = ['Travel', 'Hotel', 'Comer en viaje', 'Transporte en viaje', 'snacks', 'Ajedrez inscripciones'];

fs.readFile('/Users/giovanni/Downloads/speendingDocs/Transactions 01 Jul 2018 - 30 Nov 2018.csv', (err, data) => {	

	if(err) {
		console.error('failure', err);
		return ;
	}

	let tmpStr = data.toString();
	let rows = tmpStr.split('\r\n');

	let headersStr = rows.shift();
	let headersArray = headersStr.split(',');

	let headersM = {};
	headersArray.forEach((header,index) => {
		headersM[header.trim()] = index;
	});

	client.indices.delete({index: 'speendingtracker' }, (deleteError, deleteRs) => {
		if(deleteError && deleteError.status != 404) {
			console.error('Error => deleteError =>', deleteError.status, deleteError);
			return ;
		}

		console.log('index was deleted', deleteRs);

		client.indices.create({index: 'speendingtracker', body:esMapping}, (createError, createRs) => {

			if(deleteError) {

				console.error('Error => create =>', deleteError);
				return ;
			}

			console.log('index was created', createRs);

			indexData(rows, mapping, dateMapping, headersM);

		});
	});
});

function indexData(rows, mapping, dateMapping, headersM) {

	let batchSize = 500;
	let esInstructions = [];
	let keys = Object.keys(mapping);
	let dateKeys = Object.keys(dateMapping);

	for(let i=0; i<rows.length; i+=1) {		

		if(rows[i]){		

			let rowArray = rows[i].split(/,/);
			let recordObj = {};

			keys.forEach((key) => {

				let value = rowArray[headersM[mapping[key]]].trim();

				if(value) {
					recordObj[key] = value.trim();
				}				
			});

			dateKeys.forEach((key) => {

				let value = rowArray[headersM[dateMapping[key]]];
				if(value) {
					var dat = new Date(value);
					recordObj[key] = dat;
				} 			
			});

			amountConverted = parseFloat(recordObj.amountConverted);
			
			if(recordObj.category != 'Transfer') {

				if(amountConverted >= 0) {
					recordObj.type = 'Income';
				} else {
					recordObj.type = 'Expense';
					recordObj.amountConverted = recordObj.amountConverted.replace('-','');
				}

				//console.log(recordObj.type, recordObj.amountConverted);
			}				

			/********* viajes *********/
			//categories:
			//Travel
			//Hotel
			//Comer en viaje
			//Transporte en viaje
			//uber
			//snacks
			//Entertainment ?????
			//Ajedrez inscripciones

			/********* no tengo idea aun *********/
			//entrada externa por tarjeta travel
			//entrada externa por tarjeta platinum note:  Entertainment ens
			//random note:  Devolucion SAT

			/**********no tengo idea aun ********/			
			//devolucion platinum note:  Devolucion


			//if(recordObj.note) {
				//console.log("expenseDate: ", recordObj.expenseDate,"category: ", recordObj.category, "note: ", recordObj.note);
			//}

			/*
			if(travelCategories.includes(recordObj.category)) {				

				if(recordObj.note) {
					//console.log("recordObj.note.indexOf('|')",recordObj.note.indexOf('|'), recordObj.note);
					if(recordObj.note.indexOf('|') >= 0) {
						console.log("expenseDate: ", recordObj.expenseDate,"category: ", recordObj.category, "note: ", recordObj.note);
					} else {
						console.log('valor directo:', recordObj.note);
						recordObj.travelName = recordObj.note;
					}
				} else {
					//console.log("uno sin nada");
				}			
			}
			*/

			recordObj = ExpenseTransformer.parseNote(recordObj);

			esInstructions.push({ index:  { _index: 'speendingtracker', _type: 'tracker', _id:i+1} });
			esInstructions.push(recordObj);

			if(!((i+1)%batchSize)) {
				console.log("aqui un bulk es ejecutado");
				bulkData(esInstructions.splice(0));		
			}
		}		
	}	

	console.log(esInstructions.length);
	bulkData(esInstructions);
}

function bulkData(esInstructions) {

	client.bulk({ body: esInstructions }, (bulkError, bulkResp) => {
		if(bulkError) {
			console.log('Error => bulkError => ',bulkError)
		} else {
			//console.log('bulkResp',bulkResp);
			bulkResp.items.forEach((bulkRSitem,bulkIndex) => {
				//console.log('bulkRSitem:',bulkRSitem.index.status);
				if(bulkRSitem.index.status != '201') {
					console.log('there was an error',bulkIndex,bulkRSitem.index);
					//console.log('esInstructions',bulkIndex*2,esInstructions[(bulkIndex*2)]);
				}
			});
		}
	});
}