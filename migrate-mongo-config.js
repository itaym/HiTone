// In this file you can configure migrate-mongo

import TIME_UNITS from '@/enumerators/TIME_UNITS'

const config = {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: process.env.MONGODB_DB,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: TIME_UNITS.HOUR,
      socketTimeoutMS: TIME_UNITS.HOUR,
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "./src/MongoDb/ADS",

  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'commonjs',
}

module.exports = config
