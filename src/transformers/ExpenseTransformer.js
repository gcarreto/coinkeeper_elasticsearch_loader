//const travelCategories = ['Travel', 'Hotel', 'Comer en viaje', 'Transporte en viaje', 'uber', 'snacks', 'Ajedrez inscripciones'];
const travelCategories = ['Travel', 'Hotel', 'Comer en viaje', 'Transporte en viaje', 'Ajedrez inscripciones'];

class ExpenseTransformer {

    static parseNote(expense) {

        switch (expense.category) {
            case 'Transporte en viaje':
                expense = this.genericParse(expense, 'travelName', this.parseNoteTransporteEnViaje);                
                break;
            case 'Entertainment Ens':
                expense = this.genericParse(expense, 'withWho', this.parseNoteEnterntaimentEns);        
                break;
            case 'Ajedrez inscripciones':
                expense = this.genericParse(expense, 'travelName', this.parseUber);        
                break;
            case 'Comer en viaje':
                expense = this.genericParse(expense, 'travelName', this.parseNoteComerEnViaje);
                break;
            case 'Travel':
                expense = this.genericParse(expense, 'travelName', this.parseTravel);
                break;
            case 'Hotel':
                expense = this.genericParse(expense, 'travelName', this.parseNoteHotel);
                /*
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        console.log("expenseDate: ", expense.expenseDate,"category: ", expense.category, "note: ", expense.note);
                    } else {
                        expense.travelName = expense.note;
                        delete expense.note;
                    }
                }
                */
                break;
            case 'Entertainment':
                expense = this.genericParse(expense, 'travelName', this.parseNoteEnterntaimentEnViaje);
                break;
            case 'snacks':
                expense = this.genericParse(expense, 'travelName', this.parseNoteSnacks);                
                break;   
            case 'Medicinas':
                expense = this.genericParse(expense, 'farmacia', this.parseNoteMedicine);                
                break;
            case 'Eating Out':
                expense = this.genericParse(expense, 'foodPlace', this.parseNoteFood);                
                break;
            case 'snacks Ensenada':
                expense = this.genericParse(expense, 'place', this.parseNoteSnacks);                
                break;
            case 'Gifts':
                expense = this.genericParse(expense, 'receiver', this.parseNoteGifts);                
                break;
            case 'compras de mercado':            
                //expense = this.genericParse(expense, 'mercado', this.parseNoteComprasDeMercado);
                if(expense.note) {
                    console.log(`expense.note /${expense.note}/`, expense.note.trim() === 'Cerillito');
                    if(expense.note.indexOf('|') >= 0) {
                        let noteDetails = expense.note.split('|');                        
                        expense = this.parseNoteComprasDeMercado(expense, noteDetails);
                    } else {                        
                        if(expense.note.trim() === 'Cerillito') {
                            expense.isCerillito = true;
                        } else {                            
                            expense.mercado = expense.note;
                        }                        
                    }
                    delete expense.note;
                }
                break;
            case 'cine':
                if(expense.note) {                    
                    expense.isSnacks = true;
                    delete expense.note;
                } else {
                    expense.isSnacks = false;
                }
                break;             
            case 'uber':
            case 'Didi':
                expense = this.genericParse(expense, 'travelName', this.parseUber);                
                break;                         
            case 'ropa deportiva':
            case 'Clothes':
            case 'Shoes':
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        let noteDetails = expense.note.split('|');                        
                        expense = this.parseNoteClothes(expense, noteDetails);
                    } else {
                        if(expense.note == 'Fix') {
                            expense.isFix = true;
                        } else {
                            expense.store = expense.note;
                        }                        
                    }
                    delete expense.note;
                }
                break;
            case 'entrada externa por tarjeta travel':
            case 'devolucion travel':
                expense.amountConverted *= -1;
                expense.accountOriginal = expense.account;
                expense.account = 'travel pass';
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        let noteDetails = expense.note.split('|');                        
                        expense = this.parseNoteExternalTravel(expense, noteDetails);
                        delete expense.note;
                    } else {
                        console.log("no esta considerado:", expense.note);
                    }                    
                }
                break;
            case 'entrada externa por tarjeta platinum'://a este le falta analisis, algunas compras para otra persona tienen coyas
            case 'devolucion platinum':    
                    expense.amountConverted *= -1;
                    expense.accountOriginal = expense.account;
                    expense.account = 'Platinum';
                    if(expense.note) {
                        if(expense.note.indexOf('|') >= 0) {
                            let noteDetails = expense.note.split('|');                        
                            expense = this.parseNoteExternalTravel(expense, noteDetails);
                            delete expense.note;
                        } else {
                            console.log("no esta considerado:", expense.note);
                        }                    
                    }
                    break;
            case 'entrada externa por vales':
                expense.amountConverted *= -1; 
                expense.accountOriginal = expense.account;
                expense.account = 'vales';
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        let noteDetails = expense.note.split('|');                        
                        console.log('not yet considered, entrada externa por vales: ', noteDetails);
                        //expense = this.parseNoteExternalTravel(expense, noteDetails);
                        //delete expense.note;
                    } else {
                        expense.categoryOriginal = expense.category;
                        expense.category = expense.note;
                        delete expense.note;
                    }                                        
                }
                break;
            case 'Shopping':
                expense = this.genericParse(expense, 'store', this.parseNoteShopping);
                /*
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        let noteDetails = expense.note.split('|');
                        expense = this.parseNoteShopping(expense, noteDetails);
                    } else {
                        expense.store = expense.note;                        
                    }
                    delete expense.note;
                }
                */
                break;
            case 'consultas':
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        console.log("consultas expenseDate: ", expense.expenseDate,"category: ", expense.category, "note: ", expense.note);
                    } else {
                        expense.consultorio = expense.note;
                        delete expense.note;
                    }                    
                }
                break;
            case 'compra para otra persona':
                if(expense.note) {
                    if(expense.note.indexOf('|') >= 0) {
                        console.log("compra para otra persona expenseDate: ", expense.expenseDate,"category: ", expense.category, "note: ", expense.note);
                    } else {
                        expense.toWhom = expense.note;
                        delete expense.note;
                    }                    
                }
                break;
            case 'apps':
                expense = this.genericParse(expense, 'appName', this.parseNoteApps);                
                break;
            case 'random':
            case 'retorno premia':
            case 'ajuste':
                expense.amountConverted *= -1;
                break;
            case 'retorno ethereum':
                expense.amountConverted *= -1;
                expense.category = 'Ethereums'
                expense.categoryOriginal = 'retorno ethereum'
            //case 'retorno producto'://Clothes|dlls|43.48||Thanksgiving 2017|San Diego|Macy's
        }

        return expense;
    }

    static genericParse(expense, defaultProperty, parsingMethod) {
        if(expense.note) {
            if(expense.note.indexOf('|') >= 0) {
                let noteDetails = expense.note.split('|');
                //expense = this.parseNoteTransporteEnViaje(expense, noteDetails);
                //console.log("si tienes una nota", expense.note, defaultProperty, noteDetails);
                expense = parsingMethod(expense, noteDetails);
            } else {
                expense[defaultProperty] = expense.note;                        
            }
            delete expense.note;
        }
        return expense;
    }

    static parseNoteApps(expense, details) {

        if(details[0]) {//in what app was the money spent
            expense.appName = details[0];
        }
        
        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }
        

        return expense;
    }

    static parseNoteTransporteEnViaje(expense, details) {

        if(details[0]) {//in what was the money spent
            expense.item = details[0];
        }

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.currencyInMexicanPesos = details[3];
        }

        if(details[4]) {//city
            expense.city = details[4];
        }

        if(details[5]) {//event// default
            expense.travelName = details[5];
        }

        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }

        return expense;
    }

    //what was the snack|where was the snack eaten|currency|cost in currency|that day currency cost|event
    static parseNoteSnacks(expense, details) {

        if(details[0]) {//what was the snack
            expense.snack = details[0];
        }

        if(details[1]) {//where was the snack eaten
            expense.snackPlace = details[1]; //tentative to change this to place in order to match comer en viaje because I can eat
        }//and grab a snack in the same place

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        return expense;
    }

    //what was the medicine|where was the medicine bought|currency|cost in currency|that day currency cost|event
    static parseNoteMedicine(expense, details) {

        if(details[0]) {//what was the medicine
            expense.medicina = details[0];
        }

        if(details[1]) {//where was the medicine eaten // default
            expense.farmacia = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        if(details[7]) {//doctor
            expense.doctor = details[7];
        }

        return expense;
    }

    //what was the food|where was the food eaten|currency|cost in currency|that day currency cost|food event
    static parseNoteFood(expense, details) {

        if(details[0]) {//what was the food
            expense.food = details[0];
        }

        if(details[1]) {//where was the food eaten
            expense.foodPlace = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//event
            expense.foodEvent = details[5];
        }

        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }

        return expense;
    }

    //what was the gift|where was the gift bough\
    static parseNoteGifts(expense, details) {

        if(details[0]) {//what was the gift
            expense.gift = details[0];
        }

        if(details[1]) {//where was the gift bought
            expense.giftPlace = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//to whom// it is not working well when several persons are added
            console.log('parseNoteGifts receiver: ', details[5]);
            expense.receiver = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        if(details[7]) {//city
            expense.city = details[7];
        }

        return expense;
    }

    //jeans|Levis|59.26|dlls|19.04|Cumple Lex
    //what was the cloth|where was the cloth bought|currency|cost in currency|that day currency cost|event
    static parseNoteClothes(expense, details) {

        if(details[0]) {//what was the cloth
            expense.cloth = details[0];
        }

        if(details[1]) {//where was the cloth bought
            expense.store = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        return expense;
    }

    static parseNoteComerEnViaje(expense, details) {

        if(details[0]) {//what was the food eat
            //expense.foodItem = details[0];
            expense.food = details[0];
        }

        if(details[1]) {//where was the food eat
            expense.travelFoodPlace = details[1]; //tentative to change this to place in order to match snacks because I can eat
        }// ant grab a snack in the same place

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }
        

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        if(details[7]) {//how many people
            expense.peopleQty = details[6];
        }

        return expense;
    }

    //entrada externa por tarjeta travel
    //Category|currency|cost in currency|that day currency cost|event|city
    static parseNoteExternalTravel(expense, details) {

        if(details[0]) {//what was the category
            //expense.cloth = details[0];
            expense.categoryOriginal = expense.category;
            expense.category = details[0];
        }

        //if(details[1]) {//where was the cloth bought
            //expense.store = details[1];
        //}

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.currencyInMexicanPesos = details[3];
        }

        if(details[4]) {//event
            expense.travelName = details[4];
        }

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//store
            expense.store = details[6];
        }

        //travelEntertaiment: NFL tickets

        if(details.length > 7) {
            let subArray = details.slice(7,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }
        //console.log('parseNoteExternalTravel.length', details.length, details);
        return expense;
    }

    static parseNoteShopping(expense, details) {

        if(details[0]) {//what was bought
            expense.shoppingItem = details[0];
        }

        if(details[1]) {//where was the item bought
            expense.store = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//city
            expense.city = details[5];
        }

        if(details[6]) {//event
            expense.travelName = details[6];
        }

        return expense;
    }

    static parseNoteHotel(expense, details) {
        
        if(details[0]) {//where was the item bought
            expense.store = details[0];//should this be place ? like snack (in travel) and comer en viaje ?
        }//because I can eat, grab a snack and stay in the same place

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.currencyInMexicanPesos = details[3];
        }

        if(details[4]) {//city
            expense.city = details[4];
        }

        if(details[5]) {//event
            expense.travelName = details[5];
        }

        return expense;
    }

    static parseNoteEnterntaimentEns(expense, details) {

        //console.log("details: ", details);

        if(details[0]) {//whith who
            expense.withWho = details[0];
        }

        if(details[1]) {//where was the the entertaiment pay
            
            //expense.EntertaimentPlace = details[1];
            expense.EnterntaimentPlace = details[1];
        }

        if(details[2]) {//currency
            expense.currency = details[2];
        }

        if(details[3]) {//cost in currency
            expense.costInCurrency = details[3];
        }

        if(details[4]) {//that day currency cost
            expense.currencyInMexicanPesos = details[4];
        }

        if(details[5]) {//event
            expense.travelName = details[5];
        }

        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
        }

        return expense;
    }

    static parseNoteEnterntaimentEnViaje(expense, details) {

        if(details[0]) {//what was the entertaiment pay
            expense.travelEntertaiment = details[0];
        }        

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.currencyInMexicanPesos = details[3];
        }

        if(details[4]) {//city
            expense.city = details[4];
        }

        if(details[5]) {//event
            expense.travelName = details[5];
        }
        
        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }

        return expense;
    }

    static parseNoteComprasDeMercado(expense, details) {

        if(details[0]) {//mercado
            expense.mercado = details[0];
        }

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.currencyInMexicanPesos = details[3];
        }

        if(details[4]) {//city
            expense.city = details[4];
        }

        if(details[5]) {//event
            expense.travelName = details[5];
        }

        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }

        return expense;
    }
    
    static parseTravel(expense, details) {

        if(details[0]) {//where was the item bought
            expense.store = details[0];
        }

        if(details[1]) {//currency
            expense.currency = details[1];
        }

        if(details[2]) {//cost in currency
            expense.costInCurrency = details[2];
        }

        if(details[3]) {//that day currency cost
            expense.city = details[3];
        }

        if(details[4]) {//city
            expense.city = details[4];
        }

        if(details[5]) {//event //default
            expense.travelName = details[5];
        }

        if(details.length > 6) {
            let subArray = details.slice(6,details.length);
            expense.extraNote = subArray.join('|');
            //console.log("se paso: ", subArray);

        }

        return expense;
    }

    static parseUber(expense, details) {

        if(details[0]) {//city
            expense.city = details[0];
        }

        if(details[1]) {//event
            expense.travelName = details[1];
        }

        return expense;
    }
}

module.exports = ExpenseTransformer;

//category.keyword: "devolucion platinum"
//category:devolucion platinum //aun no se que hacer con esta categoria
//deberia regresarse a la cuenta platinum para que cuente como menos 
//deberia cuando aplica regresarse a comisiones al banco y cuando no al gasto que se hizo


//category.keyword: "devolucion travel"
//category:devolucion platinum //aun no se que hacer con esta categoria
//deberia regresarse a la cuenta platinum para que cuente como menos 
//deberia cuando aplica regresarse a comisiones al banco y cuando no al gasto que se hizo