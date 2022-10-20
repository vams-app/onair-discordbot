const Table = require('easy-table')
const determineFlightStatus = require('../lib/determineFlightStatus')


module.exports = function buildFlightsList (x) {
    if (!x) return;
    if (x.length <= 0) return 'No flights'
    let t = new Table;

    x.forEach(function (f, i) {
        const identifier = f.Aircraft.Identifier
        const departureAirport = (f.DepartureAirport) ? f.DepartureAirport.ICAO : '    '
        const arrivalIntendedAirport = (f.ArrivalIntendedAirport) ? f.ArrivalIntendedAirport.ICAO : '    '
        const arrivalActualAirport = (f.ArrivalActualAirport) ? f.ArrivalActualAirport.ICAO : '    '
        const status = determineFlightStatus(f)
        
        t.cell('#', i+1)
        t.cell('Aircraft', identifier)
        t.cell('Status', status)
        t.cell('Depart', departureAirport)
        t.cell('Intended Arrival', arrivalIntendedAirport)
        t.cell('Actual Arrival', arrivalActualAirport)
        t.newRow()

    });

    return t.toString()
}