"use strict";

const utils = require( "../utils" );

const register = async ( { sql, getConnection } ) => {
   // read in all the .sql files for this folder
   const sqlQueries = await utils.loadSqlQueries( "events" );

   const getEvents = async text => {
       // get a connection to SQL Server
       const cnx = await getConnection();

       // create a new request
       const request = await cnx.request();

       // configure sql query parameters
       request.input( "text", sql.VarChar( 50 ), text );

       // return the executed query
       return request.query( sqlQueries.getEvents );
   };

   return {
       getEvents
   };
};

module.exports = { register };