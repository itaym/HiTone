module.exports =  {
    users : {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "password" ],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 24,
                        description: "must be a string and is required"
                    },
                    lastLogin: {
                        bsonType: "date",
                        description: "deprecated"
                    },
                    password: {
                        bsonType: "object",
                        required: [ "salt", "hash" ],
                        properties: {
                            salt: {
                                bsonType: "string",
                                minLength: 128,
                                maxLength: 128,
                                description: "must be a string and is required."
                            },
                            hash: {
                                bsonType: "string",
                                minLength: 128,
                                maxLength: 128,
                                "description": "must be a string and is required."
                            }
                        }
                    }
                }
            }
        }
    },
    users_details : {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "firstName", "lastName", "birthDate", "userId" ],
                properties: {
                    firstName: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 24,
                        description: "must be a string and is required"
                    },
                    lastName: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 24,
                        description: "must be a string and is required"
                    },
                    birthDate: {
                        bsonType: "date",
                        description: "must be a bson date and is required"
                    },
                    userId: {
                        bsonType: "objectId",
                        description: "must be a bson objectId and is required"
                    }
                }
            }
        }
    },
    buckets : {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: [ "base64", "password", "encryptedKey", "data" ],
                properties: {
                    base64: {
                        bsonType: "string",
                        minLength: 65,
                        maxLength: 65,
                        description: "must be a string (65 characters) and is required."
                    },
                    password: {
                        bsonType: "object",
                        required: [ "salt", "hash" ],
                        properties: {
                            salt: {
                                bsonType: "string",
                                minLength: 128,
                                maxLength: 128,
                                description: "must be a string (128 characters) and is required."
                            },
                            hash: {
                                bsonType: "string",
                                minLength: 128,
                                maxLength: 128,
                                "description": "must be a string (128 characters) and is required."
                            }
                        }
                    },
                    encryptedKey: {
                        bsonType: "binData",
                        description: "must be binary data and is required."
                    },
                    data: {
                        bsonType: "string",
                        description: "must be a string and is required."
                    },
                }
            }
        }
    },
};