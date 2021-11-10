const jwtDecode = require("jwt-decode");
const axios = require("axios");
const url = require("url");
const envVariables = require("../env-variables");
const keytar = require("keytar");
const os = require("os");

const { apiIdentifier, auth0Domain, clientId } = envVariables;

// <th>Forfait</th>
//                       <th>Produit</th>
//                       <th>Format</th>
//                       <th>Photos</th>

