import {ChatCompletionTool} from "openai/resources";

/**
 * Function definition for the OpenAI chat completion tool.
 * This function generates flight search parameters based on the user's conversation.
 */
export const getFilterFunction = (): ChatCompletionTool => {
    return {
        type: 'function',
        function: {
            name: 'generateFlightSearchParameters',
            description: "generated flight search parameters based on the user's conversation. This does not include conditional filtering.",
            parameters: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: 'Generates a human-like message based on the query parameters. ' +
                            'Example: "I will search for flights from Prague to London from 1/1/2022 to 1/2/2022 for 2 adults and 1 child." ' +
                            'or "Sure, let me find you the best flights from Prague to London from 1/1/2022 to 1/2/2022."' +
                            'or when the user ask more questions to filter their search query you could use ' +
                            '"Sure, let me update the search to only include direct flights from Prague to London from 1/1/2022 to 1/2/2022."'
                    },
                    fly_from: {
                        type: 'string',
                        description: 'Always returns the IATA code from the departure area. it accepts multiple values separated by a comma.',
                    },
                    fly_to: {
                        type: 'string',
                        description: 'Always returns the IATA code from the destination area. it accepts multiple values separated by a comma.',
                    },
                    date_from: {
                        type: 'string',
                        description: 'The start date of the departure date range in dd/mm/yyyy format.',
                    },
                    date_to: {
                        type: 'string',
                        description: 'The end date of the departure date range in dd/mm/yyyy format.',
                    },
                    return_from: {
                        type: 'string',
                        description: 'The start date of the return date range in dd/mm/yyyy format.',
                    },
                    return_to: {
                        type: 'string',
                        description: 'The end date of the return date range in dd/mm/yyyy format.',
                    },
                    adults: {
                        type: 'integer',
                        description: 'Used to specify the number of adults. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    children: {
                        type: 'integer',
                        description: 'It specifies the number of children. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    infants: {
                        type: 'integer',
                        description: 'Used to specify the number of infants. The sum of adults, children and the infants cannot be greater than 9.',
                    },
                    selected_cabins: {
                        type: 'string',
                        description: 'Specifies the preferred cabin class. ' +
                            'Cabins can be: M (economy), W (economy premium), C (business), or F (first class).' +
                            ' There can be only one selected cabin for one call. Cannot be used for ground (train, bus) content.' +
                            ' Shows all classes when no cabin is specified.',
                    },
                    adult_hold_bag: {
                        type: 'string',
                        description: 'Specifies the number of hold bags for adults  separated by commas. ' +
                            'The first number represents the number of bags for passenger 1, the second number is for passenger 2,' +
                            ' etc. Can only contain up to two hold bags per passenger. ' +
                            'All adult passenger should have a value bv 2 adults  = 1,0 or 1,1 or 0,1 or 1,2 etc.',
                    },
                    adult_hand_bag: {
                        type: 'string',
                        description: 'Specifies the number of hand bags for adults separated by commas. ' +
                            'The first number represents the number of bags for passenger 1, the second number is for passenger 2,' +
                            ' etc. Can only contain up to one hand bags per passenger.' +
                            'All adult passenger should have a value bv 2 adults  = 1,0 or 1,1 or 0,1 or 1,2 etc.',
                    },
                    child_hold_bag: {
                        type: 'string',
                        description: 'Specifies the number of hold bags for children separated by commas. ' +
                            'The first number represents the number of bags for passenger 1, the second number is for passenger 2,' +
                            ' etc. Can only contain up to two hold bags per passenger. ' +
                            'All child passenger should have a value bv 2 children  = 1,0 or 1,1 or 0,1 or 1,2 etc.',
                    },
                    child_hand_bag: {
                        type: 'string',
                        description: 'Specifies the number of hand bags for children separated by commas. ' +
                            'The first number represents the number of bags for passenger 1, the second number is for passenger 2,' +
                            ' etc. Can only contain up to one hand bags per passenger. ' +
                            'All child passenger should have a value bv 2 children  = 1,0 or 1,1 or 0,1 or 1,2 etc.',

                    },
                    price_from: {
                        type: 'integer',
                        description: 'result filter, minimal price',
                    },
                    price_to: {
                        type: 'integer',
                        description: 'result filter, maximal price',
                    },
                    curr: {
                        type: 'string',
                        description: 'use this parameter to change the currency in the response\n' +
                            'Available values : AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM,' +
                            ' BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BRL, BSD, BTC, BTN, BWP, BYN, BZD, CAD,' +
                            ' CDF, CHF, CLF, CLP, CNY, COP, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EEK, EGP,' +
                            ' ERN, ETB, EUR, FJD, FKP, GBP, GEL, GGP, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG,' +
                            ' HUF, IDR, ILS, IMP, INR, IQD, IRR, ISK, JEP, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW,' +
                            ' KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LTL, LVL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP,' +
                            ' MRO, MTL, MUR, MVR, MWK, MXN, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK,' +
                            ' PHP, PKR, PLN, PYG, QAR, QUN, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL,' +
                            ' SOS, SRD, STD, SVC, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD,' +
                            ' UYU, UZS, VEF, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR, ZMK, ZMW, ZWL',
                    },
                    locale: {
                        type: 'string',
                        description: 'the language of city names in the response and ' +
                            'also language of kiwi.com website to which deep_links lead' +
                            'Available values : ae, ag, ar, at, au, be, bg, bh, br, by, ca, ca-fr, ch, cl, cn, co, ct,' +
                            ' cz, da, de, dk, ec, ee, el, en, es, fi, fr, gb, gr, hk, hr, hu, id, ie, il, in, is, it,' +
                            ' ja, jo, jp, ko, kr, kw, kz, lt, mx, my, nl, no, nz, om, pe, ph, pl, pt, qa, ro, rs, ru, ' +
                            'sa, se, sg, sk, sr, sv, th, tr, tw, ua, uk, us, vn, za',
                    },
                    dtime_from: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to depart at the earliest (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 00:00',
                    },
                    dtime_to: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to depart at the latest (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 23:59',
                    },
                    atime_from: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to arrive the earliest (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. '
                            + 'If not provided, the default value is 00:00',
                    },
                    atime_to: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to arrive the latest (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. '
                            + 'If not provided, the default value is 23:59',
                    },
                    ret_dtime_from: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to depart the earliest during his return (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 00:00',
                    },
                    ret_dtime_to: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to depart the latest during his return (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 23:59',
                    },
                    ret_atime_from: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to arrive the earliest during his return (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 00:00',
                    },
                    ret_atime_to: {
                        type: 'string',
                        description: 'a filter to specify at what time the user wants to arrive the latest during his return (use only time in whole hours, not minutes; 11:00 means 11AM, 23:00 means 11PM) return value in the format hh:mm. ' +
                            'If not provided, the default value is 23:59',
                    },
                    //todo airlines filter
                    stopover_from: {
                        type: 'string',
                        description: 'result filter, min length of stopover, 48:00 means 2 days (48 hours)'
                    },
                    max_stopovers: {
                        type: 'integer',
                        description: 'max number of stopovers per the entire itinerary (outbound + return).  Use \'max_stopovers=0\' for direct flights only.',
                    },
                    max_sector_stopovers: {
                        type: 'integer',
                        description: 'max number of stopovers per itinerary\'s sector.',
                    },
                    vehicle_type: {
                        type: 'string',
                        description: 'this parameter allows you to specify the vehicle type. The options are aircraft, bus, train. Default all options are selected',
                    },
                    sort: {
                        type: 'string',
                        description: 'sorts the results Only by the values "quality", "price", "date" or "duration". Price is the default value.',
                    },
                    // limit: {
                    //     type: 'integer',
                    //     description: 'returns the number of results that the user wants to be shown. If not provided by the user use default value 20. The max value is 1000',
                    // }
                },
                ['required']: ['message', 'date_from', 'date_to', 'locale', 'curr','atime_from','atime_to','dtime_from','dtime_to','fly_from'],
            },
        },
    };
}