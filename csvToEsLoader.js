
const fs = require('fs');
const elasticsearch = require('elasticsearch');
const esMapping = require('./es_mapping');

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
  //log: 'debug'
  //log: 'trace'
});


const dateMapping = {
	expenseDate: 'Data'
}

const mapping = {
	//expenseDate: 'Data',
	type: 'Type',
	account: 'From',
	category: 'To',
	tags: 'Tags',
	amount: 'Amount',
	currency: 'Currency',
	amountConverted:'Amount converted',
	currencyConverted: 'Currency of conversion',
	note: 'Note'
}

fs.readFile('/Users/giovanni/Downloads/CoinKeeper_export.csv', (err, data) => {	

	if(err) {
		console.error('failure', err);
		return ;
	}

	let tmpStr = data.toString();
	
	let rows = tmpStr.split('"\n');
	
	let headersStr = rows.shift();

	headersStr = headersStr.replace(/"/g,'');
	headersStr = headersStr.replace("\n",'');
	let headersArray = headersStr.split(',');
	headersArray.shift();
	
	
	let headersM = {};
	headersArray.forEach((header,index) => {
		headersM[header] = index;
	});	


	//console.log(headersArray, headersM);	

	client.indices.delete({index: 'speending' }, (deleteError, deleteRs) => {
		if(deleteError && deleteError.status != 404) {
			console.error('Error => deleteError =>', deleteError.status, deleteError);
			return ;
		}

		console.log('index was deleted', deleteRs);

		//client.indices.create({index: 'speending'}, (createError, createRs) => {
		client.indices.create({index: 'speending', body:esMapping}, (createError, createRs) => {

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
		if(rows[i] == '\n\n"Name","Budget","Received to date","Icon","Currency') {
			console.log("aqui nada");
			break;
		}
		//console.log(i,rows[i]);		
		//let rowStr = rows[i].replace(/"/g,'');
		//let rowArray = rowStr.split(/",/);
		//console.log(i,rowArray);		
		let rowArray = rows[i].split(/",/);

		let recordObj = {};
		keys.forEach((key) => {

			let value = rowArray[headersM[mapping[key]]].replace(/"/g,'');
			//headersM[mapping[key]]
			//if(rowArray[headersM[mapping[key]]]){
			if(value) {
				//let value = rowArray[headersM[mapping[key]]].replace("\n"," ");
				value = value.replace("\n"," ");
				recordObj[key] = value;
			} 
			
		});

		dateKeys.forEach((key) => {

			//console.log("rowArray[headersM[mapping[key]]]",dateMapping[key]);
			let value = rowArray[headersM[dateMapping[key]]].replace(/"/g,'');
			if(value) {
				//let value = rowArray[headersM[mapping[key]]].replace("\n"," ");
				value = value.replace("\n"," ");
				var dat = new Date(value);
				//console.log(dat.toISOString());
				recordObj[key] = dat;
			} 			
		});


		//console.log('index',i,recordObj);

		esInstructions.push({ index:  { _index: 'speending', _type: 'coinKeeper', _id:i+1} });
		esInstructions.push(recordObj);

		if(!((i+1)%batchSize)) {
			console.log("aqui uno")

			bulkData(esInstructions.splice(0));		
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

//Data		Type	From			To				Tags	Amount	Currency	Amount converted	Currency of conversion	Recurrence	Note
//1/26/2016	Expense	City premier	Comer en viaje			94.11	MXN			94.11				MXN						None	
