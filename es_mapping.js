module.exports = {    
    "mappings": {
        "coinKeeper": {
            "properties": {
                "account": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "amount": {
                    "type": "float",
                    //"fields": {
                        //"keyword": {
                            //"type": "keyword",
                            //"ignore_above": 256
                        //}
                    //}
                },
                "amountConverted": {
                    "type": "float",
                    //"fields": {
                        //"keyword": {
                            //"type": "keyword",
                            //"ignore_above": 256
                        //}
                    //}
                },
                "category": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "currency": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "currencyConverted": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "expenseDate": {
                    "type": "date"//,
                    //"format": "MM/dd/yyyy"
                    //"fields": {
                        //"keyword": {
                            //"type": "keyword",
                            //"ignore_above": 256
                        //}
                    //}
                },
                "note": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "tags": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "type": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "travelName": {
                    "type": "keyword"
                },
                "food": {
                    "type": "keyword"
                },
                "foodPlace": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },
                "receiver":{
                    "type": "keyword"
                },
                "toWhom":{
                    "type": "keyword"
                },
                "withWho":{
                    
                }
            }            
        }
    }
}