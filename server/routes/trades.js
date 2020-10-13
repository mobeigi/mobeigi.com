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

// Report is generated a few minutes past midnight NY time
// Fetch the new report 5 mins, 15 mins and 30 mins past midnight
cron.schedule("5,15,30 0 * * *", async () => {
    console.info('Starting updateLast365CalendarDaysXmlFile Cron Job');
    const status = await updateLast365CalendarDaysXmlFile();
    console.info('Completed updateLast365CalendarDaysXmlFile Cron Job. Status: ' + status);
},
{ timezone: 'America/New_York' }
).start();

const updateLast365CalendarDaysXmlFile = async () => {

    // Make request to SendRequest endpoint
    const status = Axios.get(FLEX_STATEMENT_SENDREQUEST_ENDPOINT, { params: {t: TOKEN, q: LAST_365_CALENDAR_DAYS_FLEX_QUERY_ID, v: 3}})
            .then(async (response) => {
                if (response.status === 200) {
                    const sendRequestJson = parser.toJson(response.data, {object: true});
                    if (sendRequestJson["FlexStatementResponse"]["Status"] === 'Success') {
                        // Delay request for 30 seconds to allow time for report generation to complete
                        // TODO: Replace this in future with more elegant retry mechanism with timeout
                        await new Promise(resolve => setTimeout(resolve, 30000));

                        // Make secondary request to GetStatement endpoint
                        const sendRequestStatus = Axios.get(sendRequestJson["FlexStatementResponse"]["Url"], { params: {t: TOKEN, q: sendRequestJson["FlexStatementResponse"]["ReferenceCode"], v: 3}})
                            .then((response) => {
                                if (response.status === 200) {
                                    fs.writeFileSync('private/trades/' + FILE_NAME, response.data);
                                    return true;
                                }
                                else {
                                    console.error("GetStatement: Received status code of " + response.status);
                                    return false;
                                }
                            })
                            .catch(() => {
                                console.error("GetStatement: Caught error during request");
                                return false;
                            });
                        return sendRequestStatus;
                    }
                    else {
                        console.error("FlexStatementResponse.Status: Received non-success status " + JSON.stringify(sendRequestJson["FlexStatementResponse"]));
                        return false;
                    }
                }
                else {
                    console.error("SendRequest: Received status code of " + response.status);
                    return false;
                }
            })
            .catch(() => {
                console.error("SendRequest: Caught error during request");
                return false;
            });

    return status;
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
    trades.sort( (a, b) => a["dateTime"] - b["dateTime"])

    const whenGenerated = moment.tz(json["FlexQueryResponse"]["FlexStatements"]["FlexStatement"]["whenGenerated"], "YYYYMMDD;HHmmss", "America/New_York");

    const stat = fs.statSync('private/trades/' + FILE_NAME);

    return res.status(200).contentType('json').send(JSON.stringify({ 
        whenGenerated, 
        lastUpdated: stat.mtime, 
        timezone: 'Australia/Sydney', 
        trades 
    }));
});

// Perform initial update on start
updateLast365CalendarDaysXmlFile();

module.exports = router;
