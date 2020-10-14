var express = require('express');
var router = express.Router();
var fs = require('fs');
var parser = require('xml2json');
var moment = require('moment');
require('moment-timezone');
const { default: Axios } = require('axios');
var cron = require('node-cron');

const FILE_NAME = 'Last365CalendarDays.xml';
const CONFIG = JSON.parse(fs.readFileSync('private/trades/config.json'));
const TOKEN = CONFIG.token;
const LAST_365_CALENDAR_DAYS_FLEX_QUERY_ID = CONFIG.Last365CalendarDaysFlexQueryId;
const FLEX_STATEMENT_SENDREQUEST_ENDPOINT = 'https://ndcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService.SendRequest';
const MAX_RETRIES = 5;
const RETRY_TIMEOUT = 60000;

// New report is only generated past midnight NY time
// Prior to this a cached report is returned which does not contain new (daily) trades
cron.schedule("15 */1 * * *", async () => {
    console.info('Starting updateLast365CalendarDaysXmlFile Cron Job');
    const status = await updateLast365CalendarDaysXmlFile();
    console.info('Completed updateLast365CalendarDaysXmlFile Cron Job. Status: ' + status);
}).start();

const updateLast365CalendarDaysXmlFile = async () => {
    const sendRequestResponse = await sendRequestEndpoint( { sendRequestEndpointUrl: FLEX_STATEMENT_SENDREQUEST_ENDPOINT, queryId: LAST_365_CALENDAR_DAYS_FLEX_QUERY_ID, apiVersion: 3 } );
    const sendRequestResponseJson = parser.toJson(sendRequestResponse.data, {object: true});
    if (sendRequestResponse.status) {
        for (let retryCount = 1; retryCount <= MAX_RETRIES; retryCount++) {
            const getStatementResponse = await getStatementRequest( { getStatementEndpointUrl: sendRequestResponseJson["FlexStatementResponse"]["Url"], queryId: sendRequestResponseJson["FlexStatementResponse"]["ReferenceCode"], apiVersion: 3 } );
            if (getStatementResponse.status) {
                fs.writeFileSync('private/trades/' + FILE_NAME, getStatementResponse.data);
                console.info("updateLast365CalendarDaysXmlFile: Successfully updated " + FILE_NAME);
                return true;
            }
            else {
                // Delay before retry
                console.warn("updateLast365CalendarDaysXmlFile: Retry attempt " + retryCount);
                await new Promise(resolve => setTimeout(resolve, RETRY_TIMEOUT));
                continue;
            }
        }
    }

    return false;
}

const sendRequestEndpoint = async ( { sendRequestEndpointUrl, queryId, apiVersion } ) => {
    const sendRequestResponse = await Axios.get(sendRequestEndpointUrl, { params: {t: TOKEN, q: queryId, v: apiVersion}})
    .then((response) => {
        if (response.status === 200) {
            const sendRequestJson = parser.toJson(response.data, {object: true});
            if (sendRequestJson["FlexStatementResponse"]["Status"] === 'Success') {
                return { status: true, data: response.data };
            }
            else {
                console.error("FlexStatementResponse.Status: Received non-success status " + JSON.stringify(sendRequestJson["FlexStatementResponse"]));
                return { status: false, data: null };
            }
        }
        else {
            console.error("SendRequest: Received status code of " + response.status);
            return { status: false, data: null };
        }
    })
    .catch((error) => {
        console.error("SendRequest: Caught error during request. " + error);
        return { status: false, data: null };
    });

    return sendRequestResponse;
}

const getStatementRequest = async ( { getStatementEndpointUrl, queryId, apiVersion } ) => {
    const getStatementResponse = await Axios.get(getStatementEndpointUrl, { params: {t: TOKEN, q: queryId, v: apiVersion}})
        .then((response) => {
            if (response.status === 200) {
                const getStatementJson = parser.toJson(response.data, {object: true});
                if (getStatementJson["FlexQueryResponse"]) {
                    return { status: true, data: response.data };
                }
                else {
                    return { status: false, data: null };
                }
            }
            else {
                console.error("GetStatement: Received status code of " + response.status);
                return { status: false, data: null };
            }
        })
        .catch((error) => {
            console.error("GetStatement: Caught error during request. " + error);
            return { status: false, data: null };
        });

    return getStatementResponse;
}

router.get('/Last365CalendarDays', function(req, res, next) {
    // Check if file exists on disk
    const exists = fs.existsSync('private/trades/' + FILE_NAME);

    if (!exists) {
        return res.status(404).contentType('json').send(JSON.stringify({ error: "File '" + FILE_NAME + "' not found."}));
    }

    // Parse stored file
    var xml = fs.readFileSync('private/trades/' + FILE_NAME).toString();
    var json = parser.toJson(xml, {object: true});

    var trades = json["FlexQueryResponse"]["FlexStatements"]["FlexStatement"]["Trades"]["Trade"];
    trades.map( (trade) => {
        // Transform data
        trade["strike"] = trade["strike"] || null;
        trade["dateTime"] = moment(trade["dateTime"], "YYYYMMDD;HHmmss");
        trade["expiry"] = trade["expiry"] ? moment(trade["expiry"], "YYYYMMDD") : null;
        trade["putCall"] = trade["putCall"] || null;
    });
    trades.sort( (a, b) => a["dateTime"] - b["dateTime"]); // ascending date

    var openPositions = json["FlexQueryResponse"]["FlexStatements"]["FlexStatement"]["OpenPositions"]["OpenPosition"];
    openPositions.map( (position) => {
        // Transform data
        position["strike"] = position["strike"] || null;
        position["expiry"] = position["expiry"] ? moment(position["expiry"], "YYYYMMDD") : null;
        position["putCall"] = position["putCall"] || null;
    });
    openPositions.sort( (a, b) => b["position"] - a["position"]); // decending position number

    const whenGenerated = moment.tz(json["FlexQueryResponse"]["FlexStatements"]["FlexStatement"]["whenGenerated"], "YYYYMMDD;HHmmss", "America/New_York");

    return res.status(200).contentType('json').send(JSON.stringify({ 
        whenGenerated,
        timezone: 'Australia/Sydney', 
        trades,
        openPositions
    }));
});

// Perform initial update on start
updateLast365CalendarDaysXmlFile();

module.exports = router;
