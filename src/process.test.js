import getClicks from "./process.js"

describe('Suit to check requested clicks', () => {
    it('Check for each IP within each one hour period, only the most expensive click is placed into the result set.', () => {
        const actual = [
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:44", "amount": 6.3 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:45", "amount": 6.25 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.25 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:55", "amount": 4.3 },
        ]
        const expected = [
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:44", "amount": 6.3 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:55", "amount": 4.3 },
        ]
        expect(getClicks(actual)).toStrictEqual(expected)
    })


    it('To check if more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.', () => {
        const actual = [
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:44", "amount": 6.23 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:45", "amount": 6.23 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:40", "amount": 6.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.3 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:55", "amount": 4.3 },
        ]
        const expected = [
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:40", "amount": 6.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.3 },
        ]
        expect(getClicks(actual)).toStrictEqual(expected)
    })

    it('To check if there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set.', () => {
        const actual = [
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 16:02:36", "amount": 8.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 23:59:59", "amount": 9.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 07:01:53", "amount": 1.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 02:02:58", "amount": 7.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 06:35:12", "amount": 2.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:44", "amount": 6.23 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:40", "amount": 6.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 07:03:15", "amount": 12.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 08:02:22", "amount": 3.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 09:41:50", "amount": 4.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 10:02:54", "amount": 5.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 11:05:35", "amount": 10.0 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 13:02:21", "amount": 6.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:45", "amount": 6.23 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.3 },
            { "ip": "22.22.22.22", "timestamp": "3/11/2020 05:02:45", "amount": 11.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:55", "amount": 4.3 },
        ]
        const expected = [
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 13:47:40", "amount": 6.0 },
            { "ip": "55.55.55.55", "timestamp": "3/11/2020 14:02:54", "amount": 4.3 },
        ]
        expect(getClicks(actual)).toStrictEqual(expected)
    })
})