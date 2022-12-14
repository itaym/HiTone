module.exports = {

    artists: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "userId"],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 50,
                        description: "must be a string and is required"
                    },
                    userId: {
                        bsonType: "objectId",
                        description: "must be a bson objectId and is required"
                    },
                    description: {
                        bsonType: "string",
                        maxLength: 4096,
                        description: "Artist self description",
                    },
                    singles: {
                        bsonType: "array",
                        uniqueItems: true,
                        items: {
                            bsonType: "objectId",
                            description: "must be a bson objectId"
                        }
                    },
                    image: {
                        bsonType: "string",
                        minLength: 1,
                        description: "artist profile image"
                    }
                }
            }
        }
    },
    genres: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name"],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 50,
                        description: "category of artistic genre"
                    }
                }
            }
        }
    },
    notifications: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["from", "to", "message", "status"],
                properties: {
                    from: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 24,
                        description: "Must be a string and is required"
                    },
                    to: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 24,
                        description: "Must be a string and is required"
                    },
                    message: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 256,
                        description: "The message in i18next key and is required",
                    },
                    status: {
                        bsonType: "string",
                        enum: ['PENDING', 'VIEWED'],
                        description: "The status of the message and is required",
                    }
                }
            }
        }
    },
    reset_password: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["createdAt", "name", "password",],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 3,
                        maxLength: 24,
                        description: "The user name (email), and is required"
                    },
                    createdAt: {
                        bsonType: "date",
                        description: "Must be a new Date and is required"
                    },
                    password: {
                        bsonType: "object",
                        required: ["salt", "hash"],
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
    singles: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["createdAt", "name", "url"],
                properties: {
                    name: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 50,
                        description: "Single name is required"
                    },
                    createdAt: {
                        bsonType: "date",
                        description: "Must be a new Date and is required"
                    },
                    description: {
                        bsonType: "string",
                        maxLength: 4096,
                        description: "Single description",
                    },
                    url: {
                        bsonType: "string",
                        minLength: 1,
                        description: "Song must be uploaded"
                    },
                    image: {
                        bsonType: "string",
                        minLength: 1,
                        description: "Single cover image"
                    }
                }
            },
        }
    },
    users: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "password",],
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
                        required: ["salt", "hash"],
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
    users_details: {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["firstName", "lastName", "birthDate", "userId",],
                properties: {
                    firstName: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 24,
                        description: "The user first name, and is required"
                    },
                    lastName: {
                        bsonType: "string",
                        minLength: 2,
                        maxLength: 24,
                        description: "The user last name, and is required"
                    },
                    birthDate: {
                        bsonType: "date",
                        description: "The user birth date, and is required"
                    },
                    userId: {
                        bsonType: "objectId",
                        description: "must be a bson objectId and is required"
                    }
                }
            }
        }
    },
}