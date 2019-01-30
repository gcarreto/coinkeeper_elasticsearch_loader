module.exports = {    
    "mappings": {
        "tracker": {
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
                "amountConverted": {
                    "type": "float"
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
                /*"currency": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },*/
                /*"currencyConverted": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },*/
                "expenseDate": {
                    "type": "date"                    
                },
                "note": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                }
                /*"tags": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                },*/
                /*"type": {
                    "type": "text",
                    "fields": {
                        "keyword": {
                            "type": "keyword",
                            "ignore_above": 256
                        }
                    }
                }*/
            }
        }
    }
}

/*
    "accountOriginal": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "amountConverted": {
        "type": "float"
    },
    "appName": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "categoryOriginal": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "city": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "cloth": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "consultorio": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "costInCurrency": {
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
    "currencyInMexicanPesos": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "expenseDate": {
        "type": "date"
    },
    "farmacia": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "food": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "foodItem": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
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
    "gift": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "giftPlace": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "isFix": {
        "type": "boolean"
    },
    "isSnacks": {
        "type": "boolean"
    },
    "item": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "medicina": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
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
    "place": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "receiver": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "snack": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "store": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "toWhom": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "travelFoodPlace": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    },
    "travelName": {
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
    "withWho": {
        "type": "text",
          "fields": {
            "keyword": {
                "type": "keyword",
                  "ignore_above": 256
            }
        }
    }
    */
